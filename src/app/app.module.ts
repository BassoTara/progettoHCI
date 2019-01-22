import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';


import { EncountersListService } from '../services/encounters-list/encounter-list.service';
import { CharactersListService } from '../services/characters-list/characters-list.service';
import { GroupsListService } from '../services/groups-list/groups-list.service';
import { DataFinder } from '../services/datafinder';
import { HttpModule } from '@angular/http';

import { Camera } from '@ionic-native/camera';
import { DataProvider } from './data';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { HardwareButtons } from '@scaffold-digital/ionic-hardware-buttons';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    HttpModule,
    AngularFireStorageModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EncountersListService,
    CharactersListService,
    GroupsListService,
    DataFinder,
    Camera,
    DataProvider,
    WheelSelector,
    HardwareButtons,
  ]
})
export class AppModule {}