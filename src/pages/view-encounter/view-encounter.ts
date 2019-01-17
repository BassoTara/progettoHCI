import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController, Item } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Observable } from 'rxjs';
import { Character } from '../../models/character/character.model';
import { group } from '@angular/core/src/animation/dsl';
import { EncountersListService } from '../../services/encounters-list/encounter-list.service';


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

  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService,
    private encounters: EncountersListService, public popoverCtrl: PopoverController, public modalCtrl: ModalController) {

    this.encounter = this.navParams.get('encounter');
    this.encounterMonsters = this.encounter.monsterList;

    for (let key of this.encounter.characterKeys) {
      this.characters.getCharacterByKey(key).valueChanges().subscribe(item => {
        this.encounterCharacters.push(item);
        this.encounterMembers.push(item);
      })
    }

    this.encounterMembers = this.encounterMembers.concat(this.encounterMonsters);

  }

  ionViewDidLoad() {
    this.encounterMembers = this.encounterCharacters.concat(this.encounterMonsters);
    console.log('ionViewDidLoad ViewEncounterPage');
  }

  editMember(member) {
    let amount = 10;
    member.currentHealth -= 10;

    if (member.group != null)
      // console.log(member.name + " fa parte di encounterCharacters!");
      this.characters.editCharacter(member);

    // this.encounters.editEncounter(this.encounter);

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
