import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entity/user.entity';
import {
  AbilityBuilder,
  Ability,
  AbilityClass,
  ExtractSubjectType,
} from '@casl/ability';
import { Action, AppAbility, Subjects } from './type/casl.type';
import { Order } from 'src/orders/entity/order.entity';

@Injectable()
export class CaslAbilityFactory {
  createrForUser(user: User) {
    const { can, build } = new AbilityBuilder<Ability<[Action, Subjects]>>(
      Ability as AbilityClass<AppAbility>,
    );

    if (user.is_admin) {
      can(Action.Manage, 'all');
    }

    can(Action.Read, Order, { user_id: user.id });
    can(Action.Update, Order, { user_id: user.id });
    can(Action.Delete, Order, { user_id: user.id });

    return build({
      detectSubjectType: (object) =>
        object.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
