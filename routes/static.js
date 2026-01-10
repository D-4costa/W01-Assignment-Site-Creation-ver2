const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Home | CSE Motors" });
});

router.get("/custom", (req, res) => {
  res.render("custom", { title: "Custom | CSE Motors" });
});

router.get("/sedan", (req, res) => {
  res.render("sedan", { title: "Sedan | CSE Motors" });
});

router.get("/suv", (req, res) => {
  res.render("suv", { title: "SUV | CSE Motors" });
});

router.get("/truck", (req, res) => {
  res.render("truck", { title: "Truck | CSE Motors" });
});

module.exports = router;
