import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProdutosProvider } from '../../providers/produtos/produtos';
/**
 * Generated class for the EditarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-produto',
  templateUrl: 'editar-produto.html',
})
export class EditarProdutoPage {
  selectedItem: any;
  form: FormGroup;
  produto: any;
  public nomeProduto: any;
  public marca: any;
  public medida: any;
  key: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
  	 private formBuilder: FormBuilder,
  	 private provider: ProdutosProvider,
    	private toast: ToastController) {
      this.selectedItem = navParams.get('push_item');
      console.log(this.provider.getNome());
      this.produto = this.navParams.data.produto || { };
      if (this.provider.getNome() != null) {
        this.produto = this.provider.getProduto();

      //  var value = this.produto.val();
       this.key = this.selectedItem.key;
       this.nomeProduto = this.selectedItem.nomeProduto;
       this.marca = this.selectedItem.marca;
       this.medida = this.selectedItem.medida;
     }
     this.createForm();
  }

  createForm() {
      this.form = this.formBuilder.group({
        key: this.produto.key,
        nomeProduto: this.produto.nome,
        marca: this.produto.marca,
        medida: this.produto.medida,
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
          this.toast.create({ message: 'Erro ao cadastrar produto.', duration: 3000 }).present();
          console.error(e)
        })
  	 }

}
