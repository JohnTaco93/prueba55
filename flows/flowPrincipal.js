const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAnswer(
    "Gracias por comunicarte con *Precision Industrial Hinajo*. Cuéntenos, ¿Qué repuesto esta buscando?"
  )

module.exports = flowPrincipal;