import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { SupermercadosProvider } from '../../providers/supermercados/supermercados';

/**
 * Generated class for the EditarSupermercadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-supermercado',
  templateUrl: 'editar-supermercado.html',
})
export class EditarSupermercadoPage {

  selectedItem: any;
  form: FormGroup;
  supermercado: any;
  public cnpj: any;
  public nomeSupermercado: any;
  public endereco: any;
  public bairro: any;
  key: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 private formBuilder: FormBuilder, private provider: SupermercadosProvider,
    	private toast: ToastController, private alertCtrl: AlertController) {
      this.selectedItem = navParams.get('push_item');
      this.supermercado = this.navParams.data.supermercados || { };
      if (this.provider.getNome() != null) {
        this.supermercado = this.provider.getSupermercado();

      //  var value = this.produto.val();
       this.key = this.selectedItem.key;
       this.cnpj = this.selectedItem.cnpj;
       this.nomeSupermercado = this.selectedItem.nomeSupermercado;
       this.endereco = this.selectedItem.endereco;
       this.bairro = this.selectedItem.bairro;
     }
     console.log(this.selectedItem.nomeSupermercado)
     this.createForm();
  }

  createForm() {

      this.form = this.formBuilder.group({
        key: this.selectedItem.key,
        cnpj: this.selectedItem.cnpj,
        nomeSupermercado: this.supermercado.nomeSupermercado,
        endereco: this.supermercado.endereco,
        bairro: this.supermercado.bairro
      });
  }

  onSubmit() {
    console.log(this.form);
    this.provider.save(this.form.value)
        .then(() => {
          	this.toast.create({ message: 'Alteração realizada com sucesso', duration: 3000 }).present();
          	this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao editar supermercado.', duration: 3000 }).present();
          console.error(e)
        })
  }

  ionViewCanLeave() {
    return new Promise((resolve, reject) => {
      this.alertCtrl
        .create({
          enableBackdropDismiss: false,
          title: "Voltar",
          message:
            "Tem certeza que deseja voltar? Quaisquer alterações feitas serão perdidas.",
          buttons: [
            {
              text: "Sim",
              handler: resolve
            },
            {
              text: "Não",
              handler: reject
            }
          ]
        })
        .present();
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarSupermercadoPage');
  }

}
