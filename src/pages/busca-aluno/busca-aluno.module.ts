import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscaAlunoPage } from './busca-aluno';

@NgModule({
  declarations: [
    BuscaAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscaAlunoPage),
  ],
})
export class BuscaAlunoPageModule {}
