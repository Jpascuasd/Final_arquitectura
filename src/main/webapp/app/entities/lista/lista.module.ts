import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FleastoreSharedModule } from 'app/shared/shared.module';
import { ListaComponent } from './lista.component';
import { ListaDetailComponent } from './lista-detail.component';
import { ListaUpdateComponent } from './lista-update.component';
import { ListaDeleteDialogComponent } from './lista-delete-dialog.component';
import { listaRoute } from './lista.route';

@NgModule({
  imports: [FleastoreSharedModule, RouterModule.forChild(listaRoute)],
  declarations: [ListaComponent, ListaDetailComponent, ListaUpdateComponent, ListaDeleteDialogComponent],
  entryComponents: [ListaDeleteDialogComponent]
})
export class FleastoreListaModule {}
