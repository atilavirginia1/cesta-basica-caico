import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SolicitacoesPage } from '../pages/solicitacoes/solicitacoes';
import { BuscaPage } from '../pages/busca/busca';
import { RelatoriosPage } from '../pages/relatorios/relatorios';
import { EditarUsuarioPage } from '../pages/editar-usuario/editar-usuario';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{icon: string, title: string, component: any}>;

  user: any;
  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen) {

    firebase.initializeApp({
      apiKey: "AIzaSyBX-_z8fwzAY0AHVHnv2wYZNIIKP6cq2-g",
      authDomain: "cestabasicacaico.firebaseapp.com",
      databaseURL: "https://cestabasicacaico.firebaseio.com",
      storageBucket: "cestabasicacaico.appspot.com",
      messagingSenderId: "949469559012"
    });

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'home', title: 'Home', component: HomePage },
      { icon: 'search', title: 'Buscar', component: BuscaPage },
      { icon: 'create', title: 'Editar Perfil', component: EditarUsuarioPage },
      { icon: 'pie', title: 'Relatórios', component: RelatoriosPage },
      { icon: 'person-add', title: 'Solicitações', component: SolicitacoesPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if(page.component.name != 'HomePage' && page.component.name != 'LoginPage'){
      this.nav.push(page.component);
    }else{
      this.nav.setRoot(page.component);
    }
  }
}
