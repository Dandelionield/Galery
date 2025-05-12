import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PictureInsertFormPage } from './picture-insert-form.page';

const routes: Routes = [
  {
    path: '',
    component: PictureInsertFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PictureInsertFormPageRoutingModule {}
