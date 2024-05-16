External dependencies/libraries used:
- [SwiperJs](https://swiperjs.com/) as touch slider. 
- [Ionic Storage](https://github.com/ionic-team/ionic-storage) for caching. 
- [@capacitor/filesystem](https://capacitorjs.com/docs/apis/filesystem) for file storage. 
- [@capacitor-mlkit/barcode-scanning](https://github.com/capawesome-team/capacitor-mlkit/tree/main/packages/barcode-scanning) for QR code scanning. 

⚠️⚠️

### testing the app locally on physical device

The app currently tries to connect to localhost as API host ( which obviously will not work ). A quick workaround is to expose the API over local network.

In order to do so, please:

- Make sure both your mobile device and the machine that hosts the API server are on the same network.
- refer to this [Chrome Inspector Documentation](https://developer.chrome.com/docs/devtools/remote-debugging/local-server) guide to enable port forwarding over network.

⚠️⚠️
