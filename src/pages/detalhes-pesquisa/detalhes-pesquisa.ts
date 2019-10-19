import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ProvedorProvider } from '../../providers/provedor/provedor';
import * as XLSX from 'xlsx';
import { File } from '@ionic-native/file';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the DetalhesPesquisaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalhes-pesquisa',
  templateUrl: 'detalhes-pesquisa.html',
})
export class DetalhesPesquisaPage {
  selectedItem: any;
  pesquisa: any;
  arrayPesquisas: Array<any> =[];
  arrayOrdenar: Array<any> =[];
  produto: Array<{id: string, marca:string, medida: string, nome: string}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private provider: ProvedorProvider,
    public db: AngularFireDatabase, public file: File) {
    this.selectedItem = navParams.get('push_item');
    this.pesquisa = db.list('/pesquisas');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesPesquisaPage');
  }

  mountExcel(p){
    for(var i=0; i<2; i++) {
      this.arrayPesquisas.push([" "]);
    }
    var dataPesq = [" ", " ", " ", " ", "Realizada em: ", p.data];
    this.arrayPesquisas.push(dataPesq);

    var sup = [" ", " ", " ", " ", "Supermercado: ", p.supermercado];
    this.arrayPesquisas.push(sup);

    var email = [" ", " ", " ", " ", "Email do responsável: ", p.email];
    this.arrayPesquisas.push(email);

    for(var i=0; i<2; i++) {
      this.arrayPesquisas.push([" "]);
    }

    var header = ["Nome do Produto", "Marca/Tipo", "Medida", "Preço"];
    this.arrayPesquisas.push(header);

    for(var j=0; j<p.produtos.length; j++){
      var nome    = p.produtos[j].nomeProduto;
      var marca   = p.produtos[j].marca;
      var medida  = p.produtos[j].medida;
      var preco   = p.produtos[j].preco;
      var index   = [nome,marca,medida,preco];
      this.arrayOrdenar.push(index);
      this.arrayOrdenar.sort();
    }

    for(var x=0; x<this.arrayOrdenar.length; x++){
      this.arrayPesquisas.push(this.arrayOrdenar[x]);
    }
  }

  exportar(p) {
    this.mountExcel(p);
    this.OnExport(p);
    this.toast.create({ message: 'Arquivo exportado, verifique seus arquivos.', duration: 3000 }).present();
  }

  // compartilhar() {
  //   this.toast.create({ message: 'Pesquisa compartilhada com sucesso', duration: 3000 }).present();
  // }

  getStoragePath()
    {
        let file = this.file;
        return this.file.resolveDirectoryUrl(this.file.externalRootDirectory).then(function (directoryEntry) {
            return file.getDirectory(directoryEntry, "Ionic2ExportToXLSX", {
                create: true,
                exclusive: false
            }).then(function () {
                return directoryEntry.nativeURL + "Ionic2ExportToXLSX/";
            });
        });
    }

    OnExport = function (p)
    {

        let sheet = XLSX.utils.json_to_sheet(p.produtos);
        let wb = {
            SheetNames: ["export"],
            Sheets: {
                "export": sheet
            }
        };

        let wbout = XLSX.write(wb, {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary'
        });

        function s2ab(s) {
            let buf = new ArrayBuffer(s.length);
            let view = new Uint8Array(buf);
            for (let i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
    if(this.plt.is('cordova')){
          let blob = new Blob([s2ab(wbout)], {type: 'application/octet-stream'});
          let self = this;
          this.getStoragePath().then(function (url) {
              self.file.writeFile(url, "Pesquisa " + p.supermercado +" - " + p.data + ".xlsx", blob, true).then(() => {
                  alert("Arquivo criado em : " + url);
              }).catch(() => {
                  alert("Erro ao criar arquivo em :" + url);
              });
          });
    }else{
        const wb: XLSX.WorkBook = this.write(p);
        XLSX.writeFile(wb, "Pesquisa " + p.supermercado +" - " + p.data + ".xlsx");
    }
 }

 write(p): XLSX.WorkBook {
    /* generate worksheet */

    const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(this.arrayPesquisas);

    /* generate workbook and add the worksheet */

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');

    return wb;
  };

}
