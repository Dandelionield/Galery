import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

	{

		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)

	}, {

		path: '',
		redirectTo: 'home',
		pathMatch: 'full'

	}, {

		path: 'add',
		loadChildren: () => import('./pages/picture/picture-insert-form/picture-insert-form.module').then( m => m.PictureInsertFormPageModule)

	}, {

		path: 'update/:id',
		loadChildren: () => import('./pages/picture/picture-update-form/picture-update-form.module').then( m => m.PictureUpdateFormPageModule)

	},

];

@NgModule({

	imports: [

		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })

	], exports: [RouterModule]

}) export class AppRoutingModule { }
