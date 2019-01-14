
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { GroupsListService } from '../../services/groups-list/groups-list.service';

@IonicPage()
@Component({
  selector: 'page-gruppi-dei-giocatori',
  templateUrl: 'gruppi-dei-giocatori.html'
})
export class GruppiDeiGiocatoriPage {
  players: boolean;

  groupsList$: Observable<Group[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private groups: GroupsListService) {
    this.players = true;
    this.groupsList$=groups.getGroupsList(this.players).snapshotChanges().map(
      changes => {
        return changes.map(c =>({
          key: c.payload.key,...c.payload.val(),
        }));
      }
    );
  }

  goToNewGroupPage(){
    this.navCtrl.push('AddGroupPage', {players: this.players});
  }
  
}
