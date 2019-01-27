
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, PopoverController, ToastController, Platform } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { GroupsListService } from '../../services/groups-list/groups-list.service';

@IonicPage()
@Component({
  selector: 'page-gruppi-dei-giocatori',
  templateUrl: 'gruppi-dei-giocatori.html'
})
export class GruppiDeiGiocatoriPage {
  players: boolean;

  groupsList$: Observable<Group[]>;

  backAction;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private groups: GroupsListService, public popoverCtrl: PopoverController, public toastCtrl: ToastController) {
    this.players = true;
    this.groupsList$ = groups.getGroupsList(this.players).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      }
    );

  }

  ionViewDidEnter() {
    this.backAction = this.platform.registerBackButtonAction(() => {
      this.navCtrl.setRoot("IncontriPage");
      
    }, 2);
  }

  ionViewDidLeave() {
    this.backAction();
  }

  presentPopover(myEvent, myGroup) {
    let popover = this.popoverCtrl.create('PopoverGroupsPage', {
      group: myGroup,
    });
    popover.present({
      ev: myEvent
    });

    let popoverBack = this.platform.registerBackButtonAction(() => {
      popover.dismiss();
    }, 3);

    popover.onDidDismiss(() => {
      popoverBack();
    });
  }

  goToNewGroupPage() {
    this.navCtrl.push('AddGroupPage', { players: this.players });
    
  }

  removeGroup(group: Group) {
    this.groups.removeGroup(group).then(() => {
      let toast = this.toastCtrl.create({
        message: this.groups+' rimosso con successo!',
        duration: 3000
      });
      toast.present();

    });
  }

  pushToViewGroupPage(group: Group) {
    this.navCtrl.push("ViewGroupPage", {group: group});
    
  }

  pushToEditGroupPage(group: Group) {
    this.navCtrl.push("EditGroupPage", {group: group});
    
  }

}
