const express = require("express");
const cors = require("cors");

// Importamos nuestras rutas
const documentRoutes = require("./routes/document.routes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// El servidor principal ahora solo dice:
// "Para cualquier ruta que empiece con /api, usa las reglas de documentRoutes"
app.use("/api", documentRoutes);

app.listen(PORT, () => {
  console.log(
    `Servidor backend (organizado) corriendo en http://localhost:${PORT}`
  );
});
