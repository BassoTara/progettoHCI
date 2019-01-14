import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { Character } from '../../models/character/character.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';

/**
 * Generated class for the PopoverViewGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover-view-group',
  templateUrl: 'popover-view-group.html',
})
export class PopoverViewGroupPage {

  character: Character;
  group: Group;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService, public toastCtrl: ToastController) {
    this.character = this.navParams.get('character');
    this.group = this.navParams.get('group');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverViewGroupPage');
  }

  close() {
    this.viewCtrl.dismiss();
  }

  removeCharacter() {
    this.viewCtrl.dismiss();
    this.characters.removeCharacter(this.character).then(res => {
      console.log('res: ', res);
      let toast = this.toastCtrl.create({
        message: 'Character removed successfully!',
        duration: 3000
      });
      toast.present();
    });
  }
}

