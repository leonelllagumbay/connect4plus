import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-matrix-column',
  templateUrl: './matrix-column.component.html',
  styleUrls: ['./matrix-column.component.scss']
})
export class MatrixColumnComponent implements OnInit {
  @Input() columnMatrix: any;
  isActive: boolean;
  constructor() { }

  ngOnInit() {
    this.isActive = false;
    console.log('matrix column', this.columnMatrix);
  }

  matrixColumnHover(columnNumber) {
    this.isActive = true;
  }

  matrixColumnOut() {
    this.isActive = false;
  }
}
