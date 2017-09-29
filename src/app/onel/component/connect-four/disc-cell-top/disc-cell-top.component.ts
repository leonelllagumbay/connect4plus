import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-disc-cell-top',
  templateUrl: './disc-cell-top.component.html',
  styleUrls: ['./disc-cell-top.component.scss']
})
export class DiscCellTopComponent implements OnInit {
  @Input() discInfo: number;
  constructor() { }

  ngOnInit() {
    console.log('disc Info', this.discInfo);
  }

}
