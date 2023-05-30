import { sequelize } from "../../config/mysql.js";
import { DataTypes, Model } from "sequelize";

export class Category extends Model { }

Category.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Category'
});
