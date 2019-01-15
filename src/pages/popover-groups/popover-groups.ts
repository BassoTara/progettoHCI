import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { GroupsListService } from '../../services/groups-list/groups-list.service';

/**
 * Generated class for the PopoverGroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
        message: 'Group removed successfully!',
        duration: 3000
      });
      toast.present();
    });
  }

}
