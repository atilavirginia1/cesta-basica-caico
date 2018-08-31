import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesPesquisaPage } from './detalhes-pesquisa';

@NgModule({
  declarations: [
    DetalhesPesquisaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesPesquisaPage),
  ],
})
export class DetalhesPesquisaPageModule {}
