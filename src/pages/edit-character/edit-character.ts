import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Character } from '../../models/character/character.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Group } from '../../models/group/group.model';



@IonicPage()
@Component({
  selector: 'page-edit-character',
  templateUrl: 'edit-character.html',
})
export class EditCharacterPage {
  

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

  ionViewDidLoad(){
    setTimeout(() => this.resize(),0);
    console.log("chiamato ionViewDidLoad");
  }

  editCharacter(character: Character){
    this.characters.editCharacter(character).then(() => {
        this.navCtrl.push('ViewGroupPage',{group : this.group});
      }); 
  }

  removeCharacter(character: Character){
    this.characters.removeCharacter(character).then(() => {
        this.navCtrl.push('ViewGroupPage',{group : this.group});
      }); 
  }

  @ViewChild('myInput') myInput: ElementRef;

  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      element.style.height = 0 + 'px';
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 24) + 'px';
  }
}
