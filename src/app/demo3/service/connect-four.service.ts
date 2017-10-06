import { ISocket } from './../interface/isocket';
import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ConnectFourService implements ISocket {
  public destination_id: string;
  constructor(private _socket: Socket) { }

  getDestinationId(): string {
    return localStorage.getItem('player_id');
  }

  setDestinationId(value): void {
    if (!localStorage.getItem('player_id')) {
        this.destination_id = value;
        localStorage.setItem('player_id', value);
    }
  }

  sendMessage(msg: string): void {
    console.log('Message to send is',  msg);
    this._socket.emit('msg', msg);
    this._socket.on('connect', () => {
      console.log('socket connected');
    });
  }

  getMessage() {
    return this._socket
               .fromEvent<any>('msg')
               .map( data => {
                 return data['msg'];
                } );
  }

  closeSocketConnection() {
    this._socket.disconnect();
  }



  sayImOnline(data_stream) {
    console.log('say im online');
    if (localStorage.getItem('your_name') && data_stream.source_id) {
      const params = {
        command: 'im_online',
        name: localStorage.getItem('your_name'),
        source_id: this.getDestinationId(),
        destination_id: data_stream.source_id
      }
      this.sendMessage(JSON.stringify(params));
    }
  }


  chkLine(a, b, c, d) {
    // Check first cell non-zero and all cells match
    return ((a !== 0) && (a === b) && (a === c) && (a === d));
  }

  chkWinner(bd: any) { // Found here: https://stackoverflow.com/questions/15457796/four-in-a-row-logic/15457826#15457826
  let new_row = [];
    for (let col = 0; col < bd[0].length; col++) {
      let new_col = [];
      for (let row = 0; row < bd.length; row++) {
      new_col.push(bd[row][col]);
      }
    new_row.push(new_col);
    }

    bd = new_row;

    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 7; c++) {
            if (this.chkLine(bd[r][c], bd[r + 1][c], bd[r + 2][c], bd[r + 3][c])) {
                return bd[r][c];
            }
        }
    }
    // Check right
    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (this.chkLine(bd[r][c], bd[r][c + 1], bd[r][c + 2], bd[r][c + 3])) {
                return bd[r][c];
            }
        }
    }
    // Check down-right
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 4; c++) {
            if (this.chkLine(bd[r][c], bd[r + 1][c + 1], bd[r + 2][c + 2], bd[r + 3][c + 3])) {
                return bd[r][c];
            }
        }
    }
    // Check down-left
    for (let r = 3; r < 6; r++) {
        for (let c = 0; c < 4; c++) {
            if (this.chkLine(bd[r][c], bd[r - 1][c + 1], bd[r - 2][c + 2], bd[r - 3][c + 3])) {
                return bd[r][c];
            }
        }
    }
    return 0;
  }

}
