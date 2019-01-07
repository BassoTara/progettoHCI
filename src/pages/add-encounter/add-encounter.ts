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
    location: '',
    date: 0
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private encounters: EncountersListService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddEncounterPage');
  }

  addEncounter(encounter: Encounter){
    this.encounters.addEncounter(encounter).then(ref => {
      this.navCtrl.setRoot('IncontriPage', {key: ref.key});
      console.log(ref.key);
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
