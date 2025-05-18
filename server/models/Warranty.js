const mongoose = require("mongoose");

const warrantySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  brand: String,
  purchaseDate: {
    type: Date,
    required: true,
  },
  durationMonths: {
    type: Number,
    required: true,
  },
  receiptUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

warrantySchema.virtual("expiryDate").get(function () {
  const purchase = new Date(this.purchaseDate);
  return new Date(purchase.setMonth(purchase.getMonth() + this.durationMonths));
});

warrantySchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Warranty", warrantySchema);
