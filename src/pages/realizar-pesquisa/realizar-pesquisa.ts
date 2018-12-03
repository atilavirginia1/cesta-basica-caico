import { Component } from '@angular/core';
import { IonicPage, NavController, ItemSliding, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProvedorProvider } from '../../providers/provedor/provedor';
import { HomePage } from '../home/home';
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
  data_realizacao: Date;
  nomeProduto: string;
  marca: string;
  preco: number;
  medida: string;
  email: string;
  form: FormGroup;
  form2: FormGroup;
  message_success: string;
  isVisible=false;
  isVisibleOutro=false;
  isEnabled = false;
  public pesquisa: any;
 // produtos: Array<{nome: string, marca:string, medida: string, preco: string}>;
//  produtos: Array<{id: string, marca:string, medida: string, nome: string}>;
  public supermercados: Array<any> = [];
  public supermercadosRef: firebase.database.Reference = firebase.database().ref('/supermercados');

  produtos: Array<any> = [];
  supermercadosList: Array<any> = [];
  produtosList: Array<any> = [];
  marcasList: Array<any> = [];
  medidasList: Array<any> = [];
  produtoSelecionado: any;
  buttonClick: boolean = false;
  public produtosRef: firebase.database.Reference = firebase.database().ref('/produtos');


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: ProvedorProvider,
    private toast: ToastController, private alertCtrl: AlertController) {

    this.pesquisa = this.navParams.data.pesquisa || { };
    this.email = this.provider.getEmail();
    console.log(this.email)
    this.createForm();
    this.createForm2();
  }


  createForm() {
    this.form = this.formBuilder.group({
      key: [this.pesquisa.key],
      email: [this.email],
      nomeSupermercado: [this.nomeSupermercado, Validators.required],
      data_realizacao: [this.data_realizacao, Validators.required],
      produtos: [this.produtos]
    });
  }

  createForm2() {
    this.form2 = this.formBuilder.group({
      nomeProduto: [this.pesquisa.nomeProduto, Validators.required],
      marca: [this.pesquisa.marca, Validators.required],
      medida: [this.pesquisa.medida, Validators.required],
      preco: [this.pesquisa.preco, Validators.required],
      });
  }

  delete(slidingItem: ItemSliding, item: any) {
    slidingItem.close();
    for (let i of this.produtos) {
        if (i.marca == item.marca) {
            this.produtos.splice(this.produtos.indexOf(i), 1);
            break;
        }
    }

  }

  getMarca(){


  }

  setVisible(){

    if(this.form2.value.marca == "Outra"){
      this.isVisibleOutro = true;
      console.log("entrou em outro")
    }else{
      this.isVisibleOutro = false;
    }

    if(this.form2.value.nomeProduto !=null){
      this.produtosRef.orderByChild("nomeProduto").equalTo(this.form2.value.nomeProduto)
      .on('value', marcasList => {
        console.log("entrou2")
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

      if(unique_array_med == null){
        for(let i = 0;i < marcas.length; i++){
            if(unique_array_med.indexOf(marcas[i].medida) == 1){
                unique_array_med.push(marcas[i].medida);
            }
         }
      }


      unique_array.push("Outra");
      this.marcasList = unique_array;
      this.medidasList = unique_array_med;
     });
     this.isVisible = true;
    }else{
      this.isVisible = false;
    }
    console.log(this.marcasList)
  }


  onSubmit() {
    this.buttonClick = true;
    if (this.form.valid) {
      this.message_success = 'Pesquisa realizada com sucesso';
      this.provider.savePesquisa(this.form.value)
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
    var existe = false;
    for(let i = 0;i < this.produtos.length; i++){

      if(this.form2.value.marca.toString() === this.produtos[i].marca.toString()){
        this.toast.create({ message: this.form2.value.nomeProduto.toString()
          + " " + this.form2.value.marca.toString() + ' já está na lista de itens.', duration: 3000 }).present();
        existe = true;
      }
     }

     if(existe == false){
      console.log("nao existe")
        this.produtos.push(this.form2.value);
     }

    this.form2 = null;
    this.createForm2();
    this.isEnabled = true;
  }

  ionViewDidLoad() {
    this.supermercadosRef.on('value', supermercadosList => {
        let supermercados = [];
        supermercadosList.forEach( sup => {
          supermercados.push(sup.val());
        return false;
      });

     let unique_array_sup = [];
      for(let i = 0;i < supermercados.length; i++){
          if(unique_array_sup.indexOf(supermercados[i].nomeSupermercado) == -1){
              unique_array_sup.push(supermercados[i].nomeSupermercado);
          }
      }
      this.supermercadosList = unique_array_sup;

    });


    this.produtosRef.on('value', produtosList => {
        let produtos = [];
        produtosList.forEach( produto => {
          produtos.push(produto.val());
        return false;
      });


     let unique_array = [];
      for(let i = 0;i < produtos.length; i++){
          if(unique_array.indexOf(produtos[i].nomeProduto) == -1){
              unique_array.push(produtos[i].nomeProduto);
          }
      }
      this.produtosList = unique_array;

    });
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
