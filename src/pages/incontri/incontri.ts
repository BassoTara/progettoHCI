import { Component } from '@angular/core';
import { NavController, IonicPage, ToastController, PopoverController } from 'ionic-angular';
import { EncountersListService } from '../../services/encounters-list/encounter-list.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Encounter } from '../../models/encounter/encounter.model';

@IonicPage()
@Component({
  selector: 'page-incontri',
  templateUrl: 'incontri.html'
})
export class IncontriPage {

  encountersList$: Observable<Encounter[]>;


  constructor(public navCtrl: NavController, private encounters: EncountersListService, public toastCtrl: ToastController, public popoverCtrl: PopoverController) {
    this.encountersList$ = this.encounters
      .getEncountersList() // return an encounters list from the database
      .snapshotChanges()   // key and value of the changed data
      .map(changes => {
        return changes.map(c => ({ // for each of these changes i return a new object 
          key: c.payload.key,
          ...c.payload.val(),
        }));
      });
  }

  presentPopover(myEvent, myEncounter) {
    let popover = this.popoverCtrl.create('PopoverEncounterPage', {
      encounter: myEncounter,
    });
    popover.present({
      ev: myEvent
    });
  }

  removeEncounter(encounter: Encounter) {
    this.encounters.removeEncounter(encounter).then(res => {
      console.log('res: ', res);
      let toast = this.toastCtrl.create({
        message: 'Encounter removed successfully!',
        duration: 3000
      });
      toast.present();
    });
  }

}
