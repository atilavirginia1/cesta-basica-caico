import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetalhesPesquisaPage } from '../detalhes-pesquisa/detalhes-pesquisa';

/**
 * Generated class for the RelatoriosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-relatorios',
  templateUrl: 'relatorios.html',
})
export class RelatoriosPage {
  pesquisas: Array<{pesquisa: string, aluno: string, supermercado: string, data_realizacao: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.pesquisas = [];
    for (let p = 1; p < 6; p++) {
      this.pesquisas.push({
      	data_realizacao: 'dd/mm/aa',
        pesquisa: 'Pesquisa ' + p,
        aluno: 'Aluno ' + p,
        supermercado: 'Supermercado ' + p,
      });
    }
  }

  itemTapped(event, p) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetalhesPesquisaPage, {
      push_item: p
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RelatoriosPage');
  }

}
