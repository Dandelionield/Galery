import { NgModule } from '@angular/core';
import { PictureInsertFormPageRoutingModule } from './picture-insert-form-routing.module';
import { PictureInsertFormPage } from './picture-insert-form.page';

import { SharedModule } from '@shared/shared.module';

@NgModule({

	imports: [

		SharedModule,
		PictureInsertFormPageRoutingModule

	], declarations: [PictureInsertFormPage]

}) export class PictureInsertFormPageModule {}
