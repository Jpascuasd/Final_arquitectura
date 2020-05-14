import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FleastoreSharedModule } from 'app/shared/shared.module';
import { DetalleFacturaComponent } from './detalle-factura.component';
import { DetalleFacturaDetailComponent } from './detalle-factura-detail.component';
import { DetalleFacturaUpdateComponent } from './detalle-factura-update.component';
import { DetalleFacturaDeleteDialogComponent } from './detalle-factura-delete-dialog.component';
import { detalleFacturaRoute } from './detalle-factura.route';

@NgModule({
  imports: [FleastoreSharedModule, RouterModule.forChild(detalleFacturaRoute)],
  declarations: [
    DetalleFacturaComponent,
    DetalleFacturaDetailComponent,
    DetalleFacturaUpdateComponent,
    DetalleFacturaDeleteDialogComponent
  ],
  entryComponents: [DetalleFacturaDeleteDialogComponent]
})
export class FleastoreDetalleFacturaModule {}
