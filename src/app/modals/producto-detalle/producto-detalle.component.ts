import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';
import { Producto } from 'src/app/share/models/app.producto.model';

@Component({
  selector: 'app-producto-detalle',
  templateUrl: './producto-detalle.component.html',
  styleUrls: ['./producto-detalle.component.scss']
})
export class ProductoDetalleComponent implements OnInit {

  title: string;
  opt!: number;
  form!: FormGroup;
  idProducto!:string;

  loader: boolean

  

  constructor(
    private dialogRef: MatDialogRef<ProductoDetalleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {opt: any,idProducto:any},
    private fb:FormBuilder,
    private _appService:AppService
    ) { 
    this.title = '';
    this.loader = false;
    this.idProducto = this.data.idProducto;
  }

  ngOnInit(): void {
    this.opt = this.data.opt;
    this.title = this.data.opt != null && this.data.opt == 0 ? 'Crear Producto' : this.data.opt != null && this.data.opt == 1 ? 'Ver producto' : 'Editar producto';
    this.createForm();
    console.log(this.data);
    
    if(this.idProducto){
      this.obtenerProducto(this.idProducto);
    }
  }

  createForm(){
    let disabled = this.opt != 0 && this.opt != 2 ? true : false;
    this.form = this.fb.group({
      'nombre': [{value: '', disabled: disabled}, Validators.required],
      'descripcion': [{value: '', disabled: disabled}, Validators.required],
      'categoria': [{value: '', disabled: disabled}, Validators.required],
      'precio': [{value: '', disabled: disabled}, Validators.required],
      'cantidad': [{value: '', disabled: disabled}, Validators.required]
    });
  }

  obtenerProducto(idProducto:string){
    this._appService.getProducto(idProducto)
    .subscribe(
      (respuestaProductos:any)=>{
        let producto = respuestaProductos.producto;
        console.log(respuestaProductos);
        this.form.controls['nombre'].setValue(producto.nombre);
        this.form.controls['descripcion'].setValue(producto.descripcion);
        this.form.controls['categoria'].setValue(producto.categoria);
        this.form.controls['precio'].setValue(producto.precio);
        this.form.controls['cantidad'].setValue(producto.cantidad);
      },err=>{
        console.log(err);
      }
    )
  }

  save(){
    console.log('save');
    console.log(this.form.controls);

    let producto = new Producto();
    producto._id = this.idProducto;
    producto.nombre = this.form.controls['nombre'].value;
    producto.descripcion = this.form.controls['descripcion'].value;
    producto.categoria = this.form.controls['categoria'].value;
    producto.precio = this.form.controls['precio'].value;
    producto.cantidad = this.form.controls['cantidad'].value;

    console.log(producto);
    this._appService.saveProducto(producto)
    .subscribe(
      (respuestaProductoSave:any)=>{
        console.log(respuestaProductoSave);
        this.dialogRef.close();
      },
      err=>{
        console.log(err);
      }
    )
  }

}
