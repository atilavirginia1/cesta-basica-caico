import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

/*
  Generated class for the ProdutosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProdutosProvider {
  produtos: any;
  private PATH = 'produtos/';
	constructor(private db: AngularFireDatabase, private af: AngularFireModule) {
  }

  get(key: string) {
    console.log(key);
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nome'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  save(produtos: any) {

    return new Promise((resolve, reject) => {

      if (produtos.key) {
        this.db.list(this.PATH)
          .update(produtos.key, { nomeProduto: produtos.nomeProduto, marca: produtos.marca, medida: produtos.medida })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ nomeProduto: produtos.nomeProduto, marca: produtos.marca, medida: produtos.medida })
          .then(() => resolve());
      }
    })
  }

 remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}
