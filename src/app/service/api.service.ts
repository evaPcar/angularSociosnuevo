import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { 

  }

  postlistaSocios(data : any){
    return this.http.post<any>("http://localhost:3000/listaSocios/", data);

  }
  getlistaSocios(){
    return this.http.get<any>("http://localhost:3000/listaSocios/");
  }
  putSocio(data:any, id:number){
    return this.http.put<any>("http://localhost:3000/listaSocios/"+id, data);
  }

  deleteSocio(id:number){
    return this.http.delete<any>("http://localhost:3000/listaSocios/"+id);
  }
  
}
