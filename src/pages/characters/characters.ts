import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Character } from '../../models/character/character.model';

/**
 * Generated class for the CharactersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-characters',
  templateUrl: 'characters.html',
})
export class CharactersPage {

  charactersList$: Observable<Character[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService) {
    this.charactersList$=characters.getCharactersList().snapshotChanges().map(
      changes => {
        return changes.map(c =>({
          key: c.payload.key,...c.payload.val(),
        }));
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CharactersPage');
  }

}
