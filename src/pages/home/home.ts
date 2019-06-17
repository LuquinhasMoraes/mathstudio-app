import { Component } from '@angular/core';
import { NavController, Platform, ToastController, NavParams } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import { SocketConnectProvider } from '../../providers/socket-connect/socket-connect';
import { Operation } from '../../models/Operation.model';
import { NameOperation } from '../../enums/NameOperation.enum';
import { Question } from '../../models/Question.model';
import { OperationQuestion } from '../../models/OperationQuestion.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    SocketConnectProvider
  ]
})
export class HomePage {

  intervalOperationId: number = null;
  isApp: boolean;
  defaultOperation: Operation = new Operation('x', NameOperation.multiplication);

  settings = {
    background: {
      url: "../assets/imgs/app/background-home.png"
    },
    loadingUrl: "../assets/imgs/loading.gif"
  }

  isPlayerConnected: boolean = false;
  counter: number = 3;
  cronometerCount: number = 10;
  gameStarted: boolean = false;
  touched: boolean = false;
  user: string;
  userLogged = {
    name: this.user,
    answer: ''
  }
  operationQuestion: Question;
  score: number = 0;

  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private vibration: Vibration, 
    public platform: Platform,
    public toastController: ToastController,
    private socketConnectProvider: SocketConnectProvider
  )
  {
    this.user = navParams.data;

    this.socketConnectProvider.emit("user-connected", this.user);

    this.socketConnectProvider.getUsers().subscribe(data => {
      this.isPlayerConnected = true;
      this.presentToast(data.user + ' está ' + data.event + '.', 'bottom')
    });

    this.socketConnectProvider.getStartGame().subscribe(data => {
      //Contagem regressiva para inicio do jogo.
      this.decreaseCounter();
      this.touched = data.started;
    });

    this.socketConnectProvider.getOperationQuestion().subscribe(data => {
      this.operationQuestion = data.operationQuestion;      
    });

    this.socketConnectProvider.getIntervalId().subscribe(data => {
      this.destroyOperationInterval();
      this.intervalOperationId = data.intervalId;
    });    

  }

  public clear() {
    this.vibrate(50);
    this.userLogged.answer = "";
  }

  public start() {
    this.socketConnectProvider.socket.emit("users-started", true);      
    this.createGame();
  }

  public createGame() {
    setTimeout(() => {
      this.encapsulateOperations();
    }, this.counter * 1000);
  }

  private encapsulateOperations() {
    this.createQuestion(this.defaultOperation);
    this.createOperarioWithInterval();
  }

  private createOperarioWithInterval() {
    // this.cronometer(10);
    const intervalId = setInterval(() => {
      this.createQuestion(this.defaultOperation);
    }, 10000);

    this.socketConnectProvider.emit("interval-id", intervalId);
  }

  private createQuestion(operation: Operation) {
    let question: OperationQuestion = new OperationQuestion();
    const operationQuestion: Question = question.createOperation(operation);
    this.socketConnectProvider.emit("operation-question", operationQuestion);
  }

  public checkResult(answerUser: string) {

    this.vibrate(50);
    
    this.userLogged.answer += answerUser.toString();

    console.log(parseInt(this.userLogged.answer) , this.operationQuestion.answer)

    if(parseInt(this.userLogged.answer) == this.operationQuestion.answer) {
      this.presentToast(this.userLogged.answer + ' é a resposta Correta. Parabéns!');
      this.addScore();
      this.clear();
      this.encapsulateOperations();
    }
  }

  private addScore() {
    this.score += parseInt(this.userLogged.answer);
  }

  private destroyOperationInterval() {
    if(this.intervalOperationId != null) {
      console.log('Destruindo Id Intervalo')
      clearInterval(this.intervalOperationId);
    }
  }

  private decreaseCounter() {
    var idinterval = setInterval(() => {
      this.counter--;
      if(this.counter == 0) {
        clearInterval(idinterval);
        this.gameStarted = true;
      }
    }, 1000);    
  }

  private cronometer(time: number ) {
    

    var idinterval = setInterval(() => {
      this.cronometerCount--;
      if(this.cronometerCount == 0) {
        clearInterval(idinterval);
        this.gameOver();
        this.cronometerCount = 10;
      }
    }, 1000); 
  }

  private gameOver() {
    console.log("Game over");
  }

  private vibrate(time: number) {
    if(this.isAppMobile()) {
      this.vibration.vibrate(time);
    }
  }

  async presentToast(message: string, position: string = 'top') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: position,
      cssClass: 'toast-custom'
    });
    toast.present();
  }


  private isAppMobile() : boolean {
    if(this.platform.is('core') || this.platform.is('mobileweb'))
      return false;
    
    return true;
  }

  ionViewWillUnload() {
    this.socketConnectProvider.disconnect();
  }

}
