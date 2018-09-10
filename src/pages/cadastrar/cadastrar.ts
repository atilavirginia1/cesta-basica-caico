import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvedorProvider } from './../../providers/provedor/provedor';
/**
 * Generated class for the CadastrarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html'
})
export class CadastrarPage {
	cargo: string;
	form: FormGroup;
	mat_siape: any;
	isVisible: boolean = false;
	showEmail: boolean = false;
	message_success: string;
	public usuario: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 	private formBuilder: FormBuilder, private provider: ProvedorProvider,
    	private toast: ToastController) {
  	this.usuario = this.navParams.data.usuario || { };
  	this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.usuario.key],
      nome: [this.usuario.nome, Validators.required],
      cargo: [this.usuario.cargo, Validators.required],
      mat_siape: [this.usuario.mat_siape, Validators.required],
      email: [this.usuario.email, Validators.compose([
        Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      usuario: [this.usuario.usuario, Validators.required],
      senha: [this.usuario.senha, Validators.required],
      ativo: false
    });
  }
 
   onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      if(this.cargo == 'A'){
      	this.message_success = 'Cadastro realizado com sucesso. Aguardar aprovação do professor.'
      }else{
      	this.message_success = 'Cadastro realizado com sucesso. Confirmar email de verificação.'
      }
      this.provider.save(this.form.value)
        .then(() => {
          	this.toast.create({ message: this.message_success, duration: 3000 }).present();
          	this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao cadastrar usuário.', duration: 3000 }).present();
          console.error(e)
        })
  	 }
  }

  getCargo(){
  	this.cargo = this.form.get('cargo').value;
  	if(this.cargo == 'A')
  	{
  		this.isVisible = true;
  		this.showEmail = false;
  		this.mat_siape = "Matrícula"
    }else if(this.cargo == 'P'){
    	this.isVisible = true;
    	this.showEmail = true;
    	this.mat_siape = "SIAPE"
    }
  }

  setVisible(){
  	if(this.cargo != null){
  		this.isVisible = true;
  	}else{
  		this.isVisible = false;
  	}

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarPage');
  }

}
