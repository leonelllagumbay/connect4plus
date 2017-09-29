import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-disc-cell',
  templateUrl: './disc-cell.component.html',
  styleUrls: ['./disc-cell.component.scss']
})
export class DiscCellComponent implements OnInit {
  @Input() cellData: any;
  constructor() { }

  ngOnInit() {
    console.log('cell data', this.cellData);
  }

}
