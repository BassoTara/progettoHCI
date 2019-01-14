import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Group } from '../../models/group/group.model';

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

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController) {
    this.group = this.navParams.get('group');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverViewGroupPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  removeGroup() {

  }

}
