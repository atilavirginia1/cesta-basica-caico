import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the SupermercadosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SupermercadosProvider {
  supermercados: any;
  nome: any;
  private PATH = 'supermercados/';
	constructor(private db: AngularFireDatabase, private af: AngularFireModule) {
  }

  getNome(){
    return this.nome;
  }

  setNome(nome:String){
    this.nome = nome;
  }

  getSupermercado()
  {
    var query = firebase.database().ref(this.PATH).orderByChild("nomeSupermercado").equalTo(this.nome);
     return  query.on("child_added", function(snapshot) {
          console.log(snapshot.val());
      });
  }

  get(key: string) {
    console.log(key);
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  save(supermercados: any) {

    return new Promise((resolve, reject) => {

      if (supermercados.key) {
        this.db.list(this.PATH)
          .update(supermercados.key, { nomeSupermercado: supermercados.nomeSupermercado, endereco: supermercados.endereco, bairro: supermercados.bairro })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ nomeSupermercado: supermercados.nomeSupermercado, endereco: supermercados.endereco, bairro: supermercados.bairro })
          .then(() => resolve());
      }
    })
  }

 remove(supermercados: any) {
  var query = firebase.database().ref(this.PATH).orderByChild("nomeSupermercado").equalTo(supermercados.nomeSupermercado);
  var key = query.on("child_added", function(snapshot) {
    snapshot.ref.remove();
    });
  }
}
