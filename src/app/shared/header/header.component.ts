import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tabs } from '../models/tabs.enum';
import { TripsService } from '../services/TripsService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private tabs: any = Tabs;
  private currentTab: Tabs;
  @Output() tabChanged: EventEmitter<Tabs> = new EventEmitter<Tabs>();

  constructor(private _tripsService: TripsService) {
    this.currentTab = this._tripsService.currentTab;
  }

  changeTab(tab: Tabs) {
    if (tab !== this.currentTab) {
      this.currentTab = tab;
      this._tripsService.currentTab = tab;
      this.tabChanged.emit(tab);
      console.log('changed');
    }
  }

  ngOnInit() {
  }

}
