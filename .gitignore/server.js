// ===============================
// SERVIDOR PRINCIPAL DE SINDUGRAF
// ===============================

// ===============================
// SERVIDOR PRINCIPAL DE SINDUGRAF
// ===============================

require("dotenv").config(); // 🧩 Cargar variables del archivo .env
console.log("🔍 Variables cargadas:");
console.log("MONGO_URI:", process.env.MONGO_URI || "❌ No encontrada");
console.log("EMAIL_USER:", process.env.EMAIL_USER || "❌ No encontrada");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");


const app = express();
app.use(express.json());
app.use(cors());

// 1️⃣ Conexión con MongoDB Atlas
async function conectarMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Conectado a MongoDB Atlas correctamente");
  } catch (error) {
    console.error("❌ Error al conectar con MongoDB:", error);
  }
}
conectarMongo();

// 2️⃣ Esquema y modelo
const cotizacionSchema = new mongoose.Schema({
  nombre: String,
  correo: String,
  telefono: String,
  servicio: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
});
const Cotizacion = mongoose.model("Cotizacion", cotizacionSchema);

// 3️⃣ Configurar transporte de correo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // 📧 desde .env
    pass: process.env.EMAIL_PASS  // 🔑 contraseña de aplicación
  }
});

// 4️⃣ Ruta para guardar cotización y enviar correos
app.post("/api/cotizar", async (req, res) => {
  try {
    const { nombre, correo, telefono, servicio, mensaje } = req.body;

    // Guardar en MongoDB
    const nuevaCotizacion = new Cotizacion({ nombre, correo, telefono, servicio, mensaje });
    await nuevaCotizacion.save();

    // ✉️ Correo para el administrador
    const mailAdmin = {
      from: `"Sindugrafs" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: `🧾 Nueva cotización de ${nombre}`,
      text: `
📌 Servicio: ${servicio}
👤 Nombre: ${nombre}
📧 Correo: ${correo}
📞 Teléfono: ${telefono}
💬 Mensaje: ${mensaje || "(sin mensaje)"}
🕒 Fecha: ${new Date().toLocaleString()}
      `
    };

    // ✉️ Correo de confirmación para el cliente
    const mailCliente = {
      from: `"Sindugrafs" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: "✅ Hemos recibido tu solicitud de cotización",
      text: `
Hola ${nombre},

Gracias por contactarte con **Sindugrafs**. Hemos recibido tu solicitud de cotización para el servicio: **${servicio}**.

Un asesor de nuestro equipo revisará tu mensaje y se comunicará contigo pronto.

📞 Teléfono de contacto: +51 947 234 694
📧 Correo: info@sindugrafs.com

¡Gracias por confiar en nosotros!
Atentamente,
El equipo de Sindugrafs
      `
    };

    // Enviar ambos correos
    await transporter.sendMail(mailAdmin);
    await transporter.sendMail(mailCliente);

    res.status(201).json({ mensaje: "Cotización guardada y correos enviados ✅" });
  } catch (error) {
    console.error("❌ Error al guardar o enviar correos:", error);
    res.status(500).json({ mensaje: "Error al procesar la cotización" });
  }
});

// 5️⃣ Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`));
