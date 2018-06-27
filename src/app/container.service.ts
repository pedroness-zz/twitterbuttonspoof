import { Injectable } from '@angular/core'
import {Headers,Http} from '@angular/http'

@Injectable({
  providedIn: 'root'
})
export class ContainerService {
    constructor(private http:Http){}
    getContainers(){
        const headers = new Headers({});
    //    return this.http.get('http://localhost:8023/?mode=tickers',{headers:headers});
        return this.http.get('/json/containers.json?'+Date.now(),{headers:headers});
     }

     getContainerLogs(container){
        const headers = new Headers({});
     //   return this.http.get('http://localhost:8023/?mode=marketcap',{headers:headers});
        return this.http.get('/json/'+container+'/logs.json?'+Date.now(),{headers:headers});
     }

}

