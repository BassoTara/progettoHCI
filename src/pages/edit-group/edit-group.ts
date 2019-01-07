import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private groups:GroupsListService) {
    console.log(navParams.get("players")); 
    this.group.players = navParams.get('players');
   }

  ionViewDidLoad() {
    this.group = this.navParams.get('group');
    setTimeout(() => this.resize(),0);
  }

  editGroup(group: Group){
    this.groups.editGroup(group).then(() => {
      this.navCtrl.setRoot('GruppiDeiGiocatoriPage');
    }); 
  }

  removeGroup(group: Group){
    this.groups.removeGroup(group).then(() => {
        this.navCtrl.setRoot('GruppiDeiGiocatoriPage');
      }); 
  }

  @ViewChild('myInput') myInput: ElementRef;

  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      element.style.height = 0 + 'px';
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 1) + 'px';
  }
}
