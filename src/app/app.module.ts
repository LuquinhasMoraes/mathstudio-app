import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Vibration } from '@ionic-native/vibration';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SocketIoModule, SocketIoConfig} from 'ng-socket-io';
import { InitialPage } from '../pages/initial/initial';
import { SocketConnectProvider } from '../providers/socket-connect/socket-connect';
import { Facebook } from '@ionic-native/facebook';
import { LoginPage } from '../pages/login/login';

const socketConfig: SocketIoConfig = {
  url: 'https://mathstudio.herokuapp.com/'
  // url: 'http://localhost:3000/'
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InitialPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SocketIoModule.forRoot(socketConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InitialPage, 
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Vibration,
    Facebook,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SocketConnectProvider
  ]
})
export class AppModule {}
