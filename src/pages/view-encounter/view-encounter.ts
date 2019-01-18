import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, Item } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Observable, Subject } from 'rxjs';
import { EncountersListService } from '../../services/encounters-list/encounter-list.service';
import { m } from '@angular/core/src/render3';



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

  encounterMembers;

  encounterMembers$;

  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService,
    private encounters: EncountersListService, public popoverCtrl: PopoverController, public modalCtrl: ModalController) {

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


    this.encounterMembers$.subscribe(list => {
      this.encounterMembers = list;
    })
    
    this.encounters.getInitiatives(this.encounter).valueChanges().subscribe(list => {
      for (let e of list) {
        this.initiatives[e["key"]] = e["value"];
      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEncounterPage');
  }

  editMember(member) {
    let amount = 10;
    member.currentHealth -= 10;

    console.log(this.initiatives);
    console.log(this.initiatives[member.key])

    if (member.group != null)
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
  }

  presentModal(member) {
    let modal = this.modalCtrl.create('ModalViewEncounterPage', {
      encounterMember: member,
    }, {
        cssClass: 'select-modal'
      });
    modal.present();
  }

  rollInitiative() {
    for (let member of this.encounterMembers) {
      this.initiatives[member.key] = 20;
    }
    this.encounters.editInitiatives(this.encounter, this.initiatives);
  }
}
