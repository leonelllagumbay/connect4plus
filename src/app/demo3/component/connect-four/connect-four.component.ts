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
  isUdateFromOpponent = false;
  mouseDisabled = false;

  private opponentIsUpdating: boolean;

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

    this._cs.getMessage().subscribe(data => {
      this.processIncomingData(data);
    })

    this._cs.setMyId(Math.random().toString());

    this.opponentIsUpdating = false;
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
    if (this._cs.getGameId()) {
      if (this._cs.getTurnId() === this._cs.getMyTurnId()) {
        return; // do nothing it's not your turn yet
      }
      this.resetTop();
      this.matrixTopData[0][e] = this.whosTurn;
      // Cant hover when its not your move
      const params = {
        command: GameKonstant.get('hover_update'),
        source_id:  this._cs.getMyId(),
        name: this._cs.getMyName(),
        game_id: this._cs.getGameId(),
        turn_id: this._cs.getTurnId(),
        selected_column: e
      }
      this._cs.sendMessage(JSON.stringify(params));
    } else {
      this.resetTop();
      this.matrixTopData[0][e] = this.whosTurn;
    }
  }

  playgroundMatrixClicked(e) {
    // Can you click

    if (this._cs.getGameId()) {
      if (this.mouseDisabled === true) {
        return;
      }

      this.mouseDisabled = true;
      if (this._cs.getTurnId() === this._cs.getMyTurnId()) {
        return; // do nothing it's not your turn yet
      }

      if (!this.hasWinner) {
        this.dropLikeASpaceShip(e);
      }
    } else {
      if (this.mouseDisabled === true) {
        return;
      }
      this.mouseDisabled = true;

      if (!this.hasWinner) {
        this.dropLikeASpaceShip(e);
      }
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

    if (this._cs.getGameId()) {
      if (this.opponentIsUpdating) {
        this.opponentIsUpdating = false;
        // do not change the update its the opponent's move
      } else {
        this._cs.setMyTurnId(this._cs.getTurnId());
        const params = {
          command: GameKonstant.get('click_update'),
          source_id:  this._cs.getMyId(),
          name: this._cs.getMyName(),
          game_id: this._cs.getGameId(),
          turn_id: 'turn' + Math.random().toString(),
          whos_turn: this.whosTurn,
          selected_column: e
        }
        this._cs.sendMessage(JSON.stringify(params));
      }
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
      source_id:  this._cs.getMyId(),
      game_id: this._cs.getGameId(),
      name: this._cs.getMyName()
    }
    this._cs.sendMessage(JSON.stringify(params));
  }

  tellTheWinner() {
    const winner = this._cs.chkWinner(this.matrixData);
    console.log('winner', winner);
    if (winner === 0) {
      // do nothing
    } else  {
      this.hasWinner = true;
      if (this._cs.getGameId()) {
        if (this._cs.getMyTurnId() !== this._cs.getTurnId()) {
          this.toolbar.open('You loose!');
        } else {
          this.toolbar.open('You win!');
        }
      } else {
        this.toolbar.open('Player ' + winner + ' wins!');
      }
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
        this._cs.addOnlineFriend(data_stream);
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
        this.quitCleanUp(data_stream);
      } else {
        // Ignore anything
      }
    }
  }

  updateHover(data_stream) {
    if (this._cs.getGameId() === data_stream.game_id) { // This is for me
      this.resetTop();
      this.matrixTopData[0][data_stream.selected_column] = this.whosTurn;
    }
  }

  updateClick(data_stream) {
    if (this._cs.getGameId() === data_stream.game_id) { // Make sure its for the desired destination
        this.opponentIsUpdating = true;
        this._cs.setTurnId(data_stream.turn_id);
        this._cs.setMyTurnId('turn' + Math.random().toString());

      if (!this.hasWinner) {
        this.dropLikeASpaceShip(data_stream.selected_column);
      }
    }
  }

  replay(data_stream) {
    if (this._cs.getGameId() === data_stream.game_id) {
      this.hasWinner = false;
      const new_matrix = new Matrix();
      this.matrixData = new_matrix.matrix;
    }
  }

  quitCleanUp(data_stream) {
    if (this._cs.getGameId() === data_stream.game_id) {
      this.hasWinner = false;
      this._cs.setGameId('');
      const new_matrix = new Matrix();
      this.matrixData = new_matrix.matrix;
    }
  }

}
