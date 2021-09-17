import { Column, PrimaryGeneratedColumn, Entity, AfterInsert } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  activity_id: number;

  @Column()
  activity_date: Date;

  @Column()
  activity_start: string;

  @Column()
  activity_end: string;

  @Column()
  activity_distance: number;

  @Column()
  user_id: number;

  @AfterInsert()
  logInsert() {
    console.log('DB: Inserted Activity with id', this.activity_id);
  }
}
