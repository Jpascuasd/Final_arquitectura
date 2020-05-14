import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FleastoreSharedModule } from 'app/shared/shared.module';
import { ProvedorComponent } from './provedor.component';
import { ProvedorDetailComponent } from './provedor-detail.component';
import { ProvedorUpdateComponent } from './provedor-update.component';
import { ProvedorDeleteDialogComponent } from './provedor-delete-dialog.component';
import { provedorRoute } from './provedor.route';

@NgModule({
  imports: [FleastoreSharedModule, RouterModule.forChild(provedorRoute)],
  declarations: [ProvedorComponent, ProvedorDetailComponent, ProvedorUpdateComponent, ProvedorDeleteDialogComponent],
  entryComponents: [ProvedorDeleteDialogComponent]
})
export class FleastoreProvedorModule {}
