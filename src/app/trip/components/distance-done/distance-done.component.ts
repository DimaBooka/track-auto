import { Component, Input, OnInit } from '@angular/core';
import { SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-distance-done',
  templateUrl: './distance-done.component.html',
  styleUrls: ['./distance-done.component.scss']
})
export class DistanceDoneComponent implements OnInit {

  private _estimation: number;
  @Input() set estimation(value: number) {
    this._estimation = value;
  }
  get estimation() {
    return this._estimation;
  }

  private _finished: number;
  @Input() set finished(value: number) {
    console.log('set finished', value);
    this._finished = value;
    if (this._finished > this._estimation) {
        this._estimation = this._finished;
    }
    this.ngOnInit();
  }
  get finished() {
    return this._finished;
  }

  @Input() small: boolean;
  @Input() fullWidth: boolean = false;
  @Input() onWayToPickup: boolean = false;
  @Input() color: string = "#2ac169";
  private _width: number;

  constructor() {}

  ngOnInit() {
    this._width = (100 * this.finished) / this.estimation;
  }

  public get width() {
    return this._width;
  }

}
