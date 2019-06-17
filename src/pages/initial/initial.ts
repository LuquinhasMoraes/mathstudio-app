import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, ViewController, MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

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
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class InitialPage {
  
  @ViewChild('mycontent') nav: NavController
  
  user_friends: any;
  user: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl: ViewController, 
    public appCtrl: App,
    public menu: MenuController
  ) 
  {
    // menu.enable(true);
  }
  
  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menu.close();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialPage');
  }

  navigateToGame() {
    this.navCtrl.push(HomePage, this.user);
  }


}
