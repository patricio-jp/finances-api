import { sequelize } from "../../config/mysql.js";
import { DataTypes, Model } from "sequelize";

export class PaymentMethod extends Model { }

PaymentMethod.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    },
    balance: {
        type: DataTypes.DECIMAL(14, 2),
        defaultValue: 0.00
    },
    currency: {
        type: DataTypes.STRING(5),
        allowNull: false
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 1
    }
}, {
    sequelize,
    modelName: 'PaymentMethod',
    timestamps: true,
    paranoid: true
});
