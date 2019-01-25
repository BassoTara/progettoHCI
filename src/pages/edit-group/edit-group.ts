import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Navbar, AlertController, Platform } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { GroupsListService } from '../../services/groups-list/groups-list.service';


@IonicPage()
@Component({
  selector: 'page-edit-group',
  templateUrl: 'edit-group.html',
})

export class EditGroupPage {

  group: Group = {
    // key: '',
    name: '',
    players: undefined,
    description: undefined,
  };

  backAction;

  constructor(public platform: Platform, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, private groups: GroupsListService, public toastCtrl: ToastController) {
    console.log(navParams.get("players"));
    this.group.players = navParams.get('players');

    this.backAction = platform.registerBackButtonAction(() => {
      this.onBackButton();
    }, 2);
  }

  onBackButton() {
    if (this.getAuthorization()) {
      let alert = this.alertCtrl.create({
        title: 'Salvare le modifiche?',
        buttons: [
          {
            text: 'Sì',
            handler: () => {
              this.editGroup(this.group);
            }
          },
          {
            text: 'No',
            handler: () => {
              this.navCtrl.pop();
              this.backAction();
            }
          }
        ]
      });
      alert.present();
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Campi vuoti, uscire senza salvare?',
        buttons: [
          {
            text: 'Sì',
            handler: () => {
              this.navCtrl.pop();
              this.backAction();
            }
          },
          {
            text: 'No',
            handler: () => {

            }
          }
        ]
      });
      alert.present();
    }
  }

  ionViewDidLoad() {

    this.group = this.navParams.get('group');

    this.navBar.backButtonClick = (e: UIEvent) => {
      this.onBackButton();
    }
    setTimeout(() => this.resizeName(), 0);
    setTimeout(() => this.resizeDesc(), 0);
    console.log("chiamato ionViewDidLoad");
  }


  editGroup(group: Group) {
    this.groups.editGroup(group).then(() => {
      let toast = this.toastCtrl.create({
        message: this.group.name + ' modificato con successo!',
        duration: 3000
      });
      toast.present();

      this.navCtrl.pop();
      this.backAction();
    });
  }

  removeGroup(group: Group) {
    this.groups.removeGroup(group).then(() => {
      let toast = this.toastCtrl.create({
        message: this.group.name + ' eliminato con successo!',
        duration: 3000
      });
      toast.present();
      this.navCtrl.pop();
      this.backAction();
    });
  }

  @ViewChild('myInputName') myInputName: ElementRef;
  @ViewChild('myInputDesc') myInputDesc: ElementRef;
  @ViewChild(Navbar) navBar: Navbar;

  resizeName() {
    var element = this.myInputName['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    element.style.height = 0 + 'px';
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInputName['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  resizeDesc() {
    var element = this.myInputDesc['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    element.style.height = 0 + 'px';
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInputDesc['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

  getAuthorization() {
    if (this.group.name === "")
      return false;
    else
      return true;
  }
}
