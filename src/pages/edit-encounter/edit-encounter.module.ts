import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEncounterPage } from './edit-encounter';

@NgModule({
  declarations: [
    EditEncounterPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEncounterPage),
  ],
})
export class EditEncounterPageModule {}
