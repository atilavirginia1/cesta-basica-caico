import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SupermercadosProvider } from '../../providers/supermercados/supermercados';
import { EditarSupermercadoPage } from '../editar-supermercado/editar-supermercado';

/**
 * Generated class for the DetalhesSupermercadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-supermercado',
  templateUrl: 'detalhes-supermercado.html',
})
export class DetalhesSupermercadoPage {
  selectedItem: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public providerS: SupermercadosProvider, private toast: ToastController) {
    this.selectedItem = navParams.get('push_item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesSupermercadoPage');
  }

  removeSupermercado(event, supermercados){
    if (supermercados) {
          this.providerS.remove(supermercados.cnpj)
          this.toast.create({ message: 'Supermercado removido com sucesso.', duration: 3000 }).present();
    }
  }

  editarSupermercado(event, supermercado){
    this.navCtrl.push(EditarSupermercadoPage, {
      push_item: supermercado
    });
  }
}
