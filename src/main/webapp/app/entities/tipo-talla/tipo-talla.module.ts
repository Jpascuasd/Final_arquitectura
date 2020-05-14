import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FleastoreSharedModule } from 'app/shared/shared.module';
import { TipoTallaComponent } from './tipo-talla.component';
import { TipoTallaDetailComponent } from './tipo-talla-detail.component';
import { TipoTallaUpdateComponent } from './tipo-talla-update.component';
import { TipoTallaDeleteDialogComponent } from './tipo-talla-delete-dialog.component';
import { tipoTallaRoute } from './tipo-talla.route';

@NgModule({
  imports: [FleastoreSharedModule, RouterModule.forChild(tipoTallaRoute)],
  declarations: [TipoTallaComponent, TipoTallaDetailComponent, TipoTallaUpdateComponent, TipoTallaDeleteDialogComponent],
  entryComponents: [TipoTallaDeleteDialogComponent]
})
export class FleastoreTipoTallaModule {}
