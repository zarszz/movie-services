import { Movie } from 'src/movies/entity/movie.entity';
import { Studio } from 'src/studios/entity/studio.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'movie_schedules' })
export class Movieschedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movie_id: number;

  @Column()
  studio_id: number;

  @Column()
  start_time: string;

  @Column()
  end_time: string;

  @Column()
  price: number;

  @Column({ name: 'date' })
  date: string;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deleted_at: Date;

  @ManyToOne(() => Movie)
  @JoinTable({
    name: 'movies',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
  })
  movie: Movie;

  @ManyToOne(() => Studio)
  @JoinTable({
    name: 'studios',
    joinColumn: {
      name: 'studio_id',
      referencedColumnName: 'id',
    },
  })
  studio: Studio;
}
