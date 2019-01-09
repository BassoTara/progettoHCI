import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content} from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Character } from '../../models/character/character.model';


@IonicPage()
@Component({
  selector: 'page-view-character',
  templateUrl: 'view-character.html',
})

export class ViewCharacterPage {

  @ViewChild(Content) content: Content;

  group: Group = {
    key: '',
    name: '',
    players: undefined,
    description: undefined,
  };

  character: Character = {
    name: '',
    armorClass: undefined,
    initiativeModifier: undefined,
    healthPoints: undefined,
    description: undefined,
    group: 0,
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService) {
  }

  ionViewWillLoad() {
    this.character = this.navParams.get('character');
    this.group = this.navParams.get('group');
    console.log("chiamato ionViewWillLoad");
  }

  ionViewDidLoad() {
    console.log("chiamato ionViewDidLoad");
  }

  editCharacter(character: Character) {
    this.characters.editCharacter(character).then(() => {
      this.navCtrl.push('ViewGroupPage', { group: this.group });
    });
  }

  removeCharacter(character: Character) {
    this.characters.removeCharacter(character).then(() => {
      this.navCtrl.push('ViewGroupPage', { group: this.group });
    });
  }



}
