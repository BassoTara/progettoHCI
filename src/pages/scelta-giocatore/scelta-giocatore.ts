import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Character } from '../../models/character/character.model';
import { Observable } from 'rxjs';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Group } from '../../models/group/group.model';


@IonicPage()
@Component({
  selector: 'page-scelta-giocatore',
  templateUrl: 'scelta-giocatore.html',
})
export class SceltaGiocatorePage {

  group: Group;
  callback;
  checkedCharacters: boolean[];
  list = [];

  charactersList$: Observable<Character[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService, public toastCtrl: ToastController) {
    this.group = this.navParams.get('group');
    this.callback = this.navParams.get('callback');
    this.charactersList$ = characters.getCharactersListByGroupKey(this.group.key).snapshotChanges().map(
      changes => {
        this.checkedCharacters = new Array(changes.length).fill(false);
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      }
    );
    this.charactersList$.subscribe(list => {
      this.list = list;
    });
  }

  confirmCharacters() {
    var chosenCharacters = [];
    for (let index in this.list) {
      if (this.checkedCharacters[index])
        chosenCharacters.push(this.list[index]);
      
        
    }
 
    console.log(this.checkedCharacters);
    console.log(chosenCharacters);

     this.callback(chosenCharacters).then(() => {
       this.navCtrl.remove(2,1);
       this.navCtrl.pop();
     });

  }
}
