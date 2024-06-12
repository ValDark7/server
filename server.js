const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Для использования переменных окружения

const app = express();

// Middleware для парсинга JSON
app.use(express.json());

app.use(cors());

// Подключение к MongoDB
const dbURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mydatabase";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Убедитесь, что путь к маршрутам указан правильно

app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/carts", require("./routes/cart"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
