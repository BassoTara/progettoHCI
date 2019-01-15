import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { EncountersListService } from '../../services/encounters-list/encounter-list.service';
import { Encounter } from '../../models/encounter/encounter.model';

@IonicPage()
@Component({
  selector: 'page-popover-encounter',
  templateUrl: 'popover-encounter.html',
})
export class PopoverEncounterPage {

  encounter: Encounter;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private encounters: EncountersListService, public toastCtrl: ToastController) {
    this.encounter = this.navParams.get('encounter');
  }


  close() {
    this.viewCtrl.dismiss();
  }

  removeEncounter() {
    this.close();
    this.encounters.removeEncounter(this.encounter).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Encounter removed successfully!',
        duration: 3000
      });
      toast.present();
    });
  }


}
