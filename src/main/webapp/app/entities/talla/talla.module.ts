import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FleastoreSharedModule } from 'app/shared/shared.module';
import { TallaComponent } from './talla.component';
import { TallaDetailComponent } from './talla-detail.component';
import { TallaUpdateComponent } from './talla-update.component';
import { TallaDeleteDialogComponent } from './talla-delete-dialog.component';
import { tallaRoute } from './talla.route';

@NgModule({
  imports: [FleastoreSharedModule, RouterModule.forChild(tallaRoute)],
  declarations: [TallaComponent, TallaDetailComponent, TallaUpdateComponent, TallaDeleteDialogComponent],
  entryComponents: [TallaDeleteDialogComponent]
})
export class FleastoreTallaModule {}
