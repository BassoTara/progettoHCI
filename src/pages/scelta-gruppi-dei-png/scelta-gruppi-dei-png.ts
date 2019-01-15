import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Group } from '../../models/group/group.model';
import { GroupsListService } from '../../services/groups-list/groups-list.service';


@IonicPage()
@Component({
  selector: 'page-scelta-gruppi-dei-png',
  templateUrl: 'scelta-gruppi-dei-png.html',
})
export class SceltaGruppiDeiPngPage {

  players: boolean;
  callback;
  // character: Character;

  groupsList$: Observable<Group[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private groups: GroupsListService, public toastCtrl : ToastController) {
    this.players = false;
    this.callback = this.navParams.get('callback');
    // this.character = this.navParams.get('character');
    this.groupsList$=groups.getGroupsList(this.players).snapshotChanges().map(
      changes => {
        return changes.map(c =>({
          key: c.payload.key,...c.payload.val(),
        }));
      }
    );
  }

}
