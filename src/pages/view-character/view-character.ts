import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Character } from '../../models/character/character.model';
import { DataProvider } from '../../app/data';


@IonicPage()
@Component({
  selector: 'page-view-character',
  templateUrl: 'view-character.html',
})

export class ViewCharacterPage {

  @ViewChild(Content) content: Content;

  group: Group;

  character: Character = {
    name: '',
    armorClass: undefined,
    initiativeModifier: undefined,
    healthPoints: undefined,
    currentHealth: undefined,
    description: undefined,
    group: "0",
  };

  imgSrc: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService, private dataProvider: DataProvider) {
  }

  loadImageFromStorage() {
    this.dataProvider.getCharacterImgDownloadUrl(this.character.key).then(
      (url) => {
        this.imgSrc = url;
      },
      () => { });
  }

  ionViewWillLoad() {
    this.character = this.navParams.get('character');
    if (this.navParams.get("group") != null)
      this.group = this.navParams.get('group');
    console.log("chiamato ionViewWillLoad");
  }

  ionViewDidLoad() {
    console.log("chiamato ionViewDidLoad");
    this.loadImageFromStorage();
  }
  
}
