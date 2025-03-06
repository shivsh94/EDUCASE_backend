import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const School = sequelize.define("School", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
    },
});

export default School;