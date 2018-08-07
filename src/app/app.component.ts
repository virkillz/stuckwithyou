import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import * as firebase from 'firebase';
import { SigninPage } from '../pages/signin/signin';

const config = {
    apiKey: "AIzaSyCrTtIhhi2SzSMNK6A1E7XMdz5B65wF-6s",
    authDomain: "stuckwithyou-86826.firebaseapp.com",
    databaseURL: "https://stuckwithyou-86826.firebaseio.com",
    projectId: "stuckwithyou-86826",
    storageBucket: "stuckwithyou-86826.appspot.com",
    messagingSenderId: "891524268185"  
};


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = SigninPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
      firebase.initializeApp(config);
  }
}

