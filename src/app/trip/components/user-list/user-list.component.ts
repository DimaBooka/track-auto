import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  @Output() setUsersList = new EventEmitter<string[]>();
  private users: string[] = [];
  private user: string;
  private showAddForm: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  removeUser(i) {
    this.users.splice(i, 1);
  }

  addUser() {
    this.users.push(this.user);
    this.setUsersList.emit(this.users);
    this.showAddForm = false;
    this.user = "";
  }

}
