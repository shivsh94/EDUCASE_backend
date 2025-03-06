import express from "express";
import sequelize from "./config/db.js";
import router from "./routes/user.route.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello World");
});
app.use("/", router);

const Server = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized");

    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Error syncing database:", error);
    process.exit(1); 
  }
};
Server();


