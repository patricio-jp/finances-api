import { Category } from "./category.js";
import { Income } from "./income.js";
import { Outgoing } from "./outgoing.js";
import { PaymentMethod } from "./paymentMethod.js";

Category.hasMany(Income);
Category.hasMany(Outgoing);

Income.belongsTo(Category);
Income.belongsTo(PaymentMethod);

Outgoing.belongsTo(Category);
Outgoing.belongsTo(PaymentMethod);

PaymentMethod.hasMany(Income);
PaymentMethod.hasMany(Outgoing);

export { Income, Outgoing, PaymentMethod };