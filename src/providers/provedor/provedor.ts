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
  email: string;
  key: any;
  private PATH = 'usuarios/';
	constructor(private db: AngularFireDatabase, private af: AngularFireModule) {
  }

  setEmail(email: string)
  {
    this.email = email; 
  }

  getEmail()
  {
    return this.email; 
  }

  getUser()
  {
    var query = firebase.database().ref(this.PATH).orderByChild("email").equalTo(this.email);
     return  query.on("child_added", function(snapshot) {
          console.log(snapshot.val());
      });
  }

  get(key: string) {
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

 remove(email: string) {
    var query = firebase.database().ref(this.PATH).orderByChild("email").equalTo(email);
    var key = query.on("child_added", function(snapshot) {
      console.log(snapshot.key)
      this.key = snapshot.key;
    });
    //return this.db.list(this.PATH).remove(key);
    console.log(this.key)
   return this.db.list(this.PATH).remove(this.key);
  }
}
