import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarAlunoPage } from './cadastrar-aluno';

@NgModule({
  declarations: [
    CadastrarAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarAlunoPage),
  ],
})
export class CadastrarAlunoPageModule {}
