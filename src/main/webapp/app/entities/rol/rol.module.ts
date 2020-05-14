import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FleastoreSharedModule } from 'app/shared/shared.module';
import { RolComponent } from './rol.component';
import { RolDetailComponent } from './rol-detail.component';
import { RolUpdateComponent } from './rol-update.component';
import { RolDeleteDialogComponent } from './rol-delete-dialog.component';
import { rolRoute } from './rol.route';

@NgModule({
  imports: [FleastoreSharedModule, RouterModule.forChild(rolRoute)],
  declarations: [RolComponent, RolDetailComponent, RolUpdateComponent, RolDeleteDialogComponent],
  entryComponents: [RolDeleteDialogComponent]
})
export class FleastoreRolModule {}
