import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-playground-matrix',
  templateUrl: './playground-matrix.component.html',
  styleUrls: ['./playground-matrix.component.scss']
})
export class PlaygroundMatrixComponent implements OnInit {
  @Input() matrixInfo: any;
  @Output() matrixColumnEmitter = new EventEmitter<number>();
  @Output() matrixClickEmitter = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
    console.log('playground matrix', this.matrixInfo)
  }

  matrixMouseOver(e) {
    this.matrixColumnEmitter.emit(e);
  }

  matrixColumnClick(e) {
    this.matrixClickEmitter.emit(e);
  }

}
