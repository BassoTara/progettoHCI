import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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
  imgSrc: string = "assets/imgs/no-image.png";

  group: Group = {
    key: '',
    name: '',
    players: undefined,
    description: undefined,
  };

  character: Character = {
    name: '',
    armorClass: undefined,
    initiativeModifier: undefined,
    healthPoints: undefined,
    description: undefined,
    group: "0",
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService, private camera: Camera, private dataProvider: DataProvider, private alertCtrl: AlertController, private toastCtrl: ToastController) {
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

  ionViewDidLoad() {
    setTimeout(() => this.resizeName(), 0);
    setTimeout(() => this.resizeDesc(), 0);
    this.loadImageFromStorage();
    console.log("chiamato ionViewDidLoad");
  }

  editCharacter(character: Character) {
    this.characters.editCharacter(character).then(() => {
      if (this.imgHasChanged)
        this.uploadInformation(this.imgSrc, character.key);
      let toast = this.toastCtrl.create({
        message: 'Character edited successfully!',
        duration: 3000
      });
      toast.present();
      //this.navCtrl.push('ViewGroupPage', { group: this.group });
      this.navCtrl.pop();
    });
  }

  removeCharacter(character: Character) {
    this.characters.removeCharacter(character).then(res => {
      console.log('res: ', res);
      let toast = this.toastCtrl.create({
        message: 'Character removed successfully!',
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
      quality: 70,
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
      this.imgHasChanged = true;
    });

  }

  uploadInformation(base64String: string, name: string) {
    let upload = this.dataProvider.uploadImageCharacterToStorage(base64String, name);

    upload.then().then(res => {
      console.log('res: ', res);
      let toast = this.toastCtrl.create({
        message: 'New file added!',
        duration: 3000
      });
      toast.present();
    });
  }
}
