import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { firebaseConfig, supabaseConfig } from './config/env.config';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { createClient, SupabaseClient } from '@supabase/supabase-js';

import { PictureService } from './services/picture/picture.service';
import { BucketFileService } from './services/bucket-file/bucket-file.service';

@NgModule({

	declarations: [

		

	], imports: [

		HttpClientModule

	], providers: [

		PictureService,
		BucketFileService,
		provideFirebaseApp(

			() => initializeApp(firebaseConfig)

		), provideFirestore(

			() => getFirestore()

		), {

			provide: SupabaseClient,
			useFactory: () => createClient(

				supabaseConfig.url,
				supabaseConfig.key

			)

		}

	]

}) export class CoreModule {

	public constructor(@Optional() @SkipSelf() parentModule?: CoreModule){

		if (parentModule){

			throw new Error('CoreModule already rendered. Import it only at AppModule');

		}

	}

}
