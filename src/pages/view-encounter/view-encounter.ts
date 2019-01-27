import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, Item, Modal, ModalOptions, ToastController, Platform, AlertController } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Observable, Subject } from 'rxjs';
import { EncountersListService } from '../../services/encounters-list/encounter-list.service';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { DataProvider } from '../../app/data';



@IonicPage()
@Component({
  selector: 'page-view-encounter',
  templateUrl: 'view-encounter.html',
})
export class ViewEncounterPage {

  encounter: Encounter;

  charactersList$;
  monstersList$;

  initiatives = {};
  charactersImgSrcs = {};

  encounterMembers = [];

  encounterMembers$;


  constructor(public platform: Platform, private dataProvider: DataProvider, public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService, public toastCtrl: ToastController
    , private encounters: EncountersListService, public popoverCtrl: PopoverController, public modalCtrl: ModalController, public wheelSelector: WheelSelector, public alertCtrl: AlertController) {

    this.encounter = this.navParams.get('encounter');

    if (this.encounter.characterKeys != null) {
      let observables = this.encounter.characterKeys.map(
        key => {
          return this.characters.getCharacterByKey(key).valueChanges();
        });

      this.charactersList$ = Observable.combineLatest(
        observables,
        (...keys) => {
          return Array.prototype.concat(...keys);
        }
      );
    }

    this.monstersList$ = this.encounters.getMonstersByEncounterKey(this.encounter.key).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      }
    );

    if (this.encounter.characterKeys != null) {
      this.encounterMembers$ = Observable.combineLatest(
        this.charactersList$,
        this.monstersList$,
        (...keys) => {
          return Array.prototype.concat(...keys);
        }
      )
    }
    else
      this.encounterMembers$ = this.monstersList$;

    this.encounters.getInitiatives(this.encounter).valueChanges().subscribe(list => {
      for (let e of list) {
        this.initiatives[e["key"]] = e["value"];
      }


    })

    this.encounterMembers$.subscribe(list => {
      this.encounterMembers = list;
      this.encounterMembers$ = Observable.of(this.encounterMembers).map((data) => {
        data.sort((a, b) => {
          if (this.initiatives[a.key] > this.initiatives[b.key]) {
            return -1;
          } else if (this.initiatives[a.key] < this.initiatives[b.key]) {
            return 1;
          }
          return 0;
        });
        return data;
      });
    })

    this.loadImagesFromStorage();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEncounterPage');
  }

  editMemberHP(member, offset) {

    member.currentHealth -= offset;

    if (member.currentHealth < 0)
      member.currentHealth = 0;

    if (member.currentHealth > member.healthPoints)
      member.currentHealth = member.healthPoints;

    if (member.group != undefined)
      this.characters.editCharacter(member);

    else
      this.encounters.editEncounterByMonster(this.encounter, member);
  }

  presentPopover(myEvent, member) {
    let popover = this.popoverCtrl.create('PopoverViewEncounterPage', {
      encounterMember: member,
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

  combat() {
    if (this.encounter.turn == -1) // Non è ancora stata tirata l'iniziativa
      this.rollInitiative();
    else {
      this.encounter.turn += 1;
      this.encounters.editTurn(this.encounter, this.encounter.turn);
    }

    console.log("Round = " + this.getRound());
    console.log("Turno di = " + this.getTurnMember());
  }

  rollInitiative() {
    this.encounter.turn = 0;
    this.encounters.editTurn(this.encounter, this.encounter.turn);
    console.log(this.encounter.turn);
    for (let member of this.encounterMembers) {
      if (member.group != null)
        this.initiatives[member.key] = Math.floor(Math.random() * 20) + 1 + parseInt(member.initiativeModifier);
      else
        this.initiatives[member.key] = this.computeModifier(member.dexterity) + Math.floor(Math.random() * 20) + 1;
    }
    this.encounters.editInitiatives(this.encounter, this.initiatives);
    this.encounterMembers$ = Observable.of(this.encounterMembers).map((data) => {
      data.sort((a, b) => {
        if (this.initiatives[a.key] > this.initiatives[b.key]) {
          return -1;
        } else if (this.initiatives[a.key] < this.initiatives[b.key]) {
          return 1;
        }
        return 0;
      });
      return data;
    });

  }

  computeModifier(stat: number) {
    var n = (stat < 10 ? ((stat - 11) / 2) >> 0 : ((stat - 10) / 2) >> 0);
    return n;
  }

  selectHealth(member) {
    var jsonData = {
      numbers: [
      ],
      type: [
        { description: "Danno" },
        { description: "Cura" },
      ],
    }

    for (let index = 1; index < 1000; index++) {
      jsonData.numbers.push({ description: index });
    }

    this.wheelSelector.show({
      title: "Cosa vuoi fare?",
      items: [
        jsonData.type,
        jsonData.numbers,
      ],
      positiveButtonText: "OK",
      negativeButtonText: "Annulla",
    }).then(
      result => {

        var offset = parseInt(result[1].description);

        if (result[0].description == "Cura")
          offset *= -1;

        this.editMemberHP(member, offset);
      }
    );
  }

  getRound() {
    return (this.encounter.turn / this.encounterMembers.length) - ((Math.abs(this.encounter.turn) % this.encounterMembers.length) / this.encounterMembers.length) + 1;
  }

  getTurnMember() {
    return this.encounter.turn % this.encounterMembers.length;
  }

  restartEncounter() {
    let alert = this.alertCtrl.create({
      title: "Riavviare l'incontro?",
      buttons: [
        {
          text: 'Sì',
          handler: () => {
            this.encounter.turn = -1;
            this.encounters.editTurn(this.encounter, this.encounter.turn);
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

  loadImagesFromStorage() {
    for (let key of this.encounter.characterKeys)
      this.dataProvider.getCharacterImgDownloadUrl(key).then(
        (url) => {
          this.charactersImgSrcs[key] = url;
        },
        () => {
          this.charactersImgSrcs[key] = "assets/imgs/Default-Profile.png";
        });
  }

}
