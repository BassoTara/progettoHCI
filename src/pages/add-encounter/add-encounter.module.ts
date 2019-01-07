import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddEncounterPage } from './add-encounter';

@NgModule({
  declarations: [
    AddEncounterPage,
  ],
  imports: [
    IonicPageModule.forChild(AddEncounterPage),
  ],
})
export class AddEncounterPageModule {}
