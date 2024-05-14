import { HttpRequest, HttpErrorResponse, HttpInterceptorFn, HttpHandlerFn } from '@angular/common/http';
import { EMPTY } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingController, AlertController } from '@ionic/angular/standalone'


export const ErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loadingCtrl: LoadingController = new LoadingController();
  const alertCtrl: AlertController = new AlertController();

  loadingCtrl.getTop().then(hasLoading => {
    if (!hasLoading) {
      loadingCtrl.create({
        spinner: 'circular',
        translucent: true
      }).then(loading => {
        loading.present()
      })
    }
  })

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.error('failed', error);

      alertCtrl.create({
        header: 'Something went wrong',
        message: 'failed to load data, please try again.',
        buttons: ['OK']
      }).then((alert) => {
        alert.present()
      })

      return EMPTY;
    }),
    finalize(() => {
      loadingCtrl.getTop().then(hasLoading => {
        if (!!hasLoading) {
          loadingCtrl.dismiss()
        }
      })
    })
  )

}

