import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Encounter } from '../../models/encounter/encounter.model';
import { EncountersListService } from '../../services/encounters-list/encounter-list.service';
import { Character } from '../../models/character/character.model';



@IonicPage()
@Component({
  selector: 'page-popover-add-encounter-character',
  templateUrl: 'popover-add-encounter-character.html',
})
export class PopoverAddEncounterCharacterPage {

  encounter: Encounter;
  character: Character;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private encounters: EncountersListService, public toastCtrl: ToastController) {
    this.encounter = this.navParams.get('encounter');
    this.character = this.navParams.get('character');
  }


  close() {
    this.viewCtrl.dismiss();
  }

  removeCharacter() {
    this.close();
    this.encounters.removeEncounter(this.encounter).then(() => {
      let toast = this.toastCtrl.create({
        message: 'Incontro eliminato con successo!',
        duration: 3000
      });
      toast.present();
    });
  }


}
