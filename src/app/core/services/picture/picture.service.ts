import { Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import { IStatement } from '@interfaces/statement/statement.interface';
import { IQuery } from '@interfaces/query/query.interface';
import { Picture } from './entity/picture.entity';
import { Observable } from 'rxjs';
import { FirebaseError } from '@angular/fire/app';
import {

	Firestore,
	collection,
	collectionData,
	deleteDoc,
	updateDoc,
	docData,
	doc,
	setDoc,
	addDoc,
	getDoc,
	query,
	where,
	limit

} from '@angular/fire/firestore';

@Injectable({

	providedIn: 'root'

}) export class PictureService implements IQuery<Picture>, IStatement<Picture>{

	private readonly collectionName: string = environment.firebase.collections.picture.name;
	private readonly collectionIDField: string = environment.firebase.collections.picture.idField;

	public constructor(private firestore: Firestore) {}

	public findOne(key: string): Promise<Picture | undefined> {

		try{

			return getDoc(doc(

				collection(this.firestore, this.collectionName),
				key

			)).then((snapshot) => snapshot.data()) as Promise<Picture | undefined>;

		}catch(e: any){

			throw new FirebaseError('Error', e.message);

		}

	}

	public findAll(): Observable<Array<Picture>> {

		try{

			return collectionData(collection(this.firestore, this.collectionName), {

				idField: this.collectionIDField as keyof Picture

			}) as Observable<Array<Picture>>;

		}catch(e: any){

			throw new FirebaseError('Error', e.message);

		}

	}

	public async insert(entity: Picture): Promise<string | undefined> {

		try{

			const doc = await addDoc(

				collection(this.firestore, this.collectionName),
				entity

			);

			return doc.id;

		}catch(e: any){

			throw new FirebaseError('Error', e.message);
			return undefined;

		}

	}

	public async update(key: string, entity: Partial<Picture>): Promise<boolean> {

		try{

			await updateDoc(doc(this.firestore, `${this.collectionName}/${key}`), entity);

			return true;

		}catch (e: any){

			throw new FirebaseError('Error', e.message);
			return false;

		}

	}

	public async delete(key: string): Promise<boolean> {

		try{

			await deleteDoc(doc(

				this.firestore,
				`${this.collectionName}/${key}`

			));

			return true;

		}catch (e: any){

			throw new FirebaseError('Error', e.message);
			return false;

		}

	}

}