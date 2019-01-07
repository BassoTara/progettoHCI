import { NgModule } from '@angular/core';
import { IonicPageModule, Content } from 'ionic-angular';
import { ViewMonsterPage } from './view-monster';
import { ScrollingHeaderModule } from 'ionic-scrolling-header'

@NgModule({
  declarations: [
    ViewMonsterPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewMonsterPage),
    ScrollingHeaderModule,
  ],
})
export class ViewMonsterPageModule { }
