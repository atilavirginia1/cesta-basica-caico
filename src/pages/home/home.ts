import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { DetalhesPesquisaPage } from '../detalhes-pesquisa/detalhes-pesquisa';
import { RealizarPesquisaPage } from '../realizar-pesquisa/realizar-pesquisa';
import { CadastrarProdutoPage } from '../cadastrar-produto/cadastrar-produto';
import { CadastrarSupermercadoPage } from '../cadastrar-supermercado/cadastrar-supermercado';
import { ProvedorProvider } from './../../providers/provedor/provedor';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public user: any;
  public usuario: any;
  pesquisas: Array<{pesquisa: string, aluno: string, supermercado: string, data_realizacao: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: ProvedorProvider) {
    this.user = this.navParams.get('data');
    this.provider.setEmail(this.user);
    this.usuario = this.provider.getUser();
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

  realizarPesquisa(){
    this.navCtrl.push(RealizarPesquisaPage);
  }

  adicionarProduto(){
    this.navCtrl.push(CadastrarProdutoPage);
  }

  adicionarSupermercado(){
    this.navCtrl.push(CadastrarSupermercadoPage);
  }

  itemTapped(event, p) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetalhesPesquisaPage, {
      push_item: p
    });
  }

}
