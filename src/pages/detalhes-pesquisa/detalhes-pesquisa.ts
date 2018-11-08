import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProvedorProvider } from '../../providers/provedor/provedor';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the DetalhesPesquisaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-pesquisa',
  templateUrl: 'detalhes-pesquisa.html',
})
export class DetalhesPesquisaPage {
  selectedItem: any;
  pesquisa: any;
  produto: Array<{id: string, marca:string, medida: string, nome: string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private provider: ProvedorProvider,
    public db: AngularFireDatabase) {
    this.selectedItem = navParams.get('push_item');
    this.pesquisa = db.list('/pesquisas');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesPesquisaPage');
  }

}
