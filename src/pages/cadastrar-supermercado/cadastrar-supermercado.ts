import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupermercadosProvider } from '../../providers/supermercados/supermercados';

/**
 * Generated class for the CadastrarSupermercadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar-supermercado',
  templateUrl: 'cadastrar-supermercado.html',
})
export class CadastrarSupermercadoPage {
  cnpj:string;
  nomeSupermercado:string;
  endereco:string;
  bairro:string;
  form:FormGroup;
  public supermercado:any;
  message_success: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: SupermercadosProvider,
    private toast: ToastController) {
      this.supermercado=this.navParams.data.supermercado || {};
      this.createForm()
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.supermercado.key],
      cnpj: [this.supermercado.cnpj, Validators.required],
      nomeSupermercado: [this.supermercado.nomeSupermercado, Validators.required],
      endereco: [this.supermercado.endereco, Validators.required],
      bairro: [this.supermercado.bairro, Validators.required],
    });
  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      	this.message_success = 'Cadastro realizado com sucesso.'
      this.provider.save(this.form.value)
        .then(() => {
          	this.toast.create({ message: this.message_success, duration: 3000 }).present();
          	this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao cadastrar supermercado.', duration: 3000 }).present();
          console.error(e)
        })
  	 }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarSupermercadoPage');
  }

}
