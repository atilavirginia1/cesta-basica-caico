import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitacoesPage } from './solicitacoes';

@NgModule({
  declarations: [
    SolicitacoesPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitacoesPage),
  ],
})
export class SolicitacoesPageModule {}
