class ChatGPTClass {
  queue = [];
  optionsGPT = { model: "gpt-3.5-turbo" };
  openai = undefined;

  constructor() {
    this.init().then();
  }

  init = async () => {
    const { ChatGPTAPI } = await import("chatgpt");
    this.openai = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY
    });
  };

  handleMsgChatGPT = async (body) => {
    // Log the entire conversation history before sending the new message

    const sendMessageWithRetry = async (body, retryCount = 0) => {
      try {
        const interaccionChatGPT = await this.openai.sendMessage(body, {
          conversationId: !this.queue.length
            ? undefined
            : this.queue[this.queue.length - 1].conversationId,
          parentMessageId: !this.queue.length
            ? undefined
            : this.queue[this.queue.length - 1].id,
        });

        this.queue.push(interaccionChatGPT);
        console.log(this.queue[this.queue.length - 1].conversationId);
        return interaccionChatGPT;
      } catch (error) {
        // Retry for any type of error
        const retryAfter = 30; // Wait for 30 seconds
        console.log(`Error occurred: ${error.message}. Retrying in ${retryAfter} seconds.`);
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        return sendMessageWithRetry(body, retryCount + 1);
      }
    };

    return sendMessageWithRetry(body);
  };
}

module.exports = ChatGPTClass;
