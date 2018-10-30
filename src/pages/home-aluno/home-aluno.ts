import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { DetalhesPesquisaPage } from '../detalhes-pesquisa/detalhes-pesquisa';
import { RealizarPesquisaPage } from '../realizar-pesquisa/realizar-pesquisa';
import { CadastrarProdutoPage } from '../cadastrar-produto/cadastrar-produto';
import { LoginPage } from '../login/login';
import { CadastrarSupermercadoPage } from '../cadastrar-supermercado/cadastrar-supermercado';
import { ProvedorProvider } from './../../providers/provedor/provedor';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-home-aluno',
  templateUrl: 'home-aluno.html'
})

export class HomeAlunoPage {
  public user: any;
  public usuario: any;
  email: any;
  pesquisas: Array<{pesquisa: string, aluno: string, supermercado: string, data_realizacao: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   private auth: AuthService, public provider: ProvedorProvider) {
    this.user = this.navParams.get('data');
    if(this.user){
      this.provider.setEmail(this.user);
      this.usuario = this.provider.getUser();
    }
    
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
    this.navCtrl.push(RealizarPesquisaPage, {data: this.user});
  }

  itemTapped(event, p) {
    this.navCtrl.push(DetalhesPesquisaPage, {
      push_item: p
    });
  }

  logoff(){
    this.navCtrl.push(LoginPage);
    this.navCtrl.setRoot(LoginPage);
  }
}
