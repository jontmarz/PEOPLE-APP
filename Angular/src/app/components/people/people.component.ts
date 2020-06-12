import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PeopleService } from '../../services/people.service';
import { People } from '../../models/people';
import { Global } from 'src/app/services/global';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons';
import { faUserMinus } from '@fortawesome/free-solid-svg-icons';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  providers: [PeopleService, UserService]
})
export class PeopleComponent implements OnInit {

  public page_title: string;
  public userEdit = faUserEdit;
  public UserDelete = faUserMinus;
  public userNew = faAddressCard;
  public exportData = faFileExport;
  public url;
  public people: Array<People>;
  public identity;
  public token;

  constructor(
    private _peopleService: PeopleService,
    private _userService: UserService
  ) {
    this.page_title = 'Listado de Personas';
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople() {
    this._peopleService.getPerson().subscribe (
      response => {
        if (response.status === 'success') {
          this.people = response.Person;
          console.log(response.Person);
        }
      }, error => {
        console.log(error);
      }
    );
  }

  deletePerson(id) {
    this._peopleService.delete(this.token, id).subscribe(
      response => {
        this.getPeople();
      }, error => {
        console.log(error);
      }
    );
  }
}
