import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { delay } from 'rxjs/operator/delay';

@Injectable()
export class AuthService {
	private user: firebase.User;
	usuario: any;
	private PATH = 'usuarios/';

	constructor(public afAuth: AngularFireAuth) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
		console.log(this.user)

	}

	signInWithEmail(credentials) {
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

	async signInAluno(credentials){
	  if(credentials.email){
	    var query = firebase.database().ref(this.PATH).orderByChild("email").equalTo(credentials.email);
      query.on("child_added", function(snapshot) {
        if(snapshot.val().email == credentials.email && snapshot.val().senha == credentials.password
          && snapshot.val().ativo == true) {
            credentials.allow = true;
          }
      });

	  }
	  return await credentials.allow; //o await faz com que a função espere a requisição voltar do firebase
	}

	async signInUser(credentials){
		var query = firebase.database().ref(this.PATH).orderByChild("email").equalTo(credentials.email);
		query.on("child_added", function(snapshot) {
			if(snapshot.val().email === credentials.email && snapshot.val().senha === credentials.password
				&& snapshot.val().cargo === credentials.cargo && snapshot.val().ativo === true){
					credentials.allow = true;
			}	
		});
		return await credentials.allow;
	}

	logout(){
	  this.afAuth.auth.signOut();
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

}
