import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateStudioTable1639830483977 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'studios',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'studio_number',
            type: 'int',
          },
          {
            name: 'seat_capacity',
            type: 'int',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('studios');
  }
}
