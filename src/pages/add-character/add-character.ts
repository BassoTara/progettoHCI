// TODO METODO PER SELEZIONARE IMMAGINE DA GALLERIA E SALVARLA NELL'APPLICAZIONE

import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Character } from '../../models/character/character.model';
import { CharactersListService } from '../../services/characters-list/characters-list.service';
import { Group } from '../../models/group/group.model';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';

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
  imgSrcSaved: string = "assets/imgs/characters/nome.jpg";

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
    group: 0,
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
     private characters: CharactersListService, private camera: Camera, private file: File) { }

  ionViewDidLoad() {
    this.group = this.navParams.get('group');
    this.character.group = this.navParams.get('group').key;
    setTimeout(() => this.resizeName(),0);
    setTimeout(() => this.resizeDesc(),0);
    console.log(this.navParams.get('group'));
  }

  addCharacter(character: Character){
    this.characters.addCharacter(character).then(ref => {
      this.file.writeFile("assets/imgs/characters/","nome.jpeg",this.imgSrc);
      this.navCtrl.push('ViewGroupPage',{group : this.group});
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

  pickAndCropImage(){
    const options : CameraOptions =  {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,      
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imgSrc = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }
}
