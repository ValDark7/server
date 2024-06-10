const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

// Получение содержимого корзины пользователя
router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate(
      "items.productId"
    );
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Добавление товара в корзину пользователя
router.post("/api/cart/add", async (req, res) => {
  try {
    // Получить данные о товаре из запроса
    const { id, name, price, description, image, popular, size, color, qty } =
      req.body;
    // Создать новый объект товара в корзине
    const newItem = new Cart({
      id,
      name,
      price,
      description,
      image,
      popular,
      size,
      color,
      qty,
    });
    // Сохранить товар в базу данных
    const savedItem = await newItem.save();
    // Отправить обратно подтверждение
    res.status(201).json(savedItem);
  } catch (error) {
    // Обработать ошибку, если что-то пошло не так
    res.status(500).json({ message: error.message });
  }
});

// Удаление товара из корзины пользователя
router.delete("/:userId/remove/:productId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId !== req.params.productId
    );
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
