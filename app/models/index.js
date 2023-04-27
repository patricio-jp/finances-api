import { Income } from "./income.js";
import { Outgoing } from "./outgoing.js";
import { PaymentMethod } from "./paymentMethod.js";

Income.belongsTo(PaymentMethod);

Outgoing.belongsTo(PaymentMethod);

PaymentMethod.hasMany(Income);
PaymentMethod.hasMany(Outgoing);

export { Income, Outgoing, PaymentMethod };