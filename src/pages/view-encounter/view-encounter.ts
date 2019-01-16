import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';

/**
 * Generated class for the ViewEncounterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-encounter',
  templateUrl: 'view-encounter.html',
})
export class ViewEncounterPage {

  encounterMembers = [];
  /* encounter: Encounter = {
    name: "",
    description: "",
    characterList: undefined,
    npcList: undefined,
    monsterList: undefined
  } */

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    let encounter = this.navParams.get('encounter');

    //PROBLEMA: *ngFor deve lavorare con una lista unica, serve quindi salvare personaggi e mostri in un'unica lista. 
    //Passaggio diretto delle liste o caricamento degli oggetti (non observable) tramite chiavi?

    this.encounterMembers = this.encounterMembers.concat(encounter.characterList).concat(encounter.npcList).concat(encounter.monsterList);
    console.log(this.encounterMembers);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEncounterPage');
  }

}
