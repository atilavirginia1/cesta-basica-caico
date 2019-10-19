import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, ToastController, Events, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HomeAlunoPage } from '../home-aluno/home-aluno';
import { HomeProfessorPage } from '../home-professor/home-professor';
import { CadastrarPage } from '../cadastrar/cadastrar';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AjudaPage } from '../ajuda/ajuda';
import { SobrePage } from '../sobre/sobre';
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
             private auth: AuthService, fb: FormBuilder, private loadingCtrl: LoadingController,
             private toast: ToastController, menu: MenuController) {
        if(this.cargo == null){
          this.cargo = "A";
        }
        this.loginForm = fb.group({
          email: [this.email, Validators.compose([Validators.required, Validators.email])],
          password: [this.password, Validators.compose([Validators.required, Validators.minLength(6)])]
        });
        this.menu = menu;
        this.menu.enable(false, 'aluno');
        this.menu.enable(false, 'professor');
  }

  login() {
    let data = this.loginForm.value;

    if (!data.email) {
      return;
    }
    // declara as credenciais
    let credentials = {
      email: data.email,
      cargo: this.cargo,
      password: data.password,
      allow: null
    };
    // ver se o usuário está ativo no sistema
    credentials.allow = this.auth.signInUser(credentials); 

    this.entrar(credentials);
    
    // console.log(credentials.allow);
    // console.log(credentials.cargo);
    // if (credentials.allow) { // se o usuario estiver ativo, vai ser verificado se ele é aluno ou prof
    //   if (credentials.cargo == 'P') { // se for prof 
    //     this.navCtrl.setRoot(HomePage, { 
    //     data: credentials.email}); // abre a home de professor
    //   } else if (credentials.cargo == 'A') { // se for aluno
    //     this.navCtrl.setRoot(HomeAlunoPage, {
    //     data: credentials.email}); // abre a home de aluno
    //   }
    // } else {
    //     this.navCtrl.setRoot(LoginPage);
    //     this.toast.create({ message: 'Erro ao efetuar login. Email e/ou senha inválidos.', 
    //       duration: 3000 }).present();
    // }
  }

  async entrar(credentials) {
    const loading = await this.loadingCtrl.create({      
      content: 'Entrando...'
    }); 
    await loading.present();

    console.log(credentials.allow);
    console.log(credentials.cargo);
    if (credentials.allow) { // se o usuario estiver ativo, vai ser verificado se ele é aluno ou prof
      if (credentials.cargo == 'P') { // se for prof 
        this.navCtrl.setRoot(HomePage, { 
        data: credentials.email}); // abre a home de professor
      } else if (credentials.cargo == 'A') { // se for aluno
        this.navCtrl.setRoot(HomeAlunoPage, {
        data: credentials.email}); // abre a home de aluno
      }
    } else {
        this.navCtrl.setRoot(LoginPage);
        this.toast.create({ message: 'Erro ao efetuar login. Email e/ou senha inválidos.', 
          duration: 3000 }).present();
    }
    loading.dismiss();
  }
      // esse código é para se quiser que o professor tenha outro modo de validação
    // if(this.cargo == 'P'){
    //   this.auth.signInWithEmail(credentials)
    //     .then(
    //       () => this.navCtrl.setRoot(HomePage, {
    //         data: credentials.email
    //         }),
    //       error => this.toast.create({ message: 'Erro ao efetuar login. Email e/ou senha inválidos.', duration: 3000 }).present()
    //     );
    //  // this.navCtrl.setRoot(HomePage);
    //   this.navCtrl.setRoot(LoginPage);
    // }else if(this.cargo == 'A'){
    //   credentials.allow = this.auth.signInAluno(credentials);
    //   console.log(credentials.allow);
    //   if(credentials.allow){
    //     this.navCtrl.setRoot(HomeAlunoPage, {
    //     data: credentials.email});
    //   }else{
    //       this.navCtrl.setRoot(LoginPage);
    //       this.toast.create({ message: 'Erro ao efetuar login. Email e/ou senha inválidos.', duration: 3000 }).present();
    //   }
    // }

  cadastrar() {
  	this.navCtrl.push(CadastrarPage);
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad LoginPage');
  }


  information(){
    this.navCtrl.push(SobrePage);
  }

}
