import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { PeopleService } from '../../services/people.service';
import { People } from '../../models/people';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { Global } from 'src/app/services/global';
import { ExportCSVService } from '../../services/export-csv.service';
import { DocType } from '../../models/doc-type.enum';
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
  public person: People;
  public identity;
  public token;
  public status;
  public numPattern: string;
  public strPattern: string;

  constructor(
    private _peopleService: PeopleService,
    private _userService: UserService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _download: ExportCSVService
  ) {
    this.page_title = 'Listado de Personas';
    this.url = Global.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    this.numPattern = '[0-9]{6,11}$';
    this.strPattern = '[a-zA-Z0-9]{6,11}$';
  }

  types: any[] = [];

  ngOnInit() {
    this.getPeople();
    this.person = new People (1, this.identity.sub, '', '', DocType.CC, '', '', null, '', null);
    for (const item in DocType) {
      if (isNaN(Number(item))) {
        this.types.push({text: item, value: DocType[item]});
      }
    }
  }

  getPeople() {
    this._peopleService.getPerson().subscribe (
      response => {
        if (response.status === 'success') {
          this.people = response.Person;
          // console.log(response.Person);
        }
      }, error => {
        console.log(error);
      }
    );
  }

  getPerson() {
    this._route.params.subscribe(params => {
      const id = +params.id;
      this._peopleService.getPersonEdit(id).subscribe(
        response => {
          if (response.status === 'success') {
            this.person = response.Person;

            if (this.person.user_id !== this.identity.sub) {
              this._router.navigate(['/dashboard']);
            }
          }
        }, error =>{
          console.log(error);
          this._router.navigate(['/dashboard']);
        }
      )
    });
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

  download() {
    this._peopleService.getPerson().subscribe (
      response => {
        if (response.status === 'success') {
          this.people = response.Person;
          this._download.downloadFile(this.people, 'jsontocsv');
        }
      }, error => {
        console.log(error);
      }
    );
  }
}
