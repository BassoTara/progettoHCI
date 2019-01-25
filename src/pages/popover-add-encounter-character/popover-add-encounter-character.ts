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

  index: number;
  callback;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private encounters: EncountersListService, public toastCtrl: ToastController) {
      this.index = this.navParams.get('index');
      this.callback = this.navParams.get('callback');
  }


  close() {
    this.viewCtrl.dismiss();
  }

  remove(){
    this.close();
    this.callback(this.index);
  }

}
