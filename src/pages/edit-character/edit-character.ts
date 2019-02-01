import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, Navbar, Platform } from 'ionic-angular';
import { Character } from '../../models/character/character.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Group } from '../../models/group/group.model';
import { DataProvider } from '../../app/data';
import { Camera, CameraOptions } from '@ionic-native/camera';



@IonicPage()
@Component({
  selector: 'page-edit-character',
  templateUrl: 'edit-character.html',
})
export class EditCharacterPage {


  imgHasChanged: boolean = false;
  imgSrc: string = "assets/imgs/Default-Profile.png";
  backAction;

  @ViewChild(Navbar) navBar: Navbar;

  group: Group = {
    key: '',
    name: '',
    players: undefined,
    description: undefined,
  };

  character: Character;

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService, private camera: Camera, private dataProvider: DataProvider, private alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  loadImageFromStorage() {
    this.dataProvider.getCharacterImgDownloadUrl(this.character.key).then(
      (url) => {
        this.imgSrc = url;
      },
      () => { });
  }

  ionViewWillLoad() {
    this.character = this.navParams.get('character');
    this.group = this.navParams.get('group');
    console.log("chiamato ionViewWillLoad");
  }

  ionViewDidEnter() {
    this.backAction = this.platform.registerBackButtonAction(() => {
      this.onBackButton();
    }, 2);
  }

  ionViewDidLeave() {
    this.backAction();
  }

  ionViewDidLoad() {
    this.navBar.backButtonClick = (e: UIEvent) => {
      this.onBackButton();
    }
    setTimeout(() => this.resizeName(), 0);
    setTimeout(() => this.resizeDesc(), 0);
    this.loadImageFromStorage();
    console.log("chiamato ionViewDidLoad");
  }

  onBackButton() {
    if (this.getAuthorization()) {
      let alert = this.alertCtrl.create({
        title: 'Salvare le modifiche prima di uscire?',
        buttons: [
          {
            text: 'Sì',
            handler: () => {
              this.editCharacter();
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

  editCharacter() {
    this.characters.editCharacter(this.character).then(() => {
      if (this.imgHasChanged)
        this.uploadInformation(this.imgSrc, this.character.key);
      let toast = this.toastCtrl.create({
        message: this.character.name + ' modificato con successo!',
        duration: 3000
      });
      toast.present();
      //this.navCtrl.push('ViewGroupPage', { group: this.group });
      this.navCtrl.pop();

    });
  }

  removeCharacter() {
    this.characters.removeCharacter(this.character).then(res => {
      console.log('res: ', res);
      let toast = this.toastCtrl.create({
        message: this.character.name + ' rimosso con successo!',
        duration: 3000
      });
      toast.present();
    });
    this.navCtrl.pop();

  }

  @ViewChild('myInputName') myInputName: ElementRef;
  @ViewChild('myInputDesc') myInputDesc: ElementRef;

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
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imgSrc = 'data:image/jpeg;base64,' + imageData;
      this.imgHasChanged = true;
    });

  }

  uploadInformation(base64String: string, name: string) {
    let upload = this.dataProvider.uploadImageCharacterToStorage(base64String, name);

    upload.then().then(res => {
      console.log('res: ', res);
    });
  }

  getAuthorization() {
    if (this.character.name != '' && this.character.initiativeModifier != undefined && this.character.armorClass != undefined && this.character.healthPoints != undefined)
      return true;
    else
      return false;
  }

  checkHealthPoints() {
    // @ts-ignore
    if (parseInt(this.character.healthPoints) < 1)
      this.character.healthPoints = 1;
  }

  checkArmorClass() {
    // @ts-ignore
    if (parseInt(this.character.armorClass) < 0)
      this.character.armorClass = 0;
  }

  checkCurrentHealth() {
    // @ts-ignore
    if (parseInt(this.character.currentHealth) > parseInt(this.character.healthPoints))
      this.character.currentHealth = this.character.healthPoints;

    // @ts-ignore
    if (parseInt(this.character.currentHealth) < 0)
      this.character.currentHealth = 0;
  }


}
