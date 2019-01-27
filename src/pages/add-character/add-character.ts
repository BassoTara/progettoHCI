import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Navbar, Platform } from 'ionic-angular';
import { Character } from '../../models/character/character.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Group } from '../../models/group/group.model';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { DataProvider } from '../../app/data';
import { Observable } from 'rxjs';


@IonicPage()
@Component({
  selector: 'page-add-character',
  templateUrl: 'add-character.html',
})
export class AddCharacterPage {

  defaultImgSrc: string = "assets/imgs/Default-Profile.png";
  imgSrc: string = this.defaultImgSrc;

  files: Observable<any[]>;

  @ViewChild('myInputName') myInputName: ElementRef;
  @ViewChild('myInputDesc') myInputDesc: ElementRef;

  group: Group = {
    key: '',
    name: '',
    players: undefined,
    description: '',
  };

  character: Character = {
    name: '',
    armorClass: undefined,
    initiativeModifier: undefined,
    healthPoints: undefined,
    currentHealth: undefined,
    description: '',
    group: "0"
  };

  backAction;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService,
    private camera: Camera, private dataProvider: DataProvider, private alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  uploadInformation(base64String: string, name: string) {
    let upload = this.dataProvider.uploadImageCharacterToStorage(base64String, name);

    upload.then().then(res => {
      console.log('res: ', res);
    });
  }

  @ViewChild(Navbar) navBar: Navbar;

  ionViewDidLoad() {
    this.group = this.navParams.get('group');
    this.character.group = this.navParams.get('group').key;

    this.navBar.backButtonClick = (e: UIEvent) => {
      this.onBackButton();
    }

    setTimeout(() => this.resizeName(), 0);
    setTimeout(() => this.resizeDesc(), 0);
    console.log(this.navParams.get('group'));
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
    if(this.isEmpty())
      this.navCtrl.pop();
    else if (this.getAuthorization()) {
      let alert = this.alertCtrl.create({
        title: 'Salvare le modifiche prima di uscire?',
        buttons: [
          {
            text: 'Sì',
            handler: () => {
              this.addCharacter(this.character);
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

  addCharacter(character: Character) {
    this.character.currentHealth = this.character.healthPoints;
    this.characters.addCharacter(character).then(ref => {
      if (this.defaultImgSrc != this.imgSrc)
        this.uploadInformation(this.imgSrc, ref.key);
      let toast = this.toastCtrl.create({
        message: this.character.name + ' aggiunto a ' + this.group.name + '!',
        duration: 3000
      });
      toast.present();
      //this.navCtrl.push('ViewGroupPage', { group: this.group });
      this.navCtrl.pop();
      
    });
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

  pickAndCropImage() {

    const options: CameraOptions = {
      quality: 40,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetWidth: -1,
      targetHeight: -1,
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imgSrc = 'data:image/jpeg;base64,' + imageData;
    });

  }

  getAuthorization() {
    if (this.character.name != '' && this.character.initiativeModifier != undefined && this.character.armorClass != undefined && this.character.armorClass != 0 && this.character.healthPoints != undefined && this.character.healthPoints != 0)
      return true;
    else
      return false;
  }

  isEmpty() {
    return this.character.name=="" && this.character.initiativeModifier == undefined && (this.character.armorClass == undefined || this.character.armorClass ==0) && (this.character.healthPoints == undefined || this.character.healthPoints == 0) && this.character.description == "";
  }

}
