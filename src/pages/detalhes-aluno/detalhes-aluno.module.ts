import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesAlunoPage } from './detalhes-aluno';

@NgModule({
  declarations: [
    DetalhesAlunoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesAlunoPage),
  ],
})
export class DetalhesAlunoPageModule {}
