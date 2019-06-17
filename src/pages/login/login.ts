import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { InitialPage } from '../initial/initial';

export class Model {

  constructor(objeto?) {
      Object.assign(this, objeto);
  }

}

export class Usuario extends Model {
    codigo: number;
    nome: string;
    email: string;
    login: string;
    senha: string;
}

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user_friends: any;
  user: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public appCtrl: App, private facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialPage');
  }

  navigateToGame() {
    this.navCtrl.push(InitialPage, this.user);
  }

  loginFacebook() {
    let permissions = new Array<string>();
     permissions = ["public_profile", "user_friends", "email"];

     this.facebook.login(permissions).then((response) => {
      let params = new Array<string>();

      this.facebook.api("/me?fields=name,email,user_friends", params)
      .then(res => {

          //estou usando o model para criar os usuarios
          let usuario = new Usuario();
          usuario.nome = res.name;
          usuario.email = res.email;
          usuario.senha = res.id;
          usuario.login = res.email;
        
          // this.logar(usuario);
          // this.user_friends = res;
          this.navCtrl.push(InitialPage, usuario.nome);
      }, (error) => {
        alert(error);
        console.log('ERRO LOGIN: ',error);
      })
    }, (error) => {
      alert(error);
    });
  }

  logar(usuario: Usuario) {
    console.log(usuario);
    // this.salvarService.salvarFacebook(usuario)
    // .then(() => {
    //     console.log('Usuario cadastrado via facebook com sucesso!');
    // })
  }
}
