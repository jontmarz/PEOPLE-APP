import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../../services/user.service';
import { PeopleService } from '../../services/people.service';
import { People } from '../../models/people';
import { Global } from '../../services/global';
import { DocType } from '../../models/doc-type.enum';
@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.scss'],
  providers: [UserService, PeopleService]
})
export class NewPersonComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public people;
  public url;
  public status;
  public is_edit: boolean;
  public numPattern: string;
  public strPattern: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _peopleService: PeopleService,
  ) {
    this.page_title = 'Ingresar nueva persona';
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.is_edit = false;
    this.numPattern = '[0-9]{6,11}$';
    this.strPattern = '[a-zA-Z0-9]{6,11}$';
  }

  types: any[] = [];

  ngOnInit() {
    this.people = new People(1, this.identity.sub, '', '', DocType.CC, '', '', null, '', null);

    for (const item in DocType) {
      if (isNaN(Number(item))) {
        this.types.push({text: item, value: DocType[item]});
      }
    }
  }

  onSubmit(form) {
    // console.log(this.people);
    this._peopleService.create(this.token, this.people).subscribe(
      response => {
        if (response.status === 'success') {
            this.people = response.Person;
            this.status = 'success';

            this._router.navigate(['/dashboard']);
        } else {
          this.status = 'error';
        }
      }, error => {
        console.log(error);
        this.status = 'error';
      }
    );
  }

  refresh() {
    window.location.reload();
    this.people = new People(1, this.identity.sub, '', '', DocType.CC, '', '', null, '', null);
  }
}
