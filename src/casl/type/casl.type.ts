import { InferSubjects, Ability } from '@casl/ability';
import { Order } from 'src/orders/entity/order.entity';
import { User } from 'src/users/entity/user.entity';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Subjects = InferSubjects<typeof Order | typeof User> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;
