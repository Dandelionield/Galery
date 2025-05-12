import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { LoadingComponent } from './components/loading/loading.component';
import { PictureFrameComponent } from './components/picture/picture-frame/picture-frame.component';

import { LoadingService } from './services/loading/loading.service';
import { SwalService } from './services/swal/swal.service';

@NgModule({

	declarations: [

		HeaderComponent,
		LoadingComponent,
		PictureFrameComponent

	], imports: [

		CommonModule,
		FormsModule,
		IonicModule.forRoot(),
		ReactiveFormsModule,
		RouterModule

	], exports: [

		CommonModule,
		FormsModule,
		IonicModule,
		ReactiveFormsModule,
		RouterModule,
		HeaderComponent,
		LoadingComponent,
		PictureFrameComponent

	], providers: [

		LoadingService,
		SwalService

	]

}) export class SharedModule {}