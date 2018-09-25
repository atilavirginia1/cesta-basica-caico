import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('push_item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesProdutoPage');
  }

}
