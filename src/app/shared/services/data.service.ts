import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";

@Injectable()
export class DataService {

  constructor(private http: Http) {}

  // Was used for a testing gmap. Deprecated!
  getFileData = (): Observable<Response> => {
    return this.http.get('assets/data/data.json').map(res => res.json());
  }
}
