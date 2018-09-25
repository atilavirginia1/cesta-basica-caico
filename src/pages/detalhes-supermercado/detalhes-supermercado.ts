import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectedItem = navParams.get('push_item');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesSupermercadoPage');
  }

}
