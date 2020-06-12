import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faLock} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;
  public token;
  public identity;
  public login = faUserTie;
  public pass = faLock;

  constructor(
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.page_title = 'Identifícate';
    this.user = new User (1, '', '', '');
  }

  ngOnInit(): void {
    this.logout();
  }

  onSubmit(form) {
    console.log(this.user);
    this._userService.signup(this.user).subscribe(
      response => {
        if (response.status !== 'error') {
          this.status = 'success';
          this.token = response;

          this._userService.signup(this.user, true).subscribe(
            response => {
              this.identity = response;
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));

              this.redirectUrl();

            }, error => {
              this.status = 'error';
              console.log(error as any);
            }
          );
        } else {
          this.status = 'error';
        }

      }, error => {
        this.status = 'error';
        console.log(error as any);
      }
    );
  }

  logout() {
    this._route.params.subscribe(
      params => {
        const logout = +params['sure'];
        if (logout === 1) {
          localStorage.removeItem('identity');
          localStorage.removeItem('token');
          this.identity = null;
          this.token = null;
          this._router.navigate(['inicio']);
        }
      }
    );
  }

  redirectUrl() {
    this._router.navigate(['dashboard']);
  }
}
