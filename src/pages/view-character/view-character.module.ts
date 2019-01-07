import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewCharacterPage } from './view-character';
import { ScrollingHeaderModule } from 'ionic-scrolling-header'


@NgModule({
  declarations: [
    ViewCharacterPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewCharacterPage),
    ScrollingHeaderModule
  ],
})
export class ViewCharacterPageModule {}
