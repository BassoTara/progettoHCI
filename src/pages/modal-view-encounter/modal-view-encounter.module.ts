import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ModalViewEncounterPage } from './modal-view-encounter';

@NgModule({
  declarations: [
    ModalViewEncounterPage,
  ],
  imports: [
    IonicPageModule.forChild(ModalViewEncounterPage),
  ],
})
export class ModalViewEncounterPageModule {}
