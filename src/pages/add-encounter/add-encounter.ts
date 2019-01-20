import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, List } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';
import { EncountersListService } from '../../services/encounters-list/encounter-list.service';
import { Character } from '../../models/character/character.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';


@IonicPage()
@Component({
  selector: 'page-add-encounter',
  templateUrl: 'add-encounter.html',
})
export class AddEncounterPage {
  encounter: Encounter = {
    name: undefined,
    description: '',
    characterKeys: [],
    monsterList: [],
    initiatives: [],
    turn: -1
  };

  characterList$: Character[] = [];
  npcList$: Character[] = [];
  monsterList$ = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private encounters: EncountersListService, public characters: CharactersListService) {
  }


  addEncounter(encounter: Encounter) {
    for (let character of this.characterList$.concat(this.npcList$)) {
      this.characters.editCharacter(character);
      this.encounter.characterKeys.push(character.key);
      let initiative = {
        key: character.key,
        value: 0,
      }    
      this.encounter.initiatives.push(initiative);
    }

    this.encounter.monsterList = this.monsterList$;
    for (let index in this.monsterList$) {
      let initiative = {
        key: index,
        value: 0,
      }
      this.encounter.initiatives.push(initiative);    
    }

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
        for (let element of _params) {
          let toAdd = true;
          for (let character of this.characterList$) {
            if (character.key == element.key)
              toAdd = false;
          }
          if (toAdd)
            this.characterList$.push(element);
        }
        // this.characterList$ = this.characterList$.concat(_params);
        resolve();
      });
    }

    this.navCtrl.push('SceltaGruppiDeiGiocatoriPage', {
      callback: myCallbackFunction
    });

  }

  pushToNPCChoice() {
    var myCallbackFunction = (_params) => {
      return new Promise((resolve, reject) => {
        for (let element of _params) {
          let toAdd = true;
          for (let character of this.npcList$) {
            if (character.key == element.key)
              toAdd = false;
          }
          if (toAdd)
            this.npcList$.push(element);
        }
        // this.characterList$ = this.characterList$.concat(_params);
        resolve();
      });
    }


    this.navCtrl.push('SceltaGruppiDeiPngPage', {
      callback: myCallbackFunction
    });
  }

  pushToMonsterChoice() {
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
