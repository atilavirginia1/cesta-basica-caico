import { Component } from '@angular/core';
import { IonicPage, NavController, ItemSliding, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProvedorProvider } from '../../providers/provedor/provedor';
import firebase from 'firebase';

/**
 * Generated class for the RealizarPesquisaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-realizar-pesquisa',
  templateUrl: 'realizar-pesquisa.html',
})
export class RealizarPesquisaPage {
  nomeSupermercado: string;
  data_realizacao: string;
  nomeProduto: string;
  marca: string;
  preco: number;
  medida: string;
  form: FormGroup;
  message_success: string;
  isVisible=false;
  public pesquisa: any;
  produtos: Array<{nome: string, marca:string, medida: string, preco: string}>;
  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/items');

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ProvedorProvider,
    private toast: ToastController) {

    this.pesquisa = this.navParams.data.pesquisa || { };
    this.createForm();

    this.produtos = [];
    for (let p = 1; p < 6; p++) {
      this.produtos.push({
      	nome: 'Produto ' + p,
        marca: 'Marca ' + p,
        medida: p + ' kg',
        preco: 'R$ ' + p + ',00',
      });
    }
  }

  createForm() {
    this.form = this.formBuilder.group({
      key: [this.pesquisa.key],
      nomeSupermercado: [this.pesquisa.nomeSupermercado, Validators.required],
      data_realizacao: [this.pesquisa.data_realizacao, Validators.required],
      nomeProduto: [this.pesquisa.nomeProduto, Validators.required],
      marca: [this.pesquisa.marca, Validators.required],
      medida: [this.pesquisa.medida, Validators.required],
      preco: [this.pesquisa.preco, Validators.required],
      produtos: [this.pesquisa.produtos],
      ativo: false
    });
  }

  delete(slidingItem: ItemSliding) {
    slidingItem.close();
  }

  getMarca(){
  	this.marca = this.form.get('marca').value;
  	if(this.marca == 'O')
  	{
  		this.isVisible = true;
    } else {
      this.isVisible = false;
    }
  }

  setVisible(){
  	if(this.marca != null){
  		this.isVisible = true;
  	} else {
  		this.isVisible = false;
  	}

  }

  onSubmit() {
    console.log(this.form);
    if (this.form.valid) {
      this.message_success = 'Pesquisa realizada com sucesso';
      this.provider.save(this.form.value)
        .then(() => {
          	this.toast.create({ message: this.message_success, duration: 3000 }).present();
          	this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao cadastrar pesquisa.', duration: 3000 }).present();
          console.error(e);
        });
  	 }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RealizarPesquisaPage');
  }


}
