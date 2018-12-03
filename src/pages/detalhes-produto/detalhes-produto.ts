import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { EditarProdutoPage } from '../editar-produto/editar-produto';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the DetalhesProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-produto',
  templateUrl: 'detalhes-produto.html',
})
export class DetalhesProdutoPage {
  selectedItem: any;
  produtos: AngularFireList<{}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,
  	private provider: ProdutosProvider, public db: AngularFireDatabase, private alertCtrl: AlertController) {
    this.selectedItem = navParams.get('push_item');
    console.log(this.selectedItem)
  }

  ionViewDidLoad() {
  }

  editProduto(event, produto){
    this.navCtrl.push(EditarProdutoPage, {
      push_item: produto
    });
  }

  removeProduto(event, produtos) {
    let alert = this.alertCtrl.create({
        title: 'Remover Produto',
        message: 'Tem certeza que deseja remover o produto?',
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this.provider.remove(produtos.id);
              this.toast.create({ message: 'Produto removido sucesso.', duration: 3000 }).present();
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
}
