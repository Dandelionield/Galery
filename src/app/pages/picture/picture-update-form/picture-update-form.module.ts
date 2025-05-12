import { NgModule } from '@angular/core';
import { PictureUpdateFormPageRoutingModule } from './picture-update-form-routing.module';
import { PictureUpdateFormPage } from './picture-update-form.page';

import { SharedModule } from '@shared/shared.module';

@NgModule({

	imports: [

		SharedModule,
		PictureUpdateFormPageRoutingModule

	], declarations: [PictureUpdateFormPage]

}) export class PictureUpdateFormPageModule {}