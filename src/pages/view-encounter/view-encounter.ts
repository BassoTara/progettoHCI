import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ModalController } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Observable } from 'rxjs';
import { Character } from '../../models/character/character.model';
import { group } from '@angular/core/src/animation/dsl';


@IonicPage()
@Component({
  selector: 'page-view-encounter',
  templateUrl: 'view-encounter.html',
})
export class ViewEncounterPage {

  encounter: Encounter;
  encounterCharacters =[];
  encounterMonsters = [];
  encounterMembers = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService, public popoverCtrl: PopoverController, public modalCtrl: ModalController) {
    this.encounter = this.navParams.get('encounter');


    this.encounterCharacters = this.encounter.characterList;
    this.encounterCharacters = this.encounterCharacters.concat(this.encounter.npcList);
    console.log(this.encounterCharacters);
    this.encounterMonsters = this.encounter.monsterList;    
    console.log(this.encounterMonsters);

    this.encounterMembers = this.encounterCharacters.concat(this.encounterMonsters);
    console.log(this.encounterMembers);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEncounterPage');
  }

  editMember(member){
    let amount = 10;

    if(member.group != null){
      console.log(member.name + " fa parte di encounterCharacters!");
      this.characters.editCharacter(member);
      this.encounter.characterList.
    }
    else{
      console.log(member.name + " fa parte di encounterMonsters!");
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
      cssClass: 'select-modal'
    });
    modal.present();
  }
}
