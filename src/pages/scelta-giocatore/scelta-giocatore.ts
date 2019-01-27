import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, Navbar, AlertController } from 'ionic-angular';
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

  backAction;

  charactersList$: Observable<Character[]>;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService, public toastCtrl: ToastController, public alertCtrl: AlertController) {
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

  @ViewChild(Navbar) navBar: Navbar;

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.onBackButton();
    }
  }

  ionViewDidEnter() {
    this.backAction = this.platform.registerBackButtonAction(() => {
      this.onBackButton();
    }, 2);
  }

  ionViewDidLeave() {
    this.backAction();
  }

  onBackButton() {
    if (this.isEmpty()) {
      this.navCtrl.pop();
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Confermare la scelta prima di uscire?',
        buttons: [
          {
            text: 'Sì',
            handler: () => {
              this.confirmCharacters()
            }
          },
          {
            text: 'No',
            handler: () => {
              this.navCtrl.remove(2, 1);
              this.navCtrl.pop();
            }
          }
        ]
      });
      let alertBack = this.platform.registerBackButtonAction(() => {
        alert.dismiss();
      }, 3)
      alert.onDidDismiss(() => {
        alertBack();
      })
      alert.present();
    }
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
      this.navCtrl.remove(2, 1);
      this.navCtrl.pop();
    });
  }

  isEmpty() {
    for (let value of this.checkedCharacters)
      if (value)
        return false;
    return true;
  }
}
