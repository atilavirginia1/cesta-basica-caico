import { Component } from '@angular/core';
import { IonicPage, NavParams, ToastController, NavController } from 'ionic-angular';
import { FormGroup } from '@angular/forms';
import firebase from 'firebase';
import { ProvedorProvider } from '../../providers/provedor/provedor';

/**
 * Generated class for the SolicitacoesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitacoes',
  templateUrl: 'solicitacoes.html',
})
export class SolicitacoesPage {
  form: FormGroup;
  public alunosList: Array<any>;
	public loadedAlunosList: Array<any>;
  public alunosRef: firebase.database.Reference;
  alunos: Array<{nome: string, matricula: string}>;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private provider: ProvedorProvider, private toast: ToastController) {
    this.alunos = [];
	    for (let p = 1; p < 6; p++) {
	      this.alunos.push({
	        nome: 'Nome ' + p,
	        matricula: 'Matricula ' + p,
	      });
	    }

	  	this.alunosRef = firebase.database().ref('/usuarios');
	  	this.alunosRef.orderByChild("cargo" || "ativo").equalTo("A" || "false").on('value', alunosList => {
			let alunos = [];
			alunosList.forEach( aluno => {
		    alunos.push(aluno.val());
			return false;
		  });

		  this.alunosList = alunos;
		  this.loadedAlunosList = alunos;
    });
  }

  initializeItems(): void {
	  this.alunosList = this.loadedAlunosList;
	}


  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitacoesPage');
  }

  aceitar(event, selectedItem) {
    if(selectedItem.id) {
      selectedItem.ativo = true;
      this.provider.save(selectedItem);
      this.toast.create({ message: 'Aluno aceito com sucesso', duration: 3000 }).present();
    }
  }
  recusar(event, selectedItem) {
    if (selectedItem.id) {
      this.provider.remove(selectedItem);
      this.toast.create({ message: 'Aluno recusado com sucesso', duration: 3000 }).present();
    }
  }
}
