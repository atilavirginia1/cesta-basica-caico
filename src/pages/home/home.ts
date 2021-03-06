import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
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
  noresult: boolean;
  public pesquisasRef:firebase.database.Reference;
  private menu: MenuController;

  constructor(public navCtrl: NavController, public navParams: NavParams,
           private auth: AuthService, public provider: ProvedorProvider, menu: MenuController) {
    this.user = this.navParams.get('data');
    if(this.user){
      this.provider.setEmail(this.user);
      this.usuario = this.provider.getUser();
      console.log(this.usuario)
    }
    this.initializePesquisas();
    this.menu = menu;
    this.menu.enable(true, 'professor');
    this.menu.enable(false, 'aluno');
  }

  initializePesquisas(){
      this.pesquisas = [];
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

      console.log(this.pesquisas)

      if(this.pesquisas == null ){
        this.noresult = true;
      }else{
        this.noresult = false;
      }
      console.log("pesquisa inicializada")
  }

  ionViewDidLoad() {
    this.initializePesquisas();
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
