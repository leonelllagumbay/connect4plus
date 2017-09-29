import { Observable } from 'rxjs/Rx';
import { MatrixTop } from './../../../class/matrix-top';
import { Matrix } from './../../../class/matrix';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-connect-four',
  templateUrl: './connect-four.component.html',
  styleUrls: ['./connect-four.component.scss'],
  // encapsulation: ViewEncapsulation.Native, Emulated, None
})
export class ConnectFourComponent implements OnInit, OnDestroy {
  matrix: Matrix;
  matrixData: any;
  matrixTop: MatrixTop;
  matrixTopData: any;

  observableData: number;

  subscription: {
    unsubscribe();
  }

  whosTurn: number; // 1 or 2, for player 1 or player 2
  constructor() {
  }

  subscribeObservable(take, selectedColumn) {
    this.subscription = this.getObservable(take, selectedColumn).subscribe(v => this.observableData = v);
  }

  getObservable(take, selectedColumn) {
    return Observable
      .interval(200)
      .take(take)
      .map((v) => {
        console.log('v', v);
        if (v > 0) {
          this.matrixData[selectedColumn][v - 1] = 0;
        }
        this.matrixData[selectedColumn][v] = this.whosTurn;
        if (take === (v + 1)) {
          this.changeTurn();
        }
        return v * v;
      });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.matrix = new Matrix();
    this.matrixTop = new MatrixTop();
    this.matrixData = this.matrix.matrix;
    this.matrixTopData = this.matrixTop.matrixTop;

    this.whosTurn = 1; // Player one's turn

    // this.matrixTopData[0][1] = 1;
    // this.matrixTopData[0][3] = 2;
    // this.matrixData[0][0] = 1;
    // this.matrixData[0][3] = 2;
    console.log('matrix', this.matrix.matrix, this.matrixTop.matrixTop);
  }

  matrixMouseOver(e) {
    this.resetTop();
    this.matrixTopData[0][e] = this.whosTurn;
  }

  resetTop() {
    for (let a = 0; a < this.matrixTopData[0].length; a++) {
      this.matrixTopData[0][a] = 0;
    }
  }

  matrixClicked(e) {
    this.dropDiscSlowMo(e);
    // for (let a = this.matrixData.length - 1; a >= 0; a--) {
    //   Onif (this.matrixData[e][a] === 0) {
    //     this.matrixData[e][a] = this.whosTurn;
    //     break;
    //   } else {
    //     continue;
    //   }
    // }
    console.log('data matrix now', this.matrixData);
  }

  changeTurn() {
    if (this.whosTurn === 1) {
      this.whosTurn = 2;
    } else {
      this.whosTurn = 1;
    }
  }

  dropDiscSlowMo(e) {
    let take = 0;
    for (let a = 0; a < this.matrixData.length; a++) {
      if (this.matrixData[e][a] === 0) {
        take += 1;
        continue;
      } else {
        this.subscribeObservable(take, e);
        break;
      }
    }
  }
}
