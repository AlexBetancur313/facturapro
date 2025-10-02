const PDFDocument = require("pdfkit");

function buildPDF(docData, dataCallback, endCallback) {
  const doc = new PDFDocument({ margin: 50, size: "letter" });

  // Estos 'listeners' son clave para capturar el PDF en memoria
  doc.on("data", dataCallback);
  doc.on("end", endCallback);

  // --- Comienza a dibujar el PDF ---
  doc
    .fontSize(20)
    .font("Helvetica-Bold")
    .text("Wilson Chica Giraldo", { align: "center" });
  doc
    .fontSize(10)
    .font("Helvetica")
    .text("NO RESPONSABLE DE IVA", { align: "center" });
  doc.moveDown(2);

  doc.fontSize(12).font("Helvetica-Bold").text("Cliente:");
  doc.font("Helvetica").text(`Nombre: ${docData.client.name}`);
  doc.text(`NIT/C.C.: ${docData.client.nit}`);
  doc.text(`Dirección: ${docData.client.address || "N/A"}`);
  doc.text(`Teléfono: ${docData.client.phone || "N/A"}`);
  doc.moveDown(1);

  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);

  const tableTop = doc.y;
  doc.fontSize(10).font("Helvetica-Bold");
  doc.text("Descripción", 60, tableTop);
  doc.text("Cantidad", 300, tableTop, { width: 50, align: "right" });
  doc.text("V/Unitario", 370, tableTop, { width: 80, align: "right" });
  doc.text("V/Total", 470, tableTop, { width: 80, align: "right" });
  doc.moveDown(1);

  let subtotal = 0;
  doc.font("Helvetica");
  docData.items.forEach((item) => {
    const itemTotal = item.quantity * item.unitValue;
    subtotal += itemTotal;
    const y = doc.y;
    doc.text(item.description, 60, y, { width: 280 });
    doc.text(item.quantity, 300, y, { width: 50, align: "right" });
    doc.text(
      item.unitValue.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
      }),
      370,
      y,
      { width: 80, align: "right" }
    );
    doc.text(
      itemTotal.toLocaleString("es-CO", { style: "currency", currency: "COP" }),
      470,
      y,
      { width: 80, align: "right" }
    );
    doc.moveDown(0.5);
  });

  doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();
  doc.moveDown(1);

  doc.fontSize(12).font("Helvetica-Bold");
  doc.text(
    `SUBTOTAL: ${subtotal.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
    })}`,
    { align: "right" }
  );

  doc.end();
}

module.exports = { buildPDF };
