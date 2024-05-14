import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const CACHE_KEY = '_mycache_'

@Injectable({
  providedIn: 'root'
})
export class CachingService {

  constructor(private storage: Storage) { }

  public async init() {
    await this.storage.defineDriver(cordovaSQLiteDriver);
    await this.storage.create();
  }

  public cacheRequest(url: string, data: any) {
    url = `${CACHE_KEY}${url}`;

    return this.storage.set(url, { data })
  }

  public removeRequestCache(url: string) {
    url = `${CACHE_KEY}${url}`;

    return this.storage.remove(url)
  }

  public async getCachedRequest(url: string) {
    url = `${CACHE_KEY}${url}`;

    const storedValue = await this.storage.get(url);

    if (!storedValue) {
      return null;
    }

    return storedValue.data;
  }
}
