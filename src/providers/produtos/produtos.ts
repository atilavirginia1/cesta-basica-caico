import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the ProdutosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdutosProvider {
  produtos: any;
  nome: string;
  id: any;
  key: any;
  private PATH = 'produtos/';
	constructor(private db: AngularFireDatabase, private af: AngularFireModule) {
  }

  getId() {
    return this.id;
  }
  setId(id: any) {
    this.id = id;
  }

  setNome(nome: string)
  {
    this.nome = nome;
  }

  getNome()
  {
    return this.nome;
  }

  getProduto()
  {
    var query = firebase.database().ref(this.PATH).orderByChild("nomeProduto").equalTo(this.nome);
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

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nomeProduto'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  save(produtos: any) {

    var query = firebase.database().ref(this.PATH).orderByChild("id").equalTo(produtos.id);
    var key = query.on("child_added", function(snapshot) {
          produtos.key = snapshot.key;
      });

    return new Promise((resolve, reject) => {

      if (produtos.key) {
        this.db.list(this.PATH)
          .update(produtos.key, { nomeProduto: produtos.nomeProduto, marca: produtos.marca, medida: produtos.medida, id: produtos.id })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ nomeProduto: produtos.nomeProduto, marca: produtos.marca, medida: produtos.medida, id: produtos.id })
          .then(() => resolve());
      }
    })
  }

 remove(id: string) {
  var query = firebase.database().ref(this.PATH).orderByChild("id").equalTo(id);
  var key = query.on("child_added", function(snapshot) {
    snapshot.ref.remove();
  });
  }
}
