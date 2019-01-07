import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Searchbar, Keyboard, Platform } from 'ionic-angular';
import { DataFinder } from '../../services/datafinder';
import { PopoverController } from 'ionic-angular';
import { PopOverPage } from '../pop-over/pop-over';
import { Renderer } from '@angular/core';


declare var require: any


@IonicPage()
@Component({
  selector: 'page-mostri',
  templateUrl: 'mostri.html'
})

export class MostriPage {
  monsters = [];
  isOn: boolean = false;
  searchString : string ="";

  isAtoZ: boolean;
  isZtoA: boolean;
  is1to9: boolean;
  is9to1: boolean;

  

  constructor(public navCtrl: NavController, private dataFinder: DataFinder, public popoverCtrl: PopoverController, public renderer: Renderer, public platform: Platform) {
    this.isAtoZ=true;

    platform.registerBackButtonAction(() => {
      if (this.searchString != "") {
        this.searchString = "";
        this.isOn = false;
      }
      else {
        if (navCtrl.canGoBack()) { // CHECK IF THE USER IS IN THE ROOT PAGE.
          navCtrl.pop(); // IF IT'S NOT THE ROOT, POP A PAGE.
        } else {
          platform.exitApp(); // IF IT'S THE ROOT, EXIT THE APP.
        }
      }
    });

  }

  ionViewWillEnter(){
    this.isOn=false;
    this.searchString="";
  }


  ionViewDidLoad() {
    this.dataFinder.getJSONDataAsync("../assets/5e-SRD-Monsters.json").then(data => {
      this.SetQueryOptionsData(data);
      console.log(typeof this.monsters)
    });

  }
 
  /* Sets data with returned JSON array */
  SetQueryOptionsData(data : any) {
    this.monsters = data;
  }
  
  @ViewChild('mainSearchBar') searchBar: Searchbar ;

  openSearchBar(){
    this.isOn=true;
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 0);
  }
  
  onInput(event){
    this.searchString = event.target.value;
  }

  onSearch(event) {
    this.renderer.invokeElementMethod(event.target, 'blur');
  }

  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create("PopOverPage");
    popover.present({
      ev: myEvent
    });
  }

  predicateBy(prop){
    return function(a,b){
       if( a[prop] > b[prop]){
           return 1;
       }else if( a[prop] < b[prop] ){
           return -1;
       }
       return 0;
    }
  }

  predicateByDesc(prop){
    return function(a,b){
       if( a[prop] > b[prop]){
           return -1;
       }else if( a[prop] < b[prop] ){
           return 1;
       }
       return 0;
    }
  }

  toFraction(num : number){

    var Fraction = require('fractional').Fraction;
  
    var frac = new Fraction(num);

    return frac.toString();
  }
 
 
}
