import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GruppiDeiGiocatoriPage } from './gruppi-dei-giocatori';


@NgModule({
  declarations: [
    GruppiDeiGiocatoriPage,
  ],
  imports: [
    IonicPageModule.forChild(GruppiDeiGiocatoriPage),
  ],
})
export class CharactersPageModule {}