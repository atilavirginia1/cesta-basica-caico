import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { EditarProdutoPage } from '../editar-produto/editar-produto';

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
  	private provider: ProdutosProvider, public db: AngularFireDatabase) {
    this.selectedItem = navParams.get('push_item');
    // this.produtos = this.selectedItem;
    // this.produtos = db.list('/produtos');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesProdutoPage');
  }

  editProduto(event, produto){
    this.navCtrl.push(EditarProdutoPage, {
      push_item: produto
    });
  }

  removeProduto(event, produtos) {
    console.log(produtos.key)
    if (produtos) {
	    this.provider.remove(produtos.key);
	    this.toast.create({ message: 'Produto removido sucesso.', duration: 3000 }).present();
	  }
  }
}
