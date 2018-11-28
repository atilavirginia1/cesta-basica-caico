import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { SupermercadosProvider } from '../../providers/supermercados/supermercados';
import { EditarSupermercadoPage } from '../editar-supermercado/editar-supermercado';
import { AlertController } from 'ionic-angular';
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
    public providerS: SupermercadosProvider, private toast: ToastController, private alertCtrl: AlertController) {
    this.selectedItem = navParams.get('push_item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesSupermercadoPage');
  }

  removeSupermercado(event, supermercados){

    let alert = this.alertCtrl.create({
        title: 'Remover Produto',
        message: 'Tem certeza que deseja remover o supermercado?',
        buttons: [
         {
            text: 'Sim',
            handler: () => {
              this.providerS.remove(supermercados.cnpj)
              this.toast.create({ message: 'Supermercado removido com sucesso.', duration: 3000 }).present();
              this.navCtrl.pop();
            }
          },
          {
            text: 'Não',
            role: 'cancel',
            handler: () => {

            }
          }
        ]
      });
      alert.present();

  }

  editarSupermercado(event, supermercado){
    this.navCtrl.push(EditarSupermercadoPage, {
      push_item: supermercado
    });
  }
}
