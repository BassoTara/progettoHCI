import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Group } from '../../models/group/group.model';
import { Character } from '../../models/character/character.model';
import { GroupsListService } from '../../services/groups-list/groups-list.service';
import { CharactersListService } from '../../services/characters-list/characters-list.service';



@IonicPage()
@Component({
  selector: 'page-select-npc-group',
  templateUrl: 'select-npc-group.html',
})
export class SelectNpcGroupPage {

  players: boolean;
  character: Character;

  groupsList$: Observable<Group[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private groups: GroupsListService, private characters: CharactersListService, public toastCtrl: ToastController) {
    this.players = false;
    this.character = this.navParams.get('character');
    this.groupsList$ = groups.getGroupsList(this.players).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      }
    );
  }

  goToNewGroupPage() {
    this.navCtrl.push('AddGroupPage', { players: this.players });
  }

  selectGroup(group: Group) {
    this.character.group = group.key;
    this.characters.editCharacter(this.character).then(res => {
      console.log('res: ', res);
      let toast = this.toastCtrl.create({
        message: this.character.name + ' spostato in ' + group.name + '!',
        duration: 3000
      });
      toast.present();
    });

    this.navCtrl.pop();
  }

}
