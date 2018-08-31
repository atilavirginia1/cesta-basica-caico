import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarProfessorPage } from './cadastrar-professor';

@NgModule({
  declarations: [
    CadastrarProfessorPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarProfessorPage),
  ],
})
export class CadastrarProfessorPageModule {}
