import { Component, group } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ToastController, Platform } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { Character } from '../../models/character/character.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-view-group',
  templateUrl: 'view-group.html',
})
export class ViewGroupPage {

  group: Group = {
    key: '',
    name: '',
    players: undefined,
    description: undefined,
  };

  charactersList$: Observable<Character[]>;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService, public popoverCtrl: PopoverController, public toastCtrl: ToastController) {
    this.charactersList$ = characters.getCharactersListByGroupKey(this.navParams.get('group').key).snapshotChanges().map(
      changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val(),
        }));
      }
    );
  }

  presentPopover(myEvent, myChar) {
    let popover = this.popoverCtrl.create('PopoverViewGroupPage', {
      character: myChar,
      group: this.group,
    });
    popover.present({
      ev: myEvent
    });

    let popoverBack = this.platform.registerBackButtonAction(() => {
      popover.dismiss();
    }, 3);

    popover.onDidDismiss(() => {
      popoverBack();
    });
  }

  ionViewDidLoad() {
    this.group = this.navParams.get('group');
  }

  removeCharacter(character: Character) {
    this.characters.removeCharacter(character).then(res => {
      console.log('res: ', res);
      let toast = this.toastCtrl.create({
        message: character.name + ' eliminato con successo!',
        duration: 3000
      });
      toast.present();
    });
  }

  pushToEditCharacter(character: Character) {
    var characterCopy = Object.assign({}, character);
    this.navCtrl.push('EditCharacterPage', {
      group: this.group,
      character: characterCopy,
    });
    
  }
}
