import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';
import 'rxjs/add/observable/throw';

export function HandleError (err) {
  let errMessage: string;

  if (err instanceof Response) {
    let body = err.json() || '';
    errMessage = body.error || JSON.stringify(body);
  } else {
    errMessage = err.message ? err.message : err.toString();
  }
  return Observable.throw(errMessage);
  // return Observable.throw(err.json().data || 'Server error');
}
