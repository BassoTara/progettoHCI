import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, Item, Modal, ModalOptions } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Observable, Subject } from 'rxjs';
import { EncountersListService } from '../../services/encounters-list/encounter-list.service';
import { WheelSelector } from '@ionic-native/wheel-selector';



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

  encounterMembers = [];

  encounterMembers$;


  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService,
    private encounters: EncountersListService, public popoverCtrl: PopoverController, public modalCtrl: ModalController, public wheelSelector: WheelSelector) {

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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEncounterPage');
  }

  editMemberHP(member, offset) {
    member.currentHealth += offset;

    if (member.currentHealth < 0)
      member.currentHealth = 0;

    if (member.group != null) {
      if (member.currentHealth > member.healthPoints)
        member.currentHealth = member.healthPoints;
      this.characters.editCharacter(member);
    }
    else {
      if (member.currentHealth > member.hit_points)
        member.currentHealth = member.hit_points;
      this.encounters.editEncounterByMonster(this.encounter, member);
    }


  }

  presentPopover(myEvent, member) {
    let popover = this.popoverCtrl.create('PopoverViewEncounterPage', {
      encounterMember: member,
    });
    popover.present({
      ev: myEvent
    });
  }

  presentModal(member) {
    let modal = this.modalCtrl.create('ModalViewEncounterPage', {
      encounterMember: member,
    }, {
        cssClass: 'select-modal',
      });
    modal.present();
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
        { description: "Damage" },
        { description: "Healing" },
      ],
    };

    for (let index = 1; index < 1000; index++) {
      jsonData.numbers.push({ description: index });
    }

    this.wheelSelector.show({
      title: "How Many?",
      items: [
        jsonData.type,
        jsonData.numbers,
      ],
    }).then(
      result => {
        var offset = parseInt(result[1].description);

        if (result[0].description == "Damage")
          offset *= -1;

        this.editMemberHP(member, offset);
      }
    );
  }
}
