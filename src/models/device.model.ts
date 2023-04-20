import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BasicEntity } from './base/basic.model';
import { User } from './user.model';

@Entity('user_device')
export class Device extends BasicEntity {
	@ManyToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
    nullable: false,
	})
	@JoinColumn({
		name: 'user_id',
	})
	user: string;

	@Column()
	device_name: string;
}
