import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// import { Autosize } from '../autosize';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from './firebase.credentials';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { EncountersListService } from '../services/encounters-list/encounter-list.service';
import { CharactersListService } from '../services/characters-list/characters-list.service';
import { GroupsListService } from '../services/groups-list/groups-list.service';
import { DataFinder } from '../services/datafinder';
import { HttpModule } from '@angular/http';



@NgModule({
  declarations: [
    MyApp,
    //IncontriPage,
    //GruppiDeiGiocatoriPage,
    //GruppiDeiPNGPage,
    //MostriPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    HttpModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //IncontriPage,
    //GruppiDeiGiocatoriPage,
    //GruppiDeiPNGPage,
    //MostriPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EncountersListService,
    CharactersListService,
    GroupsListService,
    DataFinder
  ]
})
export class AppModule {}