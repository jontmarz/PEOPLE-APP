import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {

  public page_title: string;
  public user: User;
  public status: string;

  constructor(
    private _userService: UserService
  ) {
    this.page_title = 'Formulario de Registro';
    this.user = new User(1, '', '', '');
  }

  ngOnInit() {
  }

  onSubmit(form) {
    this._userService.register(this.user).subscribe(
      response => {
        if (response.status === 'success') {
          this.status = response.status;
          form.reset();
        } else {
          this.status = 'error';
        }
      }, error => {
        console.log(error as any);
        this.status = 'error';
      }
    );
  }
}
