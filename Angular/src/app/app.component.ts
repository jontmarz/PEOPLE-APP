import { Component, OnInit, DoCheck } from '@angular/core';
import { faTrademark } from '@fortawesome/free-solid-svg-icons';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [UserService]
})
export class AppComponent {

  public title = 'People';
  public identity;
  public token;
  public url;
  public copyright = faTrademark;

  constructor(
    public _userService: UserService
  ) {
    this.loadUser();
  }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    this.loadUser();
  }

  loadUser() {
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }
}
