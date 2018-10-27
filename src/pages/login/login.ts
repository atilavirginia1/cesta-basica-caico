import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,
             private auth: AuthService, fb: FormBuilder,
             private toast: ToastController) {
        this.loginForm = fb.group({
          cargo: ['', Validators.required],
          email: ['', Validators.compose([Validators.required, Validators.email])],
          password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
  }

  login(){
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }

    let credentials = {
      email: data.email,
      password: data.password
    };

    if(data.cargo == 'P'){
      this.auth.signInWithEmail(credentials)
        .then(
          () => this.navCtrl.setRoot(HomePage, {
            data: credentials.email
            }),
          error => this.toast.create({ message: 'Erro ao efetuar login.', duration: 3000 }).present()
        );
     // this.navCtrl.setRoot(HomePage);
      this.navCtrl.setRoot(LoginPage);
    }else if(data.cargo == 'A'){
      if(this.auth.signInAluno(credentials)){
        this.navCtrl.setRoot(HomePage, {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
