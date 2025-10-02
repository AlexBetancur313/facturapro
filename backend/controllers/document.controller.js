const { buildPDF } = require("../services/pdf.service");

// Esta función maneja la petición y la respuesta
function generatePdfController(req, res) {
  const docData = req.body;
  const buffers = [];

  const dataCallback = (chunk) => buffers.push(chunk);
  const endCallback = () => {
    const pdfData = Buffer.concat(buffers).toString("base64");
    res.json({ success: true, pdfBase64: pdfData });
  };

  // Llama al servicio para que haga el trabajo pesado
  buildPDF(docData, dataCallback, endCallback);
}

module.exports = { generatePdfController };
