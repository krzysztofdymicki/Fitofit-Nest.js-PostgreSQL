import { Entity, Column, PrimaryGeneratedColumn, AfterInsert } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Exclude()
  @Column()
  password_hash: string;

  @AfterInsert()
  logInsert() {
    console.log('DB: Inserted User with id', this.user_id);
  }
}
