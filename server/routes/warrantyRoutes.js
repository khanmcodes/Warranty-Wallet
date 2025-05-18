const express = require("express");
const router = express.Router();
const Warranty = require("../models/Warranty");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, async (req, res) => {
  const warranties = await Warranty.find({ user: req.user._id });
  res.json(warranties);
});

router.post("/", protect, async (req, res) => {
  const { productName, brand, purchaseDate, durationMonths, receiptUrl } = req.body;

  const newWarranty = await Warranty.create({
    user: req.user._id,
    productName,
    brand,
    purchaseDate,
    durationMonths,
    receiptUrl,
  });

  res.status(201).json(newWarranty);
});

router.delete("/:id", protect, async (req, res) => {
  const warranty = await Warranty.findById(req.params.id);
  if (!warranty) return res.status(404).json({ message: "Not found" });
  if (warranty.user.toString() !== req.user._id.toString())
    return res.status(401).json({ message: "Not authorized" });

  await warranty.deleteOne();
  res.json({ message: "Deleted" });
});


module.exports = router;
