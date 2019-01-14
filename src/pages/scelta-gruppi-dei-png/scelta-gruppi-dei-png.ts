import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { Group } from '../../models/group/group.model';
import { GroupsListService } from '../../services/groups-list/groups-list.service';

/**
 * Generated class for the SceltaGruppiDeiPngPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scelta-gruppi-dei-png',
  templateUrl: 'scelta-gruppi-dei-png.html',
})
export class SceltaGruppiDeiPngPage {

  players: boolean;
  // character: Character;

  groupsList$: Observable<Group[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private groups: GroupsListService, public toastCtrl: ToastController) {
    this.players = false;
    // this.character = this.navParams.get('character');
    this.groupsList$ = groups.getGroupsList(this.players).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      }
    );
  }

}
