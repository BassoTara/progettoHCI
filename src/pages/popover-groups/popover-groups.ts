import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { GroupsListService } from '../../services/groups-list/groups-list.service';


@IonicPage()
@Component({
  selector: 'page-popover-groups',
  templateUrl: 'popover-groups.html',
})
export class PopoverGroupsPage {

  group: Group;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private groups: GroupsListService, public toastCtrl: ToastController) {
    this.group = this.navParams.get('group');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverGroupsPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  removeGroup() {
    this.close();
    this.groups.removeGroup(this.group).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Gruppo rimosso con successo!',
        duration: 3000
      });
      toast.present();
    });
  }

}
