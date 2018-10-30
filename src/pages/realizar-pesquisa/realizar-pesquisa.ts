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
  isVisibleOutro=false;
  isEnabled = false;
  public pesquisa: any;
 // produtos: Array<{nome: string, marca:string, medida: string, preco: string}>;
//  produtos: Array<{id: string, marca:string, medida: string, nome: string}>;
  public items: Array<any> = [];
  public itemRef: firebase.database.Reference = firebase.database().ref('/items');

  produtos: Array<any> = [];
  produtosList: Array<any> = [];
  marcasList: Array<any> = [];
  medidasList: Array<any> = [];
  produtoSelecionado: any;
  public produtosRef: firebase.database.Reference = firebase.database().ref('/produtos');


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ProvedorProvider,
    private toast: ToastController) {

    this.pesquisa = this.navParams.data.pesquisa || { };

    this.createForm();
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
      produtos: [this.pesquisa.produtos]
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
    if(this.form.value.nomeProduto == "Outra"){
      this.isVisibleOutro = true;
      this.isVisible = false;

    }else if(this.form.value.nomeProduto !=null){
      this.produtosRef.orderByChild("nomeProduto").equalTo(this.form.value.nomeProduto)
      .on('value', marcasList => {
        let marcas = [];
        marcasList.forEach( produto => {
          marcas.push(produto.val());
        return false;
      });

    let unique_array = [];
    let unique_array_med = [];
      for(let i = 0;i < marcas.length; i++){
          if(unique_array.indexOf(marcas[i].marca) == -1){
              unique_array.push(marcas[i].marca);
          }
      }

      for(let i = 0;i < marcas.length; i++){
          if(unique_array_med.indexOf(marcas[i].medida) == -1){
              unique_array_med.push(marcas[i].medida);
          }
      }

      unique_array.push("Outra");
      this.marcasList = unique_array;
      this.medidasList = unique_array_med;
     });
     this.isVisible = true;
     this.isVisibleOutro = false;
    }else{
      this.isVisible = false;
      this.isVisibleOutro = false;
    }    
    console.log(this.marcasList)

  //	if(this.marca != null){
  //		this.isVisible = true;
  //	} else {
 // 		this.isVisible = false;
  //	}

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

  addItem(){
    this.produtos.push(this.form.value);
    this.form = null;
    this.createForm();
    this.isEnabled = true;
  }

  ionViewDidLoad() {
    this.produtosRef.on('value', produtosList => {
        let produtos = [];
        produtosList.forEach( produto => {
          produtos.push(produto.val());
        return false;
      });
 //     this.produtosList = produtos;
//      console.log(this.produtosList)
     let unique_array = [];
      for(let i = 0;i < produtos.length; i++){
          if(unique_array.indexOf(produtos[i].nomeProduto) == -1){
              unique_array.push(produtos[i].nomeProduto);
          }
      }
      this.produtosList = unique_array;

    });
  }


}
