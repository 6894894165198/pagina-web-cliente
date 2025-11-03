// Importar el cliente de MongoDB
const { MongoClient } = require("mongodb");

// URL de conexión (usa tu cadena de MongoDB Atlas)
const uri = "mongodb+srv://pablopdelrio_db_user:b2eNu8phZArOuhYU@sindugrafcluster.xz1qnkj.mongodb.net/?appName=SindugrafCluster";

// Crear una instancia del cliente
const client = new MongoClient(uri);

// Función para conectar con la base de datos
async function conectarDB() {
  try {
    await client.connect();
    console.log("✅ Conectado a MongoDB Atlas correctamente");
    return client.db("sindugrafDB"); // nombre de tu base de datos (puedes cambiarlo)
  } catch (err) {
    console.error("❌ Error al conectar con MongoDB:", err);
  }
}

// Exportar la función para usarla en otros archivos
module.exports = conectarDB;
