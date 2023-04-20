import { Entity, Column } from 'typeorm';
import { BasicEntity } from './base/basic.model';

@Entity('user')
export class User extends BasicEntity {

	@Column()
	username: string;

	@Column()
	password: string;

	@Column()
	email: string;

}
