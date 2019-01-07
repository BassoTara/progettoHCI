import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditCharacterPage } from './edit-character';

@NgModule({
  declarations: [
    EditCharacterPage,
  ],
  imports: [
    IonicPageModule.forChild(EditCharacterPage),
  ],
})
export class EditCharacterPageModule {}
