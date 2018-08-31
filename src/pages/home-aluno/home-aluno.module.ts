import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeAlunoPage } from './home-aluno';

@NgModule({
  declarations: [
    HomeAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(HomeAlunoPage),
  ],
})
export class HomeAlunoPageModule {}
