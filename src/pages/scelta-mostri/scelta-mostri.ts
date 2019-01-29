import { Component, ViewChild, Renderer } from '@angular/core';
import { IonicPage, NavController, NavParams, Searchbar, Platform, Navbar, AlertController } from 'ionic-angular';
import { DataFinder } from '../../services/datafinder';
import { WheelSelector } from '@ionic-native/wheel-selector';

declare var require: any

@IonicPage()
@Component({
  selector: 'page-scelta-mostri',
  templateUrl: 'scelta-mostri.html',
})
export class SceltaMostriPage {

  monsters = [];
  counters: number[];
  isOn: boolean = false;
  searchString: string = "";
  callback;
  backAction;

  chosenMonsters = [];

  numOrder: number; // -1 Descending, +1 Ascending, 0 not shown
  alphaOrder: number;// -1 Z->A, +1 A->Z, 0 not shown



  constructor(public navCtrl: NavController, public navParams: NavParams, private dataFinder: DataFinder, public renderer: Renderer, public platform: Platform, public wheelSelector: WheelSelector, public alertCtrl: AlertController) {
    this.alphaOrder = 1;
    this.numOrder = 0;
    this.callback = this.navParams.get("callback");
  }

  ionViewWillEnter() {
    this.isOn = false;
    this.searchString = "";
  }

  @ViewChild(Navbar) navBar: Navbar;

  ionViewDidLoad() {
    this.dataFinder.getJSONDataAsync("../assets/5e-SRD-Monsters.json").then(data => {
      this.SetQueryOptionsData(data);
      console.log(typeof this.monsters)
    });

    this.navBar.backButtonClick = (e: UIEvent) => {
      this.onBackButton();
    }
  }

  ionViewDidEnter() {
    this.backAction = this.platform.registerBackButtonAction(() => {
      if (this.searchString != "") {
        this.searchString = "";
        this.isOn = false;
      }
      else {
        this.onBackButton();
      }
    }, 2);
  }

  ionViewDidLeave() {
    this.backAction();
  }

  onBackButton() {
    if (this.isEmpty()) {
      this.navCtrl.pop();
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Confermare la scelta prima di uscire?',
        buttons: [
          {
            text: 'Sì',
            handler: () => {
              this.confirmMonsters();
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
  }

  isEmpty() {
    for (let value of this.counters)
      if (value != 0)
        return false;
    return true;
  }

  /* Sets data with returned JSON array */
  SetQueryOptionsData(data: any) {
    this.monsters = data; //325
    this.counters = new Array(this.monsters.length + 1).fill(0);//326
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

  decrement(index: number) {
    if (this.counters[index] > 0)
      this.counters[index] = this.counters[index] - 1;
  }

  increment(index: number) {
    this.counters[index] = this.counters[index] + 1;
  }

  selectQuantity(monster) {
    var jsonData = {
      numbers: [
      ],
    }

    for (let index = 0; index < 1000; index++) {
      jsonData.numbers.push({ description: index });
    }

    this.wheelSelector.show({
      title: "Quanti " + monster.name + "?",
      items: [
        jsonData.numbers,
      ],
      positiveButtonText: "OK",
      negativeButtonText: "Annulla",
    }).then(
      result => {

        this.counters[monster.index] = parseInt(result[0].description);
      }
    );
  }

  confirmMonsters() {
    for (let monster of this.monsters) {
      while (this.counters[monster.index] > 0) {
        monster["currentHealth"] = monster.healthPoints;
        this.chosenMonsters.push(monster);
        this.counters[monster.index] = this.counters[monster.index] - 1;
      }
    }

    this.callback(this.chosenMonsters).then(() => {
      this.navCtrl.pop();
    });
  }


}
