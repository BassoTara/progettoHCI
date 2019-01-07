import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostriPage } from './mostri';

@NgModule({
  declarations: [
    MostriPage,
  ],
  imports: [
    IonicPageModule.forChild(MostriPage),
  ],
})
export class ViewGroupPageModule {}