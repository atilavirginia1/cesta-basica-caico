import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProvedorProvider } from './../../providers/provedor/provedor';
import { AngularFireDatabase } from 'angularfire2/database';
import { DetalhesPesquisaPage } from '../detalhes-pesquisa/detalhes-pesquisa';
import firebase from 'firebase';

/**
 * Generated class for the DetalhesAlunoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-aluno',
  templateUrl: 'detalhes-aluno.html',
})
export class DetalhesAlunoPage {
  selectedItem: any;
  public user: any;
  public usuarios: any;
  email: any;
  pesquisas: any;
  // pesquisas: Array<any>;
  noresult: boolean = false;
  public loadedPesquisasList:Array<any>;
  public pesquisasList:Array<any>;
  public pesquisasRef:firebase.database.Reference;

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,
  	private provider: ProvedorProvider, public db: AngularFireDatabase) {
  	this.selectedItem = navParams.get('push_item');
    this.usuarios = db.list('/usuarios');
    this.pesquisas = db.list('/pesquisas');
    //this.user = this.navParams.get('data');
    if(this.selectedItem.email){
      this.provider.setEmail(this.selectedItem.email);
      // this.usuarios = this.provider.getUser();
    }
    this.email = this.selectedItem.email;
    this.initializePesquisas();
  }

  initializePesquisas(){
    this.pesquisasRef = firebase.database().ref('/pesquisas');
    this.pesquisasRef.orderByChild("email").equalTo(this.email).on("value", pesquisasList => {
    let pesquisas = [];
    pesquisasList.forEach( pesquisa => {
      pesquisas.push(pesquisa.val());
    return false;
    });

    this.pesquisasList = pesquisas;
    this.loadedPesquisasList = pesquisas;
    this.pesquisasList.reverse();
    });

    if(this.pesquisasList == null){
      this.noresult = true;
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesAlunoPage');
  }

  itemTapped(event, p) {
    this.navCtrl.push(DetalhesPesquisaPage, {
      push_item: p
    });
  }

  removerAluno(selectedItem){
	if (selectedItem.email) {
	      this.provider.remove(selectedItem)
	      this.toast.create({ message: 'Contato removido sucesso.', duration: 3000 }).present();
	      this.navCtrl.pop();
	    }
  }

}
