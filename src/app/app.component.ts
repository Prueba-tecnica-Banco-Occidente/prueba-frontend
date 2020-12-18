import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatTableDataSource } from '@angular/material/table'; 
import {MatDialog} from '@angular/material/dialog';
import { ProductoDetalleComponent } from './modals/producto-detalle/producto-detalle.component';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit{
  title = 'prueba-frontend';
  displayedColumns: string[] = ['nombre', 'descripcion', 'categoria', 'precio','cantidad','options'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loader: boolean

  constructor(
    public dialog: MatDialog,
    private _appService:AppService
    ){
    this.loader = false;
    this.obtenerProductos();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  openDialogProductDetail(opt:any, _id?:any) {
    const dialogRef = this.dialog.open(ProductoDetalleComponent, {
      width: '50em',
      data: { opt: opt, idProducto:_id }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.obtenerProductos();
    });
  }

  obtenerProductos(){
    this._appService.getProductos()
    .subscribe(
      (respuestaProductos:any)=>{
        console.log(respuestaProductos);
        this.dataSource = new MatTableDataSource<any>(respuestaProductos.productos);
      },err=>{
        console.log(err);
      }
    )
  }

  eliminarProductos(id:any){
    this._appService.removeProducto(id)
    .subscribe(
      (respuestaProductos:any)=>{
        console.log(respuestaProductos);
        this.obtenerProductos();
      },err=>{
        console.log(err);
      }
    )
  }

}

