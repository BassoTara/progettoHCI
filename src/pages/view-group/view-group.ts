import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { Character } from '../../models/character/character.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { GroupsListService } from '../../services/groups-list/groups-list.service';
import { Observable } from 'rxjs';
import { group } from '@angular/core/src/animation/dsl';

/**
 * Generated class for the ViewGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-group',
  templateUrl: 'view-group.html',
})
export class ViewGroupPage {

  group: Group = {
    key: '',
    name: '',
    players: undefined,
    description: undefined,
  };

  charactersList$: Observable<Character[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService) {
    this.charactersList$=characters.getCharactersListByGroupKey(this.navParams.get('group').key).snapshotChanges().map(
      changes => {
        return changes.map(c =>({
          key: c.payload.key,...c.payload.val(),
        }));
      }
    );
  }

  ionViewDidLoad() {
    this.group = this.navParams.get('group');
  }

}
