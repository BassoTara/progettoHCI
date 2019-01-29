import { Component, ViewChild } from '@angular/core';
import { NavController, IonicPage, Searchbar, Keyboard, Platform } from 'ionic-angular';
import { DataFinder } from '../../services/datafinder';
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
  searchString: string = "";

  numOrder: number; // -1 Descending, +1 Ascending, 0 not shown
  alphaOrder: number;// -1 Z->A, +1 A->Z, 0 not shown

  backAction;

  constructor(public navCtrl: NavController, private dataFinder: DataFinder, public renderer: Renderer, public platform: Platform) {
    this.alphaOrder = 1;
    this.numOrder = 0;
  }

  ionViewWillEnter() {
    this.isOn = false;
    this.searchString = "";
  }


  ionViewDidLoad() {
    this.dataFinder.getJSONDataAsync("../assets/5e-SRD-Monsters.json").then(data => {
      this.SetQueryOptionsData(data);
      console.log(typeof this.monsters)
    });
  }

  ionViewDidEnter() {
    this.backAction = this.platform.registerBackButtonAction(() => {
      if (this.searchString != "" || this.isOn) {
        this.searchString = "";
        this.isOn = false;
      }
      else {
        this.navCtrl.setRoot("IncontriPage");
        
      }
    }, 2);
  }

  ionViewDidLeave() {
    this.backAction();
  }

  pushToViewMonsterPage(monster) {
    this.navCtrl.push("ViewMonsterPage", {monster: monster});
    
  }

  /* Sets data with returned JSON array */
  SetQueryOptionsData(data: any) {
    this.monsters = data;
  }

  @ViewChild('mainSearchBar') searchBar: Searchbar;

  openSearchBar() {
    this.isOn = true;
    setTimeout(() => {
      this.searchBar.setFocus();
    }, 0);
  }

  onInput(event) {
    this.searchString = event.target.value;
  }

  onSearch(event) {
    this.renderer.invokeElementMethod(event.target, 'blur');
  }

  predicateBy(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

  predicateByDesc(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return -1;
      } else if (a[prop] < b[prop]) {
        return 1;
      }
      return 0;
    }
  }

  toFraction(num: number) {

    var Fraction = require('fractional').Fraction;

    var frac = new Fraction(num);

    return frac.toString();
  }

  nameClicked() {
    if (this.alphaOrder != 1) {
      this.monsters = this.monsters.sort(this.predicateBy('name'));
      this.alphaOrder = 1;
    }

    else {
      this.monsters = this.monsters.sort(this.predicateByDesc('name'));
      this.alphaOrder = -1;
    }

    this.numOrder = 0;

  }

  gsClicked() {
    if (this.numOrder != 1) {
      this.monsters = this.monsters.sort(this.predicateBy('challenge_rating'));
      this.numOrder = 1;
    }

    else {
      this.monsters = this.monsters.sort(this.predicateByDesc('challenge_rating'));
      this.numOrder = -1;
    }

    this.alphaOrder = 0;

  }
}
