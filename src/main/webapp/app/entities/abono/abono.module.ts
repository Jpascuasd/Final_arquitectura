import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FleastoreSharedModule } from 'app/shared/shared.module';
import { AbonoComponent } from './abono.component';
import { AbonoDetailComponent } from './abono-detail.component';
import { AbonoUpdateComponent } from './abono-update.component';
import { AbonoDeleteDialogComponent } from './abono-delete-dialog.component';
import { abonoRoute } from './abono.route';

@NgModule({
  imports: [FleastoreSharedModule, RouterModule.forChild(abonoRoute)],
  declarations: [AbonoComponent, AbonoDetailComponent, AbonoUpdateComponent, AbonoDeleteDialogComponent],
  entryComponents: [AbonoDeleteDialogComponent]
})
export class FleastoreAbonoModule {}
