// TODO METODO PER SELEZIONARE IMMAGINE DA GALLERIA E SALVARLA NELL'APPLICAZIONE

import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
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

  imgSrc: string = "assets/imgs/no-image.png";

  files:Observable<any[]>;

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
    description: undefined,
    group: 0
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private characters: CharactersListService,
    private camera: Camera, private dataProvider: DataProvider, private alertCtrl: AlertController, private toastCtrl: ToastController) { 
      this.files = this.dataProvider.getFiles();
    }

  uploadInformation(base64String, name) {
    let upload = this.dataProvider.uploadImageCharacterToStorage(base64String, name);

    upload.then().then(res => {
      console.log('res: ', res);
      this.dataProvider.storeInfoToDatabase(res.metadata).then(() => {
        let toast = this.toastCtrl.create({
          message: 'New file added!',
          duration: 3000
        });
        toast.present();
      });
    });
  }
  
  ionViewDidLoad() {
    this.group = this.navParams.get('group');
    this.character.group = this.navParams.get('group').key;
    setTimeout(() => this.resizeName(), 0);
    setTimeout(() => this.resizeDesc(), 0);
    console.log(this.navParams.get('group'));
  }

  addCharacter(character: Character) {
    this.characters.addCharacter(character).then(ref => {
      this.uploadInformation(this.imgSrc,ref.key);
      this.navCtrl.push('ViewGroupPage', { group: this.group });
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
    });

  }

}
