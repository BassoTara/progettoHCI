import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Observable } from 'rxjs';
import { Character } from '../../models/character/character.model';

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
  encounterCharacters = [];
  encounterMonsters = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService) {
    let encounter = this.navParams.get('encounter');

    this.encounterCharacters = this.encounterCharacters.concat(encounter.characterList);
    this.encounterCharacters = this.encounterCharacters.concat(encounter.npcList);
    console.log(this.encounterCharacters);
    this.encounterMonsters = this.encounterMonsters.concat(encounter.monsterList);    
    console.log(this.encounterMonsters);

    this.encounterMembers = this.encounterCharacters.concat(this.encounterMonsters);
    console.log(this.encounterMembers);

    this.encounterMembers[0].name = "stronzolo";
    this.characters.editCharacter(this.encounterCharacters[0]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewEncounterPage');
  }

}
