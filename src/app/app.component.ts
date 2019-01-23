import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage: string = 'IncontriPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      splashScreen.hide();
    });
  }
  goToIncontri(params) {
    if (!params) params = {};
    this.navCtrl.setRoot('IncontriPage');
  } goToGruppiDeiGiocatori(params) {
    if (!params) params = {};
    this.navCtrl.setRoot('GruppiDeiGiocatoriPage');
  } goToGruppiDeiPNG(params) {
    if (!params) params = {};
    this.navCtrl.setRoot('GruppiDeiPNGPage');
  } goToMostri(params) {
    if (!params) params = {};
    this.navCtrl.setRoot('MostriPage');
  }

}
