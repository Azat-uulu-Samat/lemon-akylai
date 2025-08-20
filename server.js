const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

// Читаем фронт из папки public
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Переменные окружения для безопасности
const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT;

// Маршрут для формы
app.post("/send-form", async (req, res) => {
  const { name, surname, phone, message } = req.body;

  console.log("Получено с фронта:", req.body);

  const text = `Новая заявка:
Имя: ${name || "-"}
Фамилия: ${surname || "-"}
Телефон: ${phone || "-"}
Сообщение: ${message || "-"}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.json({ ok: false });
  }
});

// Любой GET-запрос отправляем на index.html (чтобы фронт работал на Render)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Порт для Render или локально
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
