import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { GroupsListService } from '../../services/groups-list/groups-list.service';


@IonicPage()
@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html',
})
export class AddGroupPage {


  group: Group = {
    // key: '',
    name: '',
    players: undefined,
    description: '',
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private groups:GroupsListService) {
    console.log(navParams.get("players")); 
    this.group.players = navParams.get('players');
    // this.group.key = groups.getGroupKey();
   }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGroupPage');
  }

  addGroup(group: Group){
    this.groups.addGroup(group).then(ref => {
      if(this.group.players)
        this.navCtrl.setRoot('GruppiDeiGiocatoriPage', {key:ref.key});
      else
        this.navCtrl.setRoot('GruppiDeiPNGPage', {key:ref.key});
    });
  }

  @ViewChild('myInput') myInput: ElementRef;

  resize() {
      var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
      element.style.height = 0 + 'px';
      var scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + 'px';
      this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }
}
