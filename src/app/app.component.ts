import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { DialogClass } from './dialog/dialog.class';
import { ApiService } from './service/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  displayedColumns: string[] = ['nombre', 'apellido', 'nsocio','dni', 'telefono', 'sexo', 'acciones'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  title = 'proyectofinal';
  constructor(private dialog: MatDialog, private api : ApiService,private _snackBar: MatSnackBar,) {

  }
  ngOnInit(): void {
    this.getAllSocios();
  }
  openDialog() {
    this.dialog.open(DialogClass, {
      width:'30%'
    });
  }

  getAllSocios(){
    this.api.getlistaSocios()
    .subscribe({
      next:(res)=> {
       this.dataSource = new MatTableDataSource(res);
       this.dataSource.paginator = this.paginator;
       this.dataSource.sort=this.sort;

      },
      error:(err)=>{
        alert("error")
      }
    })
  }
  editSocio(row : any){
    this.dialog.open(DialogClass,{
      width:'30%' ,
      data:row 
    }).afterClosed().subscribe(val=>{
      if(val==='check'){
        this.getAllSocios();
      }
    })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteSocios(id:number){
    this.api.deleteSocio(id)
    .subscribe({
      next:(res)=>{
        this.alertaborrar();
        this.getAllSocios();
      },
      error:()=>{
        alert("error al efectuar el borrado")
      }
    })
  }

  alertaborrar(){
    this._snackBar.open("Socio borrado correctamente", "", {
      duration:6000,
      horizontalPosition:'center',
      verticalPosition:'top',
  
    })
  }
}


