import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'notificacion',
        loadChildren: () =>
          import('./notificacionesmicroservicio/notificacion/notificacion.module').then(
            m => m.NotificacionesmicroservicioNotificacionModule
          )
      },
      {
        path: 'factura',
        loadChildren: () => import('./factura/factura.module').then(m => m.FleastoreFacturaModule)
      },
      {
        path: 'detalle-factura',
        loadChildren: () => import('./detalle-factura/detalle-factura.module').then(m => m.FleastoreDetalleFacturaModule)
      },
      {
        path: 'abono',
        loadChildren: () => import('./abono/abono.module').then(m => m.FleastoreAbonoModule)
      },
      {
        path: 'movimiento',
        loadChildren: () => import('./movimiento/movimiento.module').then(m => m.FleastoreMovimientoModule)
      },
      {
        path: 'detalle-movimiento',
        loadChildren: () => import('./detalle-movimiento/detalle-movimiento.module').then(m => m.FleastoreDetalleMovimientoModule)
      },
      {
        path: 'producto',
        loadChildren: () => import('./inventariomicroservicio/producto/producto.module').then(m => m.InventariomicroservicioProductoModule)
      },
      {
        path: 'producto-categoria',
        loadChildren: () => import('./producto-categoria/producto-categoria.module').then(m => m.FleastoreProductoCategoriaModule)
      },
      {
        path: 'producto-detalle',
        loadChildren: () => import('./producto-detalle/producto-detalle.module').then(m => m.FleastoreProductoDetalleModule)
      },
      {
        path: 'lista',
        loadChildren: () => import('./lista/lista.module').then(m => m.FleastoreListaModule)
      },
      {
        path: 'marca',
        loadChildren: () => import('./marca/marca.module').then(m => m.FleastoreMarcaModule)
      },
      {
        path: 'talla',
        loadChildren: () => import('./talla/talla.module').then(m => m.FleastoreTallaModule)
      },
      {
        path: 'tipo-talla',
        loadChildren: () => import('./tipo-talla/tipo-talla.module').then(m => m.FleastoreTipoTallaModule)
      },
      {
        path: 'stock',
        loadChildren: () => import('./inventariomicroservicio/stock/stock.module').then(m => m.InventariomicroservicioStockModule)
      },
      {
        path: 'sucursal',
        loadChildren: () => import('./sucursal/sucursal.module').then(m => m.FleastoreSucursalModule)
      },
      {
        path: 'usuario',
        loadChildren: () => import('./usuario/usuario.module').then(m => m.FleastoreUsuarioModule)
      },
      {
        path: 'rol',
        loadChildren: () => import('./rol/rol.module').then(m => m.FleastoreRolModule)
      },
      {
        path: 'provedor',
        loadChildren: () => import('./provedor/provedor.module').then(m => m.FleastoreProvedorModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class FleastoreEntityModule {}
