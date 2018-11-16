import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import { MenuController } from 'ionic-angular';

import { DetalhesPesquisaPage } from '../detalhes-pesquisa/detalhes-pesquisa';
import { RealizarPesquisaPage } from '../realizar-pesquisa/realizar-pesquisa';
import { LoginPage } from '../login/login';
import { ProvedorProvider } from './../../providers/provedor/provedor';

import { AuthService } from '../../services/auth.service';
import firebase from 'firebase';


@Component({
  selector: 'page-home-aluno',
  templateUrl: 'home-aluno.html'
})

export class HomeAlunoPage {
  public user: any;
  public usuario: any;
  email: any;
  pesquisas: Array<any>;
  noresult: boolean = false;
  public pesquisasRef:firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams,
   private auth: AuthService, public provider: ProvedorProvider, public menuCtrl: MenuController) {
    menuCtrl.enable(false);
    this.user = this.navParams.get('data');
    if(this.user){
      this.provider.setEmail(this.user);
      this.usuario = this.provider.getUser();
    }

    this.initializePesquisas();
  }

  initializePesquisas(){
      this.pesquisasRef = firebase.database().ref('/pesquisas');
      this.pesquisasRef.orderByChild("email").equalTo(this.user).on("value", pesquisasList => {
      let pesquisas = [];
      pesquisasList.forEach( pesquisa => {
        pesquisas.push(pesquisa.val());
      return false;
      });

      this.pesquisas = pesquisas;
      this.pesquisas.reverse();
      });

      if(this.pesquisas == null){
        this.noresult = true;
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

  ionViewDidLoad() {

  }
}
