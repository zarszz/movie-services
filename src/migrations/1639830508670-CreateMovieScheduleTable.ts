import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMovieScheduleTable1639830508670
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie_schedules',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'movie_id',
            type: 'int',
          },
          {
            name: 'studio_id',
            type: 'int',
          },
          {
            name: 'price',
            type: 'double',
          },
          {
            name: 'date',
            type: 'timestamp',
          },
          {
            name: 'start_time',
            type: 'varchar',
          },
          {
            name: 'end_time',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isNullable: true,
            default: 'current_timestamp()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isNullable: true,
            default: 'current_timestamp()',
            onUpdate: 'current_timestamp()',
          },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'movie_schedules',
      new TableForeignKey({
        columnNames: ['movie_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movies',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'movie_schedules',
      new TableForeignKey({
        columnNames: ['studio_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'studios',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie_schedules');
  }
}
