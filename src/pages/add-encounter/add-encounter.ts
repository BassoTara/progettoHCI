import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, List, AlertController, Navbar, Platform, PopoverController } from 'ionic-angular';
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
    name: '',
    characterKeys: [],
    monsterList: [],
    initiatives: [],
    turn: -1
  };

  characterList$: Character[] = [];
  npcList$: Character[] = [];
  monsterList$ = [];

  backAction;

  constructor(public popoverCtrl: PopoverController, public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private encounters: EncountersListService, public characters: CharactersListService, public alertCtrl: AlertController) {
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

  @ViewChild(Navbar) navBar: Navbar;

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.onBackButton();
    }

    setTimeout(() => this.resizeName(), 0);
    console.log('ionViewDidLoad AddGroupPage');
  }

  ionViewDidEnter() {
    this.backAction = this.platform.registerBackButtonAction(() => {
      this.onBackButton();
    }, 2);
  }

  ionViewDidLeave() {
    this.backAction();
  }

  onBackButton() {
    if (this.isEmpty())
      this.navCtrl.pop();
    else if (this.getAuthorization()) {
      let alert = this.alertCtrl.create({
        title: 'Salvare le modifiche prima di uscire?',
        buttons: [
          {
            text: 'Sì',
            handler: () => {
              this.addEncounter(this.encounter);
            }
          },
          {
            text: 'No',
            handler: () => {
              this.navCtrl.pop();

            }
          }
        ]
      });
      let alertBack = this.platform.registerBackButtonAction(() => {
        alert.dismiss();
      }, 3)
      alert.onDidDismiss(() => {
        alertBack();
      })
      alert.present();
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Campi vuoti, uscire senza salvare?',
        buttons: [
          {
            text: 'Sì',
            handler: () => {
              this.navCtrl.pop();

            }
          },
          {
            text: 'No',
            handler: () => {

            }
          }
        ]
      });
      let alertBack = this.platform.registerBackButtonAction(() => {
        alert.dismiss();
      }, 3)
      alert.onDidDismiss(() => {
        alertBack();
      })
      alert.present();
    }

  }

  @ViewChild('myInputName') myInputName: ElementRef;

  resizeName() {
    var element = this.myInputName['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    element.style.height = 0 + 'px';
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInputName['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
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

  presentPopoverCharacter(myEvent, index: number) {
    var myCallbackFunction = (_params) => {
      return new Promise((resolve, reject) => {
        this.removeCharacter(_params);
        resolve();
      });
    }
    let popover = this.popoverCtrl.create('PopoverAddEncounterCharacterPage', {
      index: index,
      callback: myCallbackFunction
    });
    popover.present({
      ev: myEvent
    });

    let popoverBack = this.platform.registerBackButtonAction(() => {
      popover.dismiss();
    }, 3);

    popover.onDidDismiss(() => {
      popoverBack();
    });
  }

  presentPopoverNpc(myEvent, index: number) {
    var myCallbackFunction = (_params) => {
      return new Promise((resolve, reject) => {
        this.removeNpc(_params);
        resolve();
      });
    }
    let popover = this.popoverCtrl.create('PopoverAddEncounterCharacterPage', {
      index: index,
      callback: myCallbackFunction
    });
    popover.present({
      ev: myEvent
    });

    let popoverBack = this.platform.registerBackButtonAction(() => {
      popover.dismiss();
    }, 3);

    popover.onDidDismiss(() => {
      popoverBack();
    });
  }

  presentPopoverMonster(myEvent, index: number) {
    var myCallbackFunction = (_params) => {
      return new Promise((resolve, reject) => {
        this.removeMonster(_params);
        resolve();
      });
    }
    let popover = this.popoverCtrl.create('PopoverAddEncounterCharacterPage', {
      index: index,
      callback: myCallbackFunction
    });
    popover.present({
      ev: myEvent
    });

    let popoverBack = this.platform.registerBackButtonAction(() => {
      popover.dismiss();
    }, 3);

    popover.onDidDismiss(() => {
      popoverBack();
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

  getAuthorization() {
    if (this.encounter.name === "" || (this.characterList$.length + this.npcList$.length + this.monsterList$.length) < 2)
      return false;
    else
      return true;
  }

  isEmpty() {
    return this.encounter.name=="" && this.characterList$.length == 0 && this.npcList$.length == 0 && this.monsterList$.length == 0;
  }

  removeCharacter(index: number) {
    this.characterList$.splice(index, 1);
  }

  removeNpc(index: number) {
    this.npcList$.splice(index, 1);
  }

  removeMonster(index: number) {
    this.monsterList$.splice(index, 1);
  }

}
