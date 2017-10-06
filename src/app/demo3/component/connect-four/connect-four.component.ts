import { GameKonstant } from './../../constant/game-constant';
import { FriendsComponent } from './../friends/friends.component';
import { Friend } from './../../class/friend';
import { ToolbarComponent } from './../toolbar/toolbar.component';
import { ConnectFourService } from './../../service/connect-four.service';
import { Socket } from 'ng-socket-io';
import { MatrixTop } from './../../class/matrix-top';
import { Matrix } from './../../class/matrix';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/observable/interval';
import { PlayerEnum } from './../../enum/player-enum';

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
  styleUrls: ['./connect-four.component.scss']
})
export class ConnectFourComponent implements OnInit, OnDestroy {
  matrix: Matrix;
  matrixData: any;
  matrixTop: MatrixTop;
  matrixTopData: any;
  whosTurn: number;
  hasWinner: boolean;
  observableData: number;
  gameStatus: string;
  isMyTurn: boolean;
  isMeOnline: boolean;
  isMeBusy: boolean;
  isUdateFromOpponent = false;
  mouseDisabled = false;
  subscription: {
    unsubscribe();
  }
  @ViewChild(ToolbarComponent) toolbar: ToolbarComponent;
  @ViewChild(FriendsComponent) friend_comp: FriendsComponent;

  constructor(private _cs: ConnectFourService) {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
    console.log('player one', PlayerEnum.Player1);
    this.whosTurn = PlayerEnum.Player1;
    this.matrix = new Matrix();
    this.matrixTop = new MatrixTop();

    this.matrixData = this.matrix.matrix;
    this.matrixTopData = this.matrixTop.matrixTop;

    // this.matrixTopData[0][2] = this.whosTurn;
    // this.matrixTopData[0][6] = 2;

    // this.matrixData[0][0] = 1;
    // this.matrixData[6][5] = 2;
    // this.subscriptionObservable();

    // listen for incoming socket
    this.gameStatus = 'offline';

    this._cs.getMessage().subscribe(data => {
      this.processIncomingData(data);
    })

    this._cs.setDestinationId(Math.random().toString());

  }

  subscriptionObservable(take, selectedColumn) {
    this.subscription = this.getObservable(take, selectedColumn).subscribe((v) => {
      this.observableData = v;
    });
  }

  getObservable(take, selectedColumn) {
    return Observable
      .interval(150)
      .take(take)
      .map(v => {
        if (v !== 0 ) {
          this.matrixData[selectedColumn][v - 1] = 0;
        }
        this.matrixData[selectedColumn][v] = this.whosTurn;
        if (v === take - 1) {
          this.changeTurn(selectedColumn);
          this.tellTheWinner();
        }
        return v * v;
      })
  }

  playgroundMatrixHover(e) {

    if (localStorage.getItem('turn') !== this._cs.getDestinationId()) {
      return; // do nothing it's not your turn yet
    }

    this.resetTop();
    this.matrixTopData[0][e] = this.whosTurn;

    // Cant hover when its not your move
    const params = {
      command: GameKonstant.get('hover_update'),
      source_id:  this._cs.getDestinationId(),
      destination_id: localStorage.getItem('opponent_id'),
      name: localStorage.getItem('your_name'),
      whos_turn: this.whosTurn,
      selected_column: e
    }
    this._cs.sendMessage(JSON.stringify(params));
  }

  playgroundMatrixClicked(e) {
    // Can you click
    if (this.mouseDisabled === true) {
      return;
    }

    this.mouseDisabled = true;
    if (localStorage.getItem('turn') !== this._cs.getDestinationId()) {
      return; // do nothing it's not your turn yet
    }

    if (!this.hasWinner) {
      this.dropLikeASpaceShip(e);
      // for (let a = this.matrixData.length - 1; a >= 0; a--) {
      //   if (this.matrixData[e][a] === 0) {
      //     this.matrixData[e][a] = this.whosTurn;
      //     break;
      //   }
      // }
      // this.changeTurn();
    }
  }

  resetTop() {
    for (let a = 0; a < this.matrixTopData[0].length; a++) {
      this.matrixTopData[0][a] = 0;
    }
  }

  changeTurn(e) {
    if (this.whosTurn === PlayerEnum.Player1) {
      this.whosTurn = PlayerEnum.Player2;
    } else {
      this.whosTurn = PlayerEnum.Player1;
    }

    if (!this.isUdateFromOpponent) {
      if (localStorage.getItem('opponent_id')) {
        const params = {
          command: GameKonstant.get('click_update'),
          source_id:  this._cs.getDestinationId(),
          destination_id: localStorage.getItem('opponent_id'),
          name: localStorage.getItem('your_name'),
          whos_turn: this.whosTurn,
          selected_column: e
        }
        this._cs.sendMessage(JSON.stringify(params));
      }
      localStorage.setItem('turn', localStorage.getItem('opponent_id'));
      this.isUdateFromOpponent = false;
    } else {
      localStorage.setItem('turn', this._cs.getDestinationId());
      this.isUdateFromOpponent = false;
    }
    this.mouseDisabled = false;
  }

  dropLikeASpaceShip(e) {
    let take = 0;
    for (let a = 0; a < this.matrixData.length - 1; a++) {
      if (this.matrixData[e][a] === 0) {
        take += 1;
        continue;
      }
    }
    this.subscriptionObservable(take, e);
  }

  playAgain(e) {
    this.hasWinner = false;
    const new_matrix = new Matrix();
    this.matrixData = new_matrix.matrix; // reset all data matrix to zero

    const params = {
      command: GameKonstant.get('play_again'),
      source_id:  this._cs.getDestinationId(),
      destination_id: localStorage.getItem('opponent_id')
    }
    this._cs.sendMessage(JSON.stringify(params));
  }

  tellTheWinner() {
    const winner = this._cs.chkWinner(this.matrixData);
    console.log('winner', winner);
    if (winner === 0) {
      // do nothing
    } else if (winner === 1) {
      this.hasWinner = true;
      this.toolbar.open('1');
    } else if (winner === 2) {
      this.hasWinner = true;
      this.toolbar.open('2');
    }
  }

  processIncomingData(data) {
    console.log('Incoming messages', data);
    if (data !== 'Welcome bro!') {
      const data_stream = JSON.parse(data);
      console.log('data stream', data_stream);
      if (data_stream.command === GameKonstant.get('whos_online')) {
        this._cs.sayImOnline(data_stream);
      } else if (data_stream.command === GameKonstant.get('im_online')) {

      } else if (data_stream.command === GameKonstant.get('invite_friend')) {
        // TODO
      }  else if (data_stream.command === GameKonstant.get('accept_invite')) {
        // TODO
      } else if (data_stream.command === GameKonstant.get('hover_update')) {
        this.updateHover(data_stream);
      } else if (data_stream.command === GameKonstant.get('click_update')) {
        this.updateClick(data_stream);
      } else if (data_stream.command === GameKonstant.get('play_again')) {
        this.replay(data_stream);
      } else if (data_stream.command === GameKonstant.get('quit')) {
        // TODO
      } else {
        // Ignore anything
      }
    }
  }

  updateHover(data_stream) {
    if (this._cs.getDestinationId() === data_stream.destination_id) { // This is for me
      this.resetTop();
      this.matrixTopData[0][data_stream.selected_column] = this.whosTurn;
    }
  }

  updateClick(data_stream) {
    if (data_stream.destination_id === this._cs.getDestinationId()) { // Make sure its for the desired destination
      this.isUdateFromOpponent = true;
      localStorage.setItem('opponent_id', data_stream.source_id);
      if (!this.hasWinner) {
        this.dropLikeASpaceShip(data_stream.selected_column);
      }
    }
  }

  replay(data_stream) {
    this.hasWinner = false;
    const new_matrix = new Matrix();
    this.matrixData = new_matrix.matrix;
  }

}
