import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.MYSQLDATABASE, process.env.MYSQLUSER, process.env.MYSQLPASSWORD, {
    host: process.env.MYSQLHOST, // ✅ Use Railway's host
    dialect: process.env.DB_DIALECT || "mysql",
    port: Number(process.env.MYSQLPORT), // ✅ Ensure port is correct
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Unable to connect to the database:", error);
    }
};

connectDB();

export default sequelize;
