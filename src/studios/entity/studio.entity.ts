import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'studios' })
export class Studio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studio_number: number;

  @Column()
  seat_capacity: number;
}
