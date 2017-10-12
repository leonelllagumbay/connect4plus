import { ImOnline } from './../class/socket-message-model';
import { MessageFormatter } from './../class/message-formatter';
import { GameKonstant } from './../constant/game-constant';
import { Friend } from './../class/friend';
import { ISocket } from './../interface/isocket';
import { Injectable, OnInit } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ConnectFourService implements ISocket, OnInit {
  private my_id: string;
  private myOpponentId: string;
  private gameId: string;
  private turnId: string;
  private myTurnId: string;
  private playerName: string;
  onlineFriends: Friend[] = [];

  constructor(private _socket: Socket) { }

  ngOnInit() {
    this.gameId = '';
  }

  setMyOpponentId(val) {
    this.myOpponentId = val;
  }

  getMyOpponentId() {
    return this.myOpponentId;
  }

  setGameId(val): void {
    this.gameId = val;
  }

  getGameId(): string {
    return this.gameId;
  }

  setTurnId(val): void {
    this.turnId = val;
  }

  getTurnId(): string {
    return this.turnId;
  }

  setMyTurnId(val): void {
    this.myTurnId = val;
  }

  getMyTurnId(): string {
    return this.myTurnId;
  }

  getMyId(): string {
    return this.my_id;
  }

  setMyId(value): void {
    this.my_id = value;
  }

  setMyName(val) {
    this.playerName = val;
  }

  getMyName(): string {
    return this.playerName;
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
    if (this.getMyName() && data_stream.source_id) {
      const params = {
        command: 'im_online',
        source_id: this.getMyId(),
        destination_id: data_stream.source_id,
        name: this.getMyName()
      }
      const socketFormatter = new MessageFormatter<ImOnline>();
      const formattedStr = socketFormatter.formatSocketMessage(params);
      this.sendMessage(formattedStr);
    }
  }

  addOnlineFriend(data_stream) {
    console.log('your online girl');
    if (data_stream.source_id && this.doesNotExistSourceId(data_stream.source_id)) {
      if (this.getMyId()) { // you know that your online if this is defined
        this.onlineFriends.push(new Friend('Invite', 'btn-warning', data_stream.name, data_stream.source_id));
      }
    } else { // Update the name
      this.onlineFriends.map(friend => {
        if (friend.source_id === data_stream.source_id) {
          friend.name = data_stream.name;
          return friend;
        } else {
          return friend;
        }
      })
    }
  }

  doesNotExistSourceId(source_id) {
    for (const friend of this.onlineFriends) {
      if (friend.source_id === source_id) {
        return false;
      }
    }
    return true;
  }

  iQuit() {
    this.setGameId('');
    const params = {
      command: GameKonstant.get('quit'),
      source_id:  this.getMyId(),
      game_id: this.getGameId(),
      name: this.getMyName()
    }
    this.sendMessage(JSON.stringify(params));
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
