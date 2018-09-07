import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { ProvedorProvider } from '../../providers/provedor/provedor';

/**
 * Generated class for the CadastrarProdutoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastrar-produto',
  templateUrl: 'cadastrar-produto.html',
})
export class CadastrarProdutoPage {
  nomeProduto: string;
  medida: string;
  marcas: string;
  form: FormGroup;
  isVisible: boolean = false;
  message_success: string;
  public produto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ProvedorProvider,
    private toast: ToastController) {
      this.produto = this.navParams.data.produto || { };
      this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.produto.key],
      nomeProduto: [this.produto.nomeProduto, Validators.required],
      medida: [this.produto.medida, Validators.required],
      marcas: [this.produto.marcas, Validators.required],
      ativo: false
    });
  }


  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      this.message_success = 'Cadastro de produto realizado com sucesso'
      this.provider.save(this.form.value)
        .then(() => {
          	this.toast.create({ message: this.message_success, duration: 3000 }).present();
          	this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao cadastrar produto.', duration: 3000 }).present();
          console.error(e)
        })
  	 }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastrarProdutoPage');
  }

}