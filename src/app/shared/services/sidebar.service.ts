import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class SidebarService {

  private _showSidebar: boolean = true;
  constructor() {}

  public get showSidebar() {
    return this._showSidebar;
  }

  public set showSidebar(showSidebar: boolean) {
    this._showSidebar = showSidebar;
  }
}
