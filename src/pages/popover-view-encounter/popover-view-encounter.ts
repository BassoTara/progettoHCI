import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverViewEncounterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-view-encounter',
  templateUrl: 'popover-view-encounter.html',
})
export class PopoverViewEncounterPage {

  encounterMember;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.encounterMember = this.navParams.get('encounterMember');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverViewEncounterPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }
  
}
