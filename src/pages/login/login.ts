import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, Events } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HomeAlunoPage } from '../home-aluno/home-aluno';
import { HomeProfessorPage } from '../home-professor/home-professor';
import { CadastrarPage } from '../cadastrar/cadastrar';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  loginForm: FormGroup;
  loginError: string;
  public allow: boolean;
  cargo: any;
  email: any;
  password: any;
  private menu: MenuController;
  constructor(public navCtrl: NavController, public navParams: NavParams,
             private auth: AuthService, fb: FormBuilder,
             private toast: ToastController, menu: MenuController) {
        if(this.cargo == null){
          this.cargo = "A";
        }
        this.loginForm = fb.group({
          email: [this.email, Validators.compose([Validators.required, Validators.email])],
          password: [this.password, Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.menu = menu;
        this.menu.enable(false);
  }

  login(){
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password,
      allow: null
    };
    if(this.cargo == 'P'){
      this.auth.signInWithEmail(credentials)
        .then(
          () => this.navCtrl.setRoot(HomePage, {
            data: credentials.email
            }),
          error => this.toast.create({ message: 'Erro ao efetuar login.', duration: 3000 }).present()
        );
     // this.navCtrl.setRoot(HomePage);
      this.navCtrl.setRoot(LoginPage);
    }else if(this.cargo == 'A'){
      credentials.allow = this.auth.signInAluno(credentials);
      if(credentials.allow){
        this.navCtrl.setRoot(HomeAlunoPage, {
        data: credentials.email});
      }else{
          this.navCtrl.setRoot(LoginPage);
          this.toast.create({ message: 'Erro ao efetuar login.', duration: 3000 }).present();
      }
    }

  }

  cadastrar(){
  	this.navCtrl.push(CadastrarPage);
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad LoginPage');
  }

}
