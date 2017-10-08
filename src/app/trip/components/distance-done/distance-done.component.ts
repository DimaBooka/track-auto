import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-distance-done',
  templateUrl: './distance-done.component.html',
  styleUrls: ['./distance-done.component.scss']
})
export class DistanceDoneComponent implements OnInit {

  @Input() estimation: number;
  @Input() finished: number;
  @Input() small: boolean;
  @Input() fullWidth: boolean = false;
  private _width: number;

  constructor() {}

  ngOnInit() {
    this._width = (100 * this.finished) / this.estimation;
  }

  public get width() {
    return this._width;
  }

}
