const conectarDB = require("../db");

(async () => {
  const db = await conectarDB();
  const colecciones = await db.listCollections().toArray();
  console.log("📁 Colecciones existentes:", colecciones);
})();
