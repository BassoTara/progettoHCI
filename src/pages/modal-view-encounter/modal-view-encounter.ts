import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-modal-view-encounter',
  templateUrl: 'modal-view-encounter.html',
})
export class ModalViewEncounterPage {

  encounterMember;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.encounterMember = this.navParams.get('encounterMember');
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalViewEncounterPage');
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }
  
}
