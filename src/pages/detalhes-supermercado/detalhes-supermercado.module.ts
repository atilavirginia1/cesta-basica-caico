import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalhesSupermercadoPage } from './detalhes-supermercado';

@NgModule({
  declarations: [
    DetalhesSupermercadoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalhesSupermercadoPage),
  ],
})
export class DetalhesSupermercadoPageModule {}
