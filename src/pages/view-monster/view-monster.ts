import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-view-monster',
  templateUrl: 'view-monster.html',
})
export class ViewMonsterPage {

  @ViewChild(Content) content: Content;

  monster: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.monster = this.navParams.get('monster');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewMonsterPage');
  }

  computeModifier(stat: number) {
    var n = (stat < 10 ? ((stat - 11) / 2) >> 0 : ((stat - 10) / 2) >> 0);
    return (n < 0 ? "" : "+") + n
  }

  computeHitPointsByDice() {
    var hitDice = this.monster.hit_dice;
    var stat = this.monster.constitution;
    var level = hitDice.substr(0, hitDice.indexOf('d'));
    var hpModifier = parseInt(level) * (stat < 10 ? ((stat - 11) / 2) >> 0 : ((stat - 10) / 2) >> 0)
    var hitPointsByDice = hitDice + (hpModifier < 0 ? "" : "+") + hpModifier;
    return hitPointsByDice;
  }
}
