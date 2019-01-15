import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';
import { EncountersListService } from '../../services/encounters-list/encounter-list.service';
import { SceltaGruppiDeiGiocatoriPage } from '../scelta-gruppi-dei-giocatori/scelta-gruppi-dei-giocatori';
import { Character } from '../../models/character/character.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { SceltaGruppiDeiPngPage } from '../scelta-gruppi-dei-png/scelta-gruppi-dei-png';


@IonicPage()
@Component({
  selector: 'page-add-encounter',
  templateUrl: 'add-encounter.html',
})
export class AddEncounterPage {
  encounter: Encounter = {
    name: undefined,
    description: '',
    characterList: [],
    npcList: [],
    monsterList: [],
  };

  characterList$: Character[] = [];
  npcList$: Character[] = [];
  monsterList$ = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private encounters: EncountersListService) {
  }


  addEncounter(encounter: Encounter) {
    for (let character of this.characterList$)
      this.encounter.characterList.push(character.key);
    for (let npc of this.npcList$)
      this.encounter.npcList.push(npc.key);
    this.encounter.monsterList = this.monsterList$;
    
    this.encounters.addEncounter(encounter).then(ref => {
      this.navCtrl.pop();
    });
  }

  ionViewDidLoad() {
    setTimeout(() => this.resizeName(), 0);
    setTimeout(() => this.resizeDesc(), 0);
    console.log('ionViewDidLoad AddGroupPage');
  }

  @ViewChild('myInputName') myInputName: ElementRef;
  @ViewChild('myInputDesc') myInputDesc: ElementRef;

  resizeName() {
    var element = this.myInputName['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    element.style.height = 0 + 'px';
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInputName['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  resizeDesc() {
    var element = this.myInputDesc['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    element.style.height = 0 + 'px';
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInputDesc['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  pushToPlayerChoice() {
    var myCallbackFunction = (_params) => {
      return new Promise((resolve, reject) => {
        this.characterList$.push(_params);
        resolve();
      });
    }   

    this.navCtrl.push('SceltaGruppiDeiGiocatoriPage', {
      callback: myCallbackFunction
    });

  }

  pushToNPCChoice(){
    var myCallbackFunction = (_params) => {
      return new Promise((resolve, reject) => {
        this.npcList$.push(_params);
        resolve();
      });
    }
    

    this.navCtrl.push('SceltaGruppiDeiPngPage', {
      callback: myCallbackFunction
    });
  }

  pushToMonsterChoice(){
    var myCallbackFunction = (_params) => {
      return new Promise((resolve, reject) => {
        this.monsterList$ = this.monsterList$.concat(_params);
        resolve();
      });
    }
    

    this.navCtrl.push('SceltaMostriPage', {
      callback: myCallbackFunction
    });
  }

}
