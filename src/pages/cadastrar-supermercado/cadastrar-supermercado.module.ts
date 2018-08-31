import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastrarSupermercadoPage } from './cadastrar-supermercado';

@NgModule({
  declarations: [
    CadastrarSupermercadoPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastrarSupermercadoPage),
  ],
})
export class CadastrarSupermercadoPageModule {}
