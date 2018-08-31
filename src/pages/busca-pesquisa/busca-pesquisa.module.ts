import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscaPesquisaPage } from './busca-pesquisa';

@NgModule({
  declarations: [
    BuscaPesquisaPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscaPesquisaPage),
  ],
})
export class BuscaPesquisaPageModule {}
