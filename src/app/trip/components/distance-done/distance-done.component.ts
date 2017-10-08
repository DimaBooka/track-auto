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
    if (this._width < 1) {
      this._width = 50;
    }
    console.log(this._width);
  }

  public get width() {
    return this._width;
  }

}
