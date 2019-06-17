import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SocketConnectProvider {

  constructor(public socket: Socket) {
    socket.connect();
  }

  public disconnect() {
    this.socket.removeAllListeners();
    this.socket.disconnect();
  }

  public emit(event: string, obj: any){
    console.log(event, obj);
    this.socket.emit(event, obj);
  }

  public getUsers(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket.on("users-changed", data => {
        observer.next(data)
      });
    });
    return observable;
  }

  public getStartGame(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket.on("users-started", data => {
        observer.next(data)
      });
    });
    return observable;
  }

  public getOperationQuestion(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket.on("operation-question-changed", (data) => {
        observer.next(data)
      });
    });
    return observable;
  }

  public getIntervalId(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket.on("interval-id-changed", (data) => {
        observer.next(data)
      });
    });
    return observable;
  }

}
