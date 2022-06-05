import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../service/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { identifierName } from '@angular/compiler';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.components.css']
})
export class DialogClass implements OnInit {

  sociosForm!: FormGroup;
  actionbtn: string = 'chevron_right';
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DialogClass>) { }

  ngOnInit(): void {
    this.sociosForm = this.formBuilder.group({
      nombre: ["", [Validators.required, Validators.minLength(3)]],
      apellido: ["", [Validators.required, Validators.minLength(3)]],
      dni: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      telefono: ["", [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      sexo: ["", Validators.required],
      id : ["", Validators.required],
    });



    if (this.editData) {
      this.actionbtn = "check";
      this.sociosForm.controls['nombre'].setValue(this.editData.nombre);
      this.sociosForm.controls['apellido'].setValue(this.editData.apellido);
      this.sociosForm.controls['dni'].setValue(this.editData.dni);
      this.sociosForm.controls['telefono'].setValue(this.editData.telefono);
      this.sociosForm.controls['sexo'].setValue(this.editData.sexo);
      this.sociosForm.controls['id'].setValue(this.editData.id);

    }
    
   
  }

  sololectura(){
    var a = this.actionbtn;
    var b ='check'
    
    if(a == b){
      this.alertasociobloqueado();
    } else {

    }
  }
  


  addsocios() {
    if (!this.editData) {
      if (this.sociosForm.valid) {
        this.api.postlistaSocios(this.sociosForm.value)
          .subscribe({
            next: (res) => {
              this.alerta();
              this.sociosForm.reset();
              this.dialogRef.close('chevron_right');
              window.location.reload();

            },
            error: () => {
              alert("Error al rellenar los")
            }
          })

      }
    } else {
      this.arreglarSocio()
    }
  }


  arreglarSocio() {
    this.api.putSocio(this.sociosForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          
          this.alertaeditar();
          this.sociosForm.reset();
          this.dialogRef.close('check')

        },
        error: () => {
          alert("Error al rellenar los")
        }
      })
  }

  alerta() {
    this._snackBar.open("Socio añadido correctamente", "", {
      duration: 6000,
      horizontalPosition: 'center',
      verticalPosition: 'top',

    })
  }

  alertaeditar() {
    this._snackBar.open("Socio editado correctamente", "", {
      duration: 6000,
      horizontalPosition: 'center',
      verticalPosition: 'top',

    })
  }

  alertasociobloqueado(){
    this._snackBar.open("Como cliente no puede editar el número de socio", "", {
      duration: 6000,
      horizontalPosition: 'center',
      verticalPosition: 'top',

    })
  }
}
