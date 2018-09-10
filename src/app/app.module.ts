import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomeProfessorPage } from '../pages/home-professor/home-professor';
import { HomeAlunoPage } from '../pages/home-aluno/home-aluno';
import { LoginPage } from '../pages/login/login';
import { CadastrarPage } from '../pages/cadastrar/cadastrar';
import { DetalhesPesquisaPage } from '../pages/detalhes-pesquisa/detalhes-pesquisa';
import { DetalhesAlunoPage } from '../pages/detalhes-aluno/detalhes-aluno';
import { SolicitacoesPage } from '../pages/solicitacoes/solicitacoes';
import { RealizarPesquisaPage } from '../pages/realizar-pesquisa/realizar-pesquisa';
import { ListPage } from '../pages/list/list';
import { BuscaPage } from '../pages/busca/busca';
import { RelatoriosPage } from '../pages/relatorios/relatorios';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProvedorProvider } from '../providers/provedor/provedor';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CadastrarProdutoPage } from '../pages/cadastrar-produto/cadastrar-produto';
import { CadastrarSupermercadoPage } from '../pages/cadastrar-supermercado/cadastrar-supermercado';
import firebase from 'firebase';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    HomeProfessorPage,
    HomeAlunoPage,
    ListPage,
    LoginPage,
    CadastrarPage,
    DetalhesPesquisaPage,
    DetalhesAlunoPage,
    SolicitacoesPage,
    BuscaPage,
    RelatoriosPage,
    RealizarPesquisaPage,
    CadastrarProdutoPage,
    CadastrarSupermercadoPage

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyBX-_z8fwzAY0AHVHnv2wYZNIIKP6cq2-g",
      authDomain: "cestabasicacaico.firebaseapp.com",
      databaseURL: "https://cestabasicacaico.firebaseio.com",
      projectId: "cestabasicacaico",
      storageBucket: "cestabasicacaico.appspot.com",
      messagingSenderId: "949469559012"
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    HomeProfessorPage,
    HomeAlunoPage,
    ListPage,
    LoginPage,
    CadastrarPage,
    DetalhesPesquisaPage,
    DetalhesAlunoPage,
    SolicitacoesPage,
    BuscaPage,
    RelatoriosPage,
    RealizarPesquisaPage,
    CadastrarProdutoPage,
    CadastrarSupermercadoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProvedorProvider
  ]
})
export class AppModule {}
