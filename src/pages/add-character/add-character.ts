// TODO METODO PER SELEZIONARE IMMAGINE DA GALLERIA E SALVARLA NELL'APPLICAZIONE

import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Character } from '../../models/character/character.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Group } from '../../models/group/group.model';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';
import { storage } from 'firebase/app';






/**
 * Generated class for the AddCharacterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-character',
  templateUrl: 'add-character.html',
})
export class AddCharacterPage {

  imgSrc : string = "assets/img/T8jfvA5LTnOU0xnrg3V9_faccina-sorridente-emoticon_318-40334.jpg";

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
    private camera: Camera, private file: File, private base64toGallery: Base64ToGallery,) { }

  ionViewDidLoad() {
    this.group = this.navParams.get('group');
    this.character.group = this.navParams.get('group').key;
    setTimeout(() => this.resizeName(), 0);
    setTimeout(() => this.resizeDesc(), 0);
    console.log(this.navParams.get('group'));
  }

  addCharacter(character: Character) {
    this.characters.addCharacter(character).then(ref => {
      storage().ref("pictures/myPhoto").putString(this.imgSrc, "data_url"); 
      this.navCtrl.push('ViewGroupPage', { group: this.group });
    });
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
      // this.character.base64ImageData = this.imgSrc;
    });

  }

  /* public writeFile(base64Data: any, folderName: string, fileName: any) {
    let contentType = this.getContentType(base64Data);
    let DataBlob = this.base64toBlob(base64Data, contentType);
    let filePath = this.file.externalRootDirectory + folderName;
    this.file.writeFile(filePath, fileName, DataBlob, contentType).then((success) => {
      console.log("File Writed Successfully", success);
    }).catch((err) => {
      console.log("Error Occured While Writing File", err);
    });
  }

  //here is the method is used to get content type of an bas64 data  
  public getContentType(base64Data: any) {
    let block = base64Data.split(";");
    let contentType = block[0].split(":")[1];
    return contentType;
  }

  public base64toBlob(b64Data, contentType) {
    contentType = contentType || '';
    let sliceSize = 512;
    let byteCharacters = atob(b64Data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      var byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    let blob = new Blob(byteArrays, {
      type: contentType
    });
    return blob;
  } */
}
