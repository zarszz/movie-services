import { MovieTag } from 'src/movietags/entity/movietags.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => MovieTag, (movieTag) => movieTag)
  movieTags: MovieTag[];
}
