import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProvedorProvider } from './../../providers/provedor/provedor';
import { AngularFireDatabase } from 'angularfire2/database';

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
  usuarios: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,
  	private provider: ProvedorProvider, public db: AngularFireDatabase) {
  	this.selectedItem = navParams.get('push_item');
  	this.usuarios = db.list('/usuarios');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesAlunoPage');
  }

  removerAluno(selectedItem){
	if (selectedItem.email) {
	      this.provider.remove(selectedItem)
	      this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
	      this.navCtrl.pop();
	    }
  }

}
