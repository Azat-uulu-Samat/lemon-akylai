const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT;

app.post("/send-form", async (req, res) => {
  const { name, surname, phone, message } = req.body;

  console.log("Получено с фронта:", req.body); // проверка

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

app.listen(3000, () => console.log("Server running on http://localhost:3000"));

