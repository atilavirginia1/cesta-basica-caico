import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

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

	signInAluno(credentials){
	  if(credentials.email){
	    var query = firebase.database().ref(this.PATH).orderByChild("email").equalTo(credentials.email);
		 query.on("child_added", function(snapshot) {
		   	if(snapshot.val().email == credentials.email && snapshot.val().senha == credentials.password
		      	&& snapshot.val().ativo == true){
		     	credentials.allow = true;
	  			console.log(credentials.allow)
		   	}
		  });
	  }
	  return credentials.allow;
	}

	logout(){
	  this.afAuth.auth.signOut();
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

}