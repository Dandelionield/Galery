import { Entity } from '@models/entity.model';
import { Timestamp } from '@angular/fire/firestore';

export interface Picture extends Entity<string> {

	url: string,
	name: string,
	description: string,
	createdAt: Timestamp

}