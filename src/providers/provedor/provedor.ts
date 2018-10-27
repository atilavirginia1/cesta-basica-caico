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
  user: any;
  key: any;
  email: string;
  private PATH = 'usuarios/';
	constructor(private db: AngularFireDatabase) {
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
    return query.on("child_added", function(snapshot) {
      });
  }

  get(key: any) {
    var query = firebase.database().ref(this.PATH).orderByChild("email").equalTo(this.email);
    var key2 = query.on("child_added", function(snapshot) {
      key = snapshot.val();
    });

    return key;
  }

  save(usuario: any) {
    if(this.email){
      var query = firebase.database().ref(this.PATH).orderByChild("email").equalTo(this.email);
      var key = query.on("child_added", function(snapshot) {
            usuario.key = snapshot.key;
      });
    }

    return new Promise((resolve, reject) => {

      if (usuario.key) {
        this.db.list(this.PATH)
          .update(usuario.key, { nome: usuario.nome, usuario: usuario.usuario })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ nome: usuario.nome, cargo: usuario.cargo, mat_siape: usuario.mat_siape, usuario: usuario.usuario, senha: usuario.senha, email: usuario.email, ativo: usuario.ativo})
          .then(() => resolve());
      }
    })
  }
 
 remove(usuario: any) {
    var query = firebase.database().ref(this.PATH).orderByChild("email").equalTo(usuario.email);
    var key = query.on("child_added", function(snapshot) {
      snapshot.ref.remove();
    });
  }
}
