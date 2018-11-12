import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SupermercadosProvider } from '../../providers/supermercados/supermercados';
import { AlertController } from 'ionic-angular';
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
  cnpj:string = "";
  nomeSupermercado:string;
  endereco:string;
  bairro:string;
  form:FormGroup;
  public supermercado:any;
  message_success: string;
  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";
  pureResult: any;
  maskedId: any;
  val: any;
  v: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: SupermercadosProvider,
    private toast: ToastController, private alertCtrl: AlertController) {
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

  cnpj2(v) {
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca um hífen depois do bloco de quatro dígitos
    return v;
}

  format(valString) {
    if (!valString) {
        return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    this.pureResult = parts;
    this.maskedId = this.cnpj2(parts[0]);
    return this.maskedId;
  }

unFormat(val) {
    if (!val) {
        return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
        return val.replace(/,/g, '');
    } else {
        return val.replace(/\./g, '');
    }
}

ionViewCanLeave() {

  return new Promise((resolve, reject) => {
    this.alertCtrl.create({
        enableBackdropDismiss: false,
        title: 'Voltar',
        message: 'Tem certeza que deseja voltar? Quaisquer alterações feitas serão perdidas.',
        buttons: [{
            text: "Sim",
            handler: resolve
        },{
            text: "Não",
            handler: reject
        }]
    }).present();
  });
}

}
