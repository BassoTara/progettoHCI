import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
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


  constructor(public navCtrl: NavController, private encounters: EncountersListService) {
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
  
}
