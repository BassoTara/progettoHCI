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

  charactersList$: Observable<Character[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService, public toastCtrl: ToastController) {
    this.group = this.navParams.get('group');
    this.callback = this.navParams.get('callback');
    this.charactersList$ = characters.getCharactersListByGroupKey(this.group.key).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      }
    );
  }

  chooseCharacter(character: Character) {
    this.callback(character).then(() => {
      this.navCtrl.remove(2, 1);
      this.navCtrl.pop();
    });
  }

}
