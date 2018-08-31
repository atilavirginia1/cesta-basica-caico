import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HomeAlunoPage } from '../home-aluno/home-aluno';
import { HomeProfessorPage } from '../home-professor/home-professor';
import { CadastrarPage } from '../cadastrar/cadastrar';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login(){
  	this.navCtrl.setRoot(HomePage);
  }

  cadastrar(){
  	this.navCtrl.push(CadastrarPage);	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
