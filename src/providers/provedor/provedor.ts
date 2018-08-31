import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import firebase from 'firebase';

/*
  Generated class for the ProvedorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProvedorProvider {
	users: any;
  private PATH = 'usuarios/';
	constructor(private db: AngularFireDatabase, private af: AngularFireModule) {
  }

  get(key: string) {
    console.log(key);
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }

  save(usuario: any) {

    return new Promise((resolve, reject) => {

      if (usuario.key) {
        this.db.list(this.PATH)
          .update(usuario.key, { nome: usuario.nome, cargo: usuario.cargo, mat_siape: usuario.mat_siape, usuario: usuario.usuario, senha: usuario.senha, email: usuario.email, ativo: usuario.ativo})
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ nome: usuario.nome, cargo: usuario.cargo, mat_siape: usuario.mat_siape, usuario: usuario.usuario, senha: usuario.senha, email: usuario.email, ativo: usuario.ativo})
          .then(() => resolve());
      }
    })
  }

 remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}
