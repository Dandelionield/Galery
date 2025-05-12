import { FileObject } from '@supabase/storage-js';
import { Entity } from '@models/entity.model';

export interface BucketFile extends Entity<string> {

	name: FileObject['name'];
	url?: string;
	createdAt?: Date;
	updatedAt?: Date;
	metadata?: FileObject['metadata'];

};