const conectarDB = require("../db");

(async () => {
  const db = await conectarDB();

  // Nombre de la colección
  const nombreColeccion = "cotizaciones";

  // Crear la colección si no existe
  const colecciones = await db.listCollections({ name: nombreColeccion }).toArray();

  if (colecciones.length === 0) {
    await db.createCollection(nombreColeccion);
    console.log(`✅ Colección '${nombreColeccion}' creada exitosamente`);
  } else {
    console.log(`ℹ️ La colección '${nombreColeccion}' ya existe`);
  }

  // Cerrar la conexión después de crearla
  process.exit();
})();
