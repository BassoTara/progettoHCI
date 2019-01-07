import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewCharacterPage } from './view-character';

@NgModule({
  declarations: [
    ViewCharacterPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewCharacterPage),
  ],
})
export class ViewCharacterPageModule {}
