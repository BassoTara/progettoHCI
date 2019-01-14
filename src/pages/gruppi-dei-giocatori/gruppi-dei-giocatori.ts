
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, PopoverController, ToastController } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { GroupsListService } from '../../services/groups-list/groups-list.service';
import { PopoverGroupsPage } from '../popover-groups/popover-groups';

@IonicPage()
@Component({
  selector: 'page-gruppi-dei-giocatori',
  templateUrl: 'gruppi-dei-giocatori.html'
})
export class GruppiDeiGiocatoriPage {
  players: boolean;

  groupsList$: Observable<Group[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private groups: GroupsListService, public popoverCtrl: PopoverController, public toastCtrl: ToastController) {
    this.players = true;
    this.groupsList$ = groups.getGroupsList(this.players).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      }
    );
  }

  presentPopover(myEvent, myGroup) {
    let popover = this.popoverCtrl.create(PopoverGroupsPage, {
      group: myGroup,
    });
    popover.present({
      ev: myEvent
    });
  }

  goToNewGroupPage() {
    this.navCtrl.push('AddGroupPage', { players: this.players });
  }

  removeGroup(group: Group) {
    this.groups.removeGroup(group).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Group removed successfully!',
        duration: 3000
      });
      toast.present();

    });
  }

}
