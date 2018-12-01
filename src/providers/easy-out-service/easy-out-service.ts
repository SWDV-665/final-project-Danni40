//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map, catchError } from 'rxjs/operators';
import { Subject } from 'rxjs';

/*
  Generated class for the EasyOutServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EasyOutServiceProvider {

  items: any = [];

  dataChanged$ : Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  baseURL = "http://localhost:8080";

  constructor(public http: HttpClient) {
    //constructor() {  
      console.log('Hello EasyOutServiceProvider Provider');
      this.dataChangeSubject = new Subject<boolean>();
      this.dataChanged$ = this.dataChangeSubject.asObservable();
    }
    
    getItems(): Observable<object[]> {
      return this.http.get(this.baseURL + '/api/easy-out').pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
    }


    private extractData(res: Response){
      let body = res;
      return body || {};
    }
  
    private handleError(error: Response | any){
      let errMsg : string;
      if(error instanceof Response){
        const err = error || '';
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }else{
        errMsg = error.message ? error.message : error.toString();
      }
      console.error(errMsg);
      return Observable.throw(errMsg);
    }


    removeItem(item){
      this.http.delete(this.baseURL+'/api/easy-out/'+item._id).subscribe(res => {
      this.items = res;
      this.dataChangeSubject.next(true);
    });
    }

    addItem(item){
      this.http.post(this.baseURL+'/api/easy-out/', item).subscribe(res => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
    }

    editItem(item, index){
      this.http.put(this.baseURL+'/api/easy-out/'+item._id, item).subscribe(res => {
        this.items = res;
        this.dataChangeSubject.next(true);
      });
    }

}
