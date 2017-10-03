import { Socket } from 'ng-socket-io';
import { ChatServiceService } from './../../service/chat-service.service';
import { Observable } from 'rxjs/Observable';
import { MatrixTop } from './../../class/matrix-top';
import { Matrix } from './../../class/matrix';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/Rx';

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
  observableData: number;
  subscription: {
    unsubscribe();
  }

  constructor(private _ws: ChatServiceService) {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  ngOnInit() {
    this.whosTurn = 1;
    this.matrix = new Matrix();
    this.matrixTop = new MatrixTop();

    this.matrixData = this.matrix.matrix;
    this.matrixTopData = this.matrixTop.matrixTop;

    // this.matrixTopData[0][2] = this.whosTurn;
    // this.matrixTopData[0][6] = 2;

    // this.matrixData[0][0] = 1;
    // this.matrixData[6][5] = 2;
    console.log('data', this.matrixData, this.matrixTopData);
    // this.subscriptionObservable();
    console.log('_ws', this._ws);
    const obj = {
      name: 'Leonell',
      age: 28
    }
    this._ws.sendMessage(JSON.stringify(obj));
    this._ws.getMessage().subscribe(data => {
      console.log('Incoming message is', data);
    });
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
          this.changeTurn();
        }
        return v * v;
      })
  }

  playgroundMatrixHover(e) {
    this.resetTop();
    this.matrixTopData[0][e] = this.whosTurn;
  }

  playgroundMatrixClicked(e) {
    this._ws.sendMessage(JSON.stringify('drop like spaceship' + e));
    this.dropLikeASpaceShip(e);
    // for (let a = this.matrixData.length - 1; a >= 0; a--) {
    //   if (this.matrixData[e][a] === 0) {
    //     this.matrixData[e][a] = this.whosTurn;
    //     break;
    //   }
    // }
    // this.changeTurn();
  }

  resetTop() {
    for (let a = 0; a < this.matrixTopData[0].length; a++) {
      this.matrixTopData[0][a] = 0;
    }
  }

  changeTurn() {
    if (this.whosTurn === 1) {
      this.whosTurn = 2;
    } else {
      this.whosTurn = 1;
    }
  }

  dropLikeASpaceShip(e) {
    let take = 0;
    for (let a = 0; a < this.matrixData.length; a++) {
      if (this.matrixData[e][a] === 0) {
        take += 1;
        continue;
      }
    }
    this.subscriptionObservable(take, e);
  }

}
