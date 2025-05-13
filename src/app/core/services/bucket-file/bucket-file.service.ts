import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { SupabaseClient } from '@supabase/supabase-js';
import { FileObject, StorageError } from '@supabase/storage-js';
import { BucketFile } from './entity/bucket-file.entity';
import { IStatement } from '@interfaces/statement/statement.interface';
import { IQuery } from '@interfaces/query/query.interface';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({

	providedIn: 'root'

}) export class BucketFileService implements IQuery<BucketFile>, IStatement<BucketFile>{

	private readonly bucketName: string = environment.supabase.buckets.galery.name;

	public constructor(private supabase: SupabaseClient) {}

	public async findOne(key: string): Promise<BucketFile | undefined> {

		try{

			const { data, error } = await this.supabase.storage.from(this.bucketName).list('', { search: key });

			if (error) throw error;
			
			return this.parseFileObjectToBucketFile(data[0]);

		}catch(e: any){

			throw new StorageError(e.message);

		}

	}

	public findAll(): Observable<Array<BucketFile>> {

		try{

			return from(

				this.supabase.storage.from(this.bucketName).list()

			).pipe(

				map(({ data, error }) => {

					if (error) throw error;
					return data.map(file => this.parseFileObjectToBucketFile(file));

				})

			);

		}catch(e: any){

			throw new StorageError(e.message);

		}

	}

	public async insert(entity: BucketFile & { file: Blob }): Promise<string | undefined> {

		try{

			const { data, error } = await this.supabase.storage.from(this.bucketName).upload(

				entity.name,
				entity.file

			);

			if (error) throw error;

			return `https://dghhvdgxmqmhodneorow.supabase.co/storage/v1/object/public/galery//${entity.name}`;

		}catch(e: any){

			throw new StorageError(e.message);
			return undefined;

		}

	}

	public async update(key: string, entity: Partial<BucketFile>): Promise<boolean> {

		try{

			const { error } = await this.supabase.storage.from(this.bucketName).update(key, entity as unknown as File);

			if (error) throw error;

			return !error;

		}catch(e: any){

			throw new StorageError(e.message);

		}

	}

	public async delete(key: string): Promise<boolean> {

		try{

			const { error } = await this.supabase.storage.from(this.bucketName).remove([key]);

			if (error) throw error;

			return !error;

		}catch(e: any){

			throw new StorageError(e.message);

		}

	}

	private parseFileObjectToBucketFile(file: FileObject): BucketFile {

		return {

			id: file.id,
			name: file.name,
			url: this.getPublicUrl(file.name),
			createdAt: new Date(file.created_at),
			updatedAt: new Date(file.updated_at),
			metadata: file.metadata

		};

	}

	private getPublicUrl(fileName: string): string {

		try{

			const { data } = this.supabase.storage.from(this.bucketName).getPublicUrl(fileName);

			return data.publicUrl;

		}catch(e: any){

			throw new StorageError(e.message);

		}

	}

}