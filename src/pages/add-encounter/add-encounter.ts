import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';
import { EncountersListService } from '../../services/encounters-list/encounter-list.service';


@IonicPage()
@Component({
  selector: 'page-add-encounter',
  templateUrl: 'add-encounter.html',
})
export class AddEncounterPage {
  encounter: Encounter = {
    name: '',
    description: ''
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private encounters: EncountersListService) {
  }


  addEncounter(encounter: Encounter) {
    this.encounters.addEncounter(encounter).then(ref => {
      this.navCtrl.setRoot('IncontriPage', { key: ref.key });
      console.log(ref.key);
    });
  }

  ionViewDidLoad() {
    setTimeout(() => this.resizeName(), 0);
    setTimeout(() => this.resizeDesc(), 0);
    console.log('ionViewDidLoad AddGroupPage');
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
