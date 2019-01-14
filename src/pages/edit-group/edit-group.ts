import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { GroupsListService } from '../../services/groups-list/groups-list.service';

/**
 * Generated class for the EditGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-group',
  templateUrl: 'edit-group.html',
})

export class EditGroupPage {

  group: Group = {
    // key: '',
    name: '',
    players: undefined,
    description: undefined, 
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private groups:GroupsListService, public toastCtrl: ToastController) {
    console.log(navParams.get("players")); 
    this.group.players = navParams.get('players');
   }

  ionViewDidLoad() {
    this.group = this.navParams.get('group');
    setTimeout(() => this.resizeName(),0);
    setTimeout(() => this.resizeDesc(),0);
  }

  editGroup(group: Group){
    this.groups.editGroup(group).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Group edited successfully!',
        duration: 3000
      });
      toast.present();

      this.navCtrl.pop();
    }); 
  }

  removeGroup(group: Group){
    this.groups.removeGroup(group).then(() => {
        this.navCtrl.pop();
      }); 
  }

  @ViewChild('myInputName') myInputName: ElementRef;
  @ViewChild('myInputDesc') myInputDesc: ElementRef;

  resizeName() {
      var element = this.myInputName['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      element.style.height = 0 + 'px';
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInputName['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  resizeDesc() {
    var element = this.myInputDesc['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    element.style.height = 0 + 'px';
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInputDesc['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }
}
