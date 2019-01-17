import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, Item } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Observable, Subject } from 'rxjs';
import { Character } from '../../models/character/character.model';
import { group } from '@angular/core/src/animation/dsl';
import { EncountersListService } from '../../services/encounters-list/encounter-list.service';
import { timeout } from 'rxjs/operator/timeout';
import { setTimeout } from 'timers';
import { Monster } from '../../models/monster/monster.model';


@IonicPage()
@Component({
  selector: 'page-view-encounter',
  templateUrl: 'view-encounter.html',
})
export class ViewEncounterPage {

  encounter: Encounter;
  encounterCharacters = [];
  encounterMonsters = [];
  encounterMembers = [];

  charactersList$;
  monstersList$;

  encounterMembers$;

  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService,
    private encounters: EncountersListService, public popoverCtrl: PopoverController, public modalCtrl: ModalController) {

    this.encounter = this.navParams.get('encounter');
    this.encounterMonsters = this.encounter.monsterList;

    /*  this.characters.getCharacterByKey(key).valueChanges().subscribe(item => {
       this.encounterCharacters.push(item);
       this.encounterMembers.push(item);
     }); */

    let observables = this.encounter.characterKeys.map(key => {
      return this.characters.getCharacterByKey(key).valueChanges();
    });

    this.monstersList$ = this.encounters.getMonstersByEncounterKey(this.encounter.key).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      }
    );

    console.log(this.encounter.monsterList);

    observables.push(this.monstersList$);

    this.charactersList$ = Observable.combineLatest(
      observables,
      (...keys) => {
        return Array.prototype.concat(...keys);
      }
    );

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEncounterPage');
  }

  editMember(member) {
    let amount = 10;
    member.currentHealth -= 10;

    if (member.group != null)
      // console.log(member.name + " fa parte di encounterCharacters!");
      this.characters.editCharacter(member);

    this.encounters.editEncounter(this.encounter);
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
}
