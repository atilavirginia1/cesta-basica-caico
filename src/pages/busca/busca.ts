import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Slides, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DetalhesPesquisaPage } from '../detalhes-pesquisa/detalhes-pesquisa';
import { DetalhesAlunoPage } from '../detalhes-aluno/detalhes-aluno';

import firebase from 'firebase';
import { SupermercadosProvider } from '../../providers/supermercados/supermercados';
import { DetalhesSupermercadoPage } from '../detalhes-supermercado/detalhes-supermercado';
import { DetalhesProdutoPage } from '../detalhes-produto/detalhes-produto';
import { EditarSupermercadoPage } from '../editar-supermercado/editar-supermercado';
import { ProdutosProvider } from '../../providers/produtos/produtos';
import { EditarProdutoPage } from '../editar-produto/editar-produto';
/**
 * Generated class for the BuscaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busca',
  templateUrl: 'busca.html',
})
export class BuscaPage {

 @ViewChild('SwipedTabsSlider') SwipedTabsSlider: Slides ;

  	SwipedTabsIndicator :any= null;
  	tabs:any=[];
  	form: FormGroup;
  	supermercado: any;
  	dataPesquisa: any;
  	isVisible: boolean = false;

    public alunosList:Array<any>;
    public pesquisasList:Array<any>;
    public loadedAlunosList:Array<any>;
    public alunosRef:firebase.database.Reference;
    public supermercadoList:Array<any>;
    public supermercadosDropList:Array<any>;
    public loadedSupermercadosList:Array<any>;
    public supermercadosRef:firebase.database.Reference;
    public produtosList:Array<any>;
    public loadedprodutosList:Array<any>;
    public produtosRef:firebase.database.Reference;
    public pesquisasRef:firebase.database.Reference;

    pesquisas: Array<{pesquisa: string, aluno: string, supermercado: string, data_realizacao: string}>;

    constructor(public navCtrl: NavController, private formBuilder: FormBuilder,
      private providerS: SupermercadosProvider, private toast: ToastController,
      private providerP: ProdutosProvider) {


      this.pesquisasRef = firebase.database().ref('/pesquisas');
      this.pesquisasRef.orderByChild("data || supermercado").on('value', pesquisasList => {
      let pesquisas = [];
      pesquisasList.forEach( pesquisa => {
        pesquisas.push(pesquisa.val());
      return false;
      });

      this.pesquisasList = pesquisas;
      });

	  	this.alunosRef = firebase.database().ref('/usuarios');
	  	this.alunosRef.orderByChild("cargo").equalTo("A").on('value', alunosList => {
			let alunos = [];
			alunosList.forEach( aluno => {
		    alunos.push(aluno.val());
			return false;
		  });

		  this.alunosList = alunos;
		  this.loadedAlunosList = alunos;
    });

    this.supermercadosRef = firebase.database().ref('/supermercados');
	  	this.supermercadosRef.orderByChild("nomeSupermercado").on('value', supermercadosList => {
			let supermercados = [];
			supermercadosList.forEach( supermercado => {
		    supermercados.push(supermercado.val());
			return false;
		  });

		  this.supermercadoList = supermercados;
		  this.loadedSupermercadosList = supermercados;
    });

    this.produtosRef = firebase.database().ref('/produtos');
	  	this.produtosRef.orderByChild("nomeProduto").on('value', produtosList => {
			let produtos = [];
			produtosList.forEach( produto => {
		    produtos.push(produto.val());
			return false;
		  });

		  this.produtosList = produtos;
		  this.loadedSupermercadosList = produtos;
    });

	  	this.tabs=["Pesquisa","Aluno", "Parâmetros"];
	  	this.createForm();

	}

	initializeItems(): void {
    this.alunosList = this.loadedAlunosList;
    this.supermercadoList = this.loadedSupermercadosList;
    this.produtosList = this.loadedprodutosList;
	}

	getItems(searchbar) {
	  // Reset items back to all of the items
	  this.initializeItems();

	  // set q to the value of the searchbar
	  var q = searchbar.srcElement.value;


	  // if the value is an empty string don't filter the items
	  if (!q) {
	    return;
	  }

	  this.alunosList = this.alunosList.filter((v) => {
	    if(v.nome && q) {
	      if (v.nome.toLowerCase().indexOf(q.toLowerCase()) > -1) {
	        return true;
	      }
	      return false;
	    }
    });


  }

  getItemsParameters(searchbar) {
     // Reset items back to all of the items
	  this.initializeItems();

	  // set q to the value of the searchbar
	  var q = searchbar.srcElement.value;


	  // if the value is an empty string don't filter the items
	  if (!q) {
	    return;
	  }

    this.supermercadoList = this.supermercadoList.filter((v) => {
	    if(v.nomeSupermercado && q) {
	      if (v.nomeSupermercado.toLowerCase().indexOf(q.toLowerCase()) > -2) {
	        return true;
	      }
	      return false;
	    }
	  });

    /* this.produtosList = this.produtosList.filter((v) => {
	    if(v.nomeProduto && q) {
	      if (v.nomeProduto.toLowerCase().indexOf(q.toLowerCase()) > -3) {
	        return true;
	      }
	      return false;
	    }
	  });*/
  }

	createForm() {
	    this.form = this.formBuilder.group({
	      supermercado: this.supermercado,
	      dataPesquisa: this.dataPesquisa
	    });
	}

  ionViewDidEnter() {
    this.SwipedTabsIndicator = document.getElementById("indicator");
  }

  selectTab(index) {
    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(100*index)+'%,0,0)';
    this.SwipedTabsSlider.slideTo(index, 500);
  }

  updateIndicatorPosition() {
      // this condition is to avoid passing to incorrect index
  	if( this.SwipedTabsSlider.length()> this.SwipedTabsSlider.getActiveIndex())
  	{
  		this.SwipedTabsIndicator.style.webkitTransform = 'translate3d('+(this.SwipedTabsSlider.getActiveIndex() * 100)+'%,0,0)';
  	}

    }

  animateIndicator($event) {
  	if(this.SwipedTabsIndicator)
   	    this.SwipedTabsIndicator.style.webkitTransform = 'translate3d(' + (($event.progress* (this.SwipedTabsSlider.length()-1))*100) + '%,0,0)';
  }

  onSubmit() {

    if(this.dataPesquisa == null){
      this.pesquisas = this.pesquisasList;
    }else{
      let unique_array = [];
      for(let i = 0;i < this.pesquisasList.length; i++){
        const formatedDate = this.pesquisasList[i].data.toString().substring(0, 7);
        if(formatedDate == this.dataPesquisa.toString()){
            unique_array.push(this.pesquisasList[i]);
        }
      }
      this.pesquisas = unique_array;
    }

    if(this.supermercado == null){
      // nothing to do
    }else{
      let unique_array_super = [];
      for(let i = 0;i < this.pesquisas.length; i++){
        if(this.pesquisas[i].supermercado.toString() == this.supermercado.toString()){
            unique_array_super.push(this.pesquisas[i]);
        }
      }
      this.pesquisas = unique_array_super;

    }
          console.log(this.pesquisas)
    if(this.pesquisas.length == 0){
      this.toast.create({ message: 'Nenhum resultado encontrado.', duration: 3000 }).present();
    }
  }

  itemTapped(event, p) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetalhesPesquisaPage, {
      push_item: p
    });
  }

  itemAlunoTapped(event, aluno) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetalhesAlunoPage, {
      push_item: aluno
    });
  }

  itemSupermercadoTapped(event, supermercado) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetalhesSupermercadoPage, {
      push_item: supermercado
    });
  }

  itemProdutoTapped(event, produto) {

    // That's right, we're pushing to ourselves!
    this.navCtrl.push(DetalhesProdutoPage, {
      push_item: produto
    });
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
            this.supermercadosDropList = unique_array_sup;
        });
  }

  removeSupermercado(event, supermercados){
    if (supermercados) {
          this.providerS.remove(supermercados.cnpj)
          this.toast.create({ message: 'Supermercado removido com sucesso.', duration: 3000 }).present();
    }
  }

  editarSupermercado(event, supermercado){
    this.navCtrl.push(EditarSupermercadoPage, {
      push_item: supermercado
    });
  }

  editProduto(event, produto){
    this.navCtrl.push(EditarProdutoPage, {
      push_item: produto
    });
  }

  removeProduto(event, produtos) {
    if (produtos) {
	    this.providerP.remove(produtos.id);
      this.toast.create({ message: 'Produto removido sucesso.', duration: 3000 }).present();
	  }
  }
}
