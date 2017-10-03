import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ChatServiceService {

  constructor(private socket: Socket) { }


  sendMessage(msg: string) {
    console.log('message sent is ',  msg);
    this.socket.emit('msg', msg);
    this.socket.on('connect', () => {
      console.log('socket connected');
    });
    // this.socket.on('msg', (data) => {
    //   console.log('on msg data is ', data);
    // });
  }

  getMessage() {
    return this.socket
               .fromEvent<any>('msg')
               .map( data => {
                 console.log('data is ', data);
                 return data['msg'];
                } );
  }

  close() {
    this.socket.disconnect();
  }
}
