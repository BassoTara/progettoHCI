import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { GroupsListService } from '../../services/groups-list/groups-list.service';
import { Observable } from 'rxjs';
import { Group } from '../../models/group/group.model';

/**
 * Generated class for the SceltaGruppiDeiGiocatoriPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scelta-gruppi-dei-giocatori',
  templateUrl: 'scelta-gruppi-dei-giocatori.html',
})
export class SceltaGruppiDeiGiocatoriPage {

  players: boolean;
  callback;
  // character: Character;

  groupsList$: Observable<Group[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private groups: GroupsListService, public toastCtrl : ToastController) {
    this.players = true;
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
