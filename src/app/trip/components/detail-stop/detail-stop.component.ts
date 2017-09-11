import { AfterViewChecked, Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Stop } from '../../../shared/models/stop.model';

@Component({
  selector: 'app-detail-stop',
  templateUrl: './detail-stop.component.html',
  styleUrls: ['./detail-stop.component.scss']
})
export class DetailStopComponent implements OnInit, AfterViewChecked {

  @Input() stop: Stop;
  @Input() lastStop: boolean = false;
  @Input() pickup: string;
  @Input() index: number;
  @ViewChild('stopElem') stopElem: ElementRef;
  private height: number;
  constructor() {}

  ngAfterViewChecked() {
    // this.height = this.stopElem.nativeElement.offsetHeight;
    // console.log(this.height);
  }

  ngOnInit() {}

}
