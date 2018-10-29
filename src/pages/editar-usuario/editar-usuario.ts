import { Component, enableProdMode } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProvedorProvider } from './../../providers/provedor/provedor';
/**
 * Generated class for the EditarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-usuario',
  templateUrl: 'editar-usuario.html',
})
export class EditarUsuarioPage {
  form: FormGroup;
  usuario: any;  
  public nome: any;
  public username: any;
  key: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 private formBuilder: FormBuilder,
  	 private provider: ProvedorProvider,
    private toast: ToastController) {
  	this.usuario = this.navParams.data.usuario || { };

    if (this.provider.getEmail() != null) {
        this.usuario = this.provider.get(this.key);

      //  var value = this.usuario.val();
       this.nome = this.usuario.nome;
       this.username = this.usuario.usuario;
     }
     this.createForm();
  }

  createForm() {
    console.log("entrou")
      this.form = this.formBuilder.group({
        key: this.usuario.key,
        nome: this.usuario.nome,
        usuario: this.usuario.usuario,
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
          this.toast.create({ message: 'Erro ao cadastrar usuário.', duration: 3000 }).present();
          console.error(e)
        })
  	 }

}