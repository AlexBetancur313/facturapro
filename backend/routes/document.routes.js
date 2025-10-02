const express = require("express");
const router = express.Router();
const { generatePdfController } = require("../controllers/document.controller");

// Cuando alguien haga un POST a /generate-pdf, se ejecuta el controlador
router.post("/generate-pdf", generatePdfController);

module.exports = router;
