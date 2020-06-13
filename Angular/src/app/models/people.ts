import { DocType } from './doc-type.enum';
export class People {
  constructor(
    public id: number,
    public user_id: number,
    public name: string,
    public surname: string,
    public docType: DocType,
    public serie: string,
    public email: string,
    public phone: number,
    public address: string,
    public meet: string,
  ){}
}
