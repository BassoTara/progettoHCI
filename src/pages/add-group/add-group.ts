
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Navbar, Platform } from 'ionic-angular';
import { Group } from '../../models/group/group.model';
import { GroupsListService } from '../../services/groups-list/groups-list.service';
import { group } from '@angular/core/src/animation/dsl';


@IonicPage()
@Component({
  selector: 'page-add-group',
  templateUrl: 'add-group.html',
})
export class AddGroupPage {

  @ViewChild(Navbar) navBar: Navbar;

  group: Group = {
    // key: '',
    name: '',
    players: undefined,
    description: '',
  };

  backAction;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private groups: GroupsListService, private alertCtrl: AlertController) {
    console.log(navParams.get("players"));
    this.group.players = navParams.get('players');
    // this.group.key = groups.getGroupKey();
  }

  addGroup(group: Group) {
    this.groups.addGroup(group);
    this.navCtrl.pop();

  }

  @ViewChild('myInputName') myInputName: ElementRef;
  @ViewChild('myInputDesc') myInputDesc: ElementRef;

  ionViewDidLoad() {

    this.navBar.backButtonClick = (e: UIEvent) => {
      this.onBackButton();
    }
    setTimeout(() => this.resizeName(), 0);
    setTimeout(() => this.resizeDesc(), 0);
    console.log("chiamato ionViewDidLoad");
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
    if (this.isEmpty())
      this.navCtrl.pop();
    else if (this.getAuthorization()) {
      let alert = this.alertCtrl.create({
        title: 'Salvare le modifiche prima di uscire?',
        buttons: [
          {
            text: 'Sì',
            handler: () => {
              this.addGroup(this.group);
            }
          },
          {
            text: 'No',
            handler: () => {
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
    else {
      let alert = this.alertCtrl.create({
        title: 'Campi vuoti, uscire senza salvare?',
        buttons: [
          {
            text: 'Sì',
            handler: () => {
              this.navCtrl.pop();

            }
          },
          {
            text: 'No',
            handler: () => {

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

  isEmpty() {
    return this.group.name == "" && this.group.description == "";
  }
}
