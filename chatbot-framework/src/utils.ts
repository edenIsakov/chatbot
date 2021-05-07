const flatMessagesConversations = (conversations) => {
  const allMessages = [];
  conversations.forEach((conversation) => {
    conversation.messages.forEach((message) => {
      allMessages.push(message);
    });
  });
  return allMessages;
}

export {
  flatMessagesConversations
}