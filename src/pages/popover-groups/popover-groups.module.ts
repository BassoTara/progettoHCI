import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverGroupsPage } from './popover-groups';

@NgModule({
  declarations: [
    PopoverGroupsPage,
  ],
  imports: [
    IonicPageModule.forChild(PopoverGroupsPage),
  ],
})
export class PopoverGroupsPageModule {}
