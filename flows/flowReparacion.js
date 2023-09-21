const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const { addAction } = require("@bot-whatsapp/bot");
const { getUser, getTicket } = require("../api/users.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Recuperamos el prompt "TECNICO"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "01_TECNICO.txt"), "utf-8");
  return text;
};

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
  flowReparacion: (chatgptClass) => {
    return addKeyword(EVENTS.WELCOME)
      .addAction(async (ctx, { endFlow, flowDynamic, provider }) => {
        const data = await getPrompt();
        // await chatgptClass.handleMsgChatGPT(data);

        const textFromAInit = await chatgptClass.handleMsgChatGPT(data);
        //const textFromA_gret = await chatgptClass.handleMsgChatGPT(ctx.body);
        console.log(`tengo sueño`);

        //await flowDynamic(textFromA_gret.text);
      })
      .addAnswer(
        'Hola, Cuentame, que repuesto estas buscando?',
        { capture: true },
        async (ctx, { fallBack }) => {
          // Print 'ctx' in the terminal
          //await delay(10000);
          const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
          await fallBack(textFromAI.text);
          console.log(`tengo sueño 2`);
        }
      );
  },
};
