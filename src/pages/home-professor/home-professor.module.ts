import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeProfessorPage } from './home-professor';

@NgModule({
  declarations: [
    HomeProfessorPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeProfessorPage),
  ],
})
export class HomeProfessorPageModule {}
