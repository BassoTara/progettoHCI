import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Group } from '../../models/group/group.model';
import { GroupsListService } from '../../services/groups-list/groups-list.service';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Character } from '../../models/character/character.model';

/**
 * Generated class for the SelectPlayerGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-select-player-group',
  templateUrl: 'select-player-group.html',
})
export class SelectPlayerGroupPage {

  players: boolean;
  character: Character;

  groupsList$: Observable<Group[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private groups: GroupsListService, private characters: CharactersListService) {
    this.players = true;
    this.character = this.navParams.get('character');
    this.groupsList$=groups.getGroupsList(this.players).snapshotChanges().map(
      changes => {
        return changes.map(c =>({
          key: c.payload.key,...c.payload.val(),
        }));
      }
    );
  }

  goToNewGroupPage(){
    this.navCtrl.push('AddGroupPage', {players: this.players});
  }

  selectGroup(group : Group) {
    this.character.group = group.key;
    this.characters.editCharacter(this.character);
    this.navCtrl.pop();
  }

}
