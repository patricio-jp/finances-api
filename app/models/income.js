import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/mysql.js";

export class Income extends Model { }

Income.init({
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
    modelName: 'Income',
    timestamps: true,
    paranoid: true
});
