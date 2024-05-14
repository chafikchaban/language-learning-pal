import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory, DownloadFileResult, WriteFileResult } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {


  constructor(private http: HttpClient) { }



  // Fetch the MP3 file and convert it to Base64 encoding
  async fetchAndConvertToBase64(url: string): Promise<string> {
    try {
      // Fetch the MP3 file as a blob
      const blob: Blob = await this.http.get(url, { responseType: 'blob' }).toPromise() as Blob;

      // Read the blob data as a binary string
      const reader = new FileReader();
      reader.readAsBinaryString(blob);

      return new Promise<string>((resolve, reject) => {
        reader.onload = () => {
          // Convert the binary string to Base64 encoding
          const base64Data = Capacitor.convertFileSrc(`data:audio/mp3;base64,${btoa(reader.result as string)}`);
          resolve(base64Data);
        };

        reader.onerror = (error) => {
          reject(error);
        };
      });
    } catch (error) {
      console.error('Error fetching and converting MP3 to Base64:', error);
      throw error;
    }
  }




  public downloadFile = async (url: string): Promise<string | null> => {
    const permissionGranted: boolean = await this.requestPermissionsIfNecessary();
    if (!permissionGranted) {
      return null;
    }

    const base64String = await this.fetchAndConvertToBase64(url);

    const path: string = `audio_${this.getFileName(url)}.mp3`

    return await this.writeFile(
      path,
      base64String,
    ).then((res: WriteFileResult) => {
      if (res.uri) {
        return path
      }
      return null;
    }).catch(e => {
      console.log(e);
      return null;
    })

  };

  public getFileName = (url: string) => {
    // Split the URL by "/"
    const parts = url.split("/");

    // Take the last part of the array
    const extractedPart = parts[parts.length - 2];

    return extractedPart
  }


  public writeFile = async (path: string, data: any): Promise<WriteFileResult> => {
    return await Filesystem.writeFile({
      path,
      data,
      directory: Directory.Data,
    });
  };


  public readFile = async (path: string): Promise<string | Blob> => {
    const readFileResult = await Filesystem.readFile({
      path,
      directory: Directory.Data,
    });

    return readFileResult.data
  };


  private checkPermissions = async (): Promise<boolean> => {
    const granted = await Filesystem.checkPermissions()
      .then(({ publicStorage }) => {
        return publicStorage === "granted"
      })
      .catch(e => {
        return false;
      })

    return granted;
  }

  private requestPermissions = async (): Promise<boolean> => {
    const granted = await Filesystem.requestPermissions()
      .then(({ publicStorage }) => {
        return publicStorage === "granted"
      })
      .catch(e => {
        return false;
      })

    return granted;
  }

  private requestPermissionsIfNecessary = async (): Promise<boolean> => {
    return await this.checkPermissions()
      .then(async granted => {
        if (!granted) {
          await this.requestPermissions()
        }

        return true;
      })
      .catch(e => {
        console.error(e);
        return false;
      })

  }

}
