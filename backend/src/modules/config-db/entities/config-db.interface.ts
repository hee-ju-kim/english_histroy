import { Model } from 'mongoose';

export interface ConfigDB {
	numbering: {
		document: number,
	},
}

export interface ConfigDBStatic extends Model<ConfigDB> {
	getNo(key: string): Promise<number | boolean>; 
}
