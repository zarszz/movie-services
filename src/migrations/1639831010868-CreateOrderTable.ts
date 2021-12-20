import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderTable1639831010868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'payment_method',
            type: 'enum',
            enum: [
              'credit_card',
              'bank_transfer',
              'bca_klikpay',
              'bri_epay',
              'cimb_clicks',
              'danamon_online',
              'qris',
              'gopay',
              'shopeepay',
              'cstore',
              'akulaku',
            ],
          },
          {
            name: 'total_item_price',
            type: 'double',
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
      'orders',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
