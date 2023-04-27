import { sequelize } from "../../config/mysql.js";
import { DataTypes, Model } from "sequelize";

export class Outgoing extends Model { }

Outgoing.init({
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(14, 2),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Outgoing',
    timestamps: true,
    paranoid: true
});
