import ConversationApi from '../../../../api/inbox/conversation';

export default {
  async pinMessage(_, { conversationId, messageId }) {
    try {
      await ConversationApi.pinMessage(conversationId, messageId);
    } catch (error) {
      // ignore error
    }
  },
  async unpinMessage(_, { conversationId, messageId }) {
    try {
      await ConversationApi.unpinMessage(conversationId, messageId);
    } catch (error) {
      // ignore error
    }
  },
};
