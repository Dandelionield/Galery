import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureUpdateFormPage } from './picture-update-form.page';

const routes: Routes = [
  {
    path: '',
    component: PictureUpdateFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PictureUpdateFormPageRoutingModule {}
