import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProvedorProvider } from './../../providers/provedor/provedor';
/**
 * Generated class for the DetalhesAlunoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-aluno',
  templateUrl: 'detalhes-aluno.html',
})
export class DetalhesAlunoPage {
  selectedItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,
  	private provider: ProvedorProvider) {
  	this.selectedItem = navParams.get('push_item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesAlunoPage');
  }

  removerAluno(){
  	console.log(this.selectedItem)
  	if (this.selectedItem.email) {
      this.provider.remove(this.selectedItem.email)
        .then(() => {
          this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
            	  this.navCtrl.pop();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o contato.', duration: 3000 }).present();
        });
    }
  }

}
