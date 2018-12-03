import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosProvider } from '../../providers/produtos/produtos';

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
  selectedItem: any;
  buttonName: string;
  title: string;
  nomeProduto: string;
  medida: string;
  marca: string;
  form: FormGroup;
  isVisible: boolean = false;
  message_success: string;
  public produto: any;
  buttonClick: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ProdutosProvider,
    private toast: ToastController, private alertCtrl: AlertController) {
      this.selectedItem = navParams.get('push_item');
      console.log(this.provider.getNome());
      this.produto = this.navParams.data.produto || { };
      if (this.provider.getNome() != null) {
        this.produto = this.provider.getProduto();
      }
      this.setupPageTitle();
      this.createForm();
  }

  private setupPageTitle() {
    this.title = this.provider.getNome() ? 'Editar Produto' : 'Cadastrar Produto';
    this.buttonName = this.provider.getNome() ? 'Salvar' : 'Cadastrar';
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.produto.key],
      nomeProduto: [this.produto.nomeProduto, Validators.required],
      medida: [this.produto.medida, Validators.required],
      marca: [this.produto.marca, Validators.required],
      id: ['']
    });
  }


  onSubmit() {
    this.buttonClick = true;
    if (this.form.valid) {
      this.form.value.id = (this.form.value.nomeProduto + this.form.value.marca).toString().trim();
      this.message_success = 'Cadastro de produto realizado com sucesso';
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

  ionViewCanLeave() {
    if(!this.buttonClick){
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

}
