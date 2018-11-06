import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { DetalhesPesquisaPage } from '../detalhes-pesquisa/detalhes-pesquisa';
import { RealizarPesquisaPage } from '../realizar-pesquisa/realizar-pesquisa';
import { CadastrarProdutoPage } from '../cadastrar-produto/cadastrar-produto';
import { CadastrarSupermercadoPage } from '../cadastrar-supermercado/cadastrar-supermercado';
import { ProvedorProvider } from './../../providers/provedor/provedor';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  public user: any;
  public usuario: any;
  email: any;
  pesquisas: Array<any>;
  public pesquisasRef:firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
           private auth: AuthService, public provider: ProvedorProvider) {
    this.user = this.navParams.get('data');
    if(this.user){
      this.provider.setEmail(this.user);
      this.usuario = this.provider.getUser();
      console.log(this.usuario)
    }
    this.initializePesquisas();
  }

  initializePesquisas(){
      this.pesquisasRef = firebase.database().ref('/pesquisas');
      this.pesquisasRef.orderByChild("data").on("value", pesquisasList => {
      let pesquisas = [];
      pesquisasList.forEach( pesquisa => {
        pesquisas.push(pesquisa.val());
      return false;
      });

      this.pesquisas = pesquisas;
      this.pesquisas.reverse();
      });

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

  logoff(){
    this.auth.logout();
    this.navCtrl.push(LoginPage);
    this.navCtrl.setRoot(LoginPage);
  }

}
