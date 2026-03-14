import types from '../../mutation-types';
import getters from './getters';
import actions from './actions';
import { CONTENT_TYPES } from 'dashboard/components-next/message/constants.js';

const state = {
  allConversations: [],
  attachments: {},
  listLoadingStatus: true,
  chatStatusFilter: 'open',
  chatSortFilter: 'latest',
  currentInbox: null,
  selectedChatId: null,
  appliedFilters: [],
  contextMenuChatId: null,
  conversationParticipants: [],
  conversationLastSeen: null,
  syncConversationsMessages: {},
  conversationFilters: {},
  copilotAssistant: {},
};

const getConversationById = _state => conversationId => {
  return _state.allConversations.find(c => c.id === conversationId);
};

// mutations
export const mutations = {
  [types.SET_ALL_CONVERSATION](_state, conversationList) {
    const newAllConversations = [..._state.allConversations];
    conversationList.forEach(conversation => {
      const indexInCurrentList = newAllConversations.findIndex(
        c => c.id === conversation.id
      );
      if (indexInCurrentList < 0) {
        newAllConversations.push(conversation);
      } else if (conversation.id !== _state.selectedChatId) {
        newAllConversations[indexInCurrentList] = conversation;
      } else {
        const existingConversation = newAllConversations[indexInCurrentList];
        newAllConversations[indexInCurrentList] = {
          ...conversation,
          allMessagesLoaded: existingConversation.allMessagesLoaded,
          messages: existingConversation.messages,
          dataFetched: existingConversation.dataFetched,
        };
      }
    });
    _state.allConversations = newAllConversations;
  },
  [types.EMPTY_ALL_CONVERSATION](_state) {
    _state.allConversations = [];
    _state.selectedChatId = null;
  },
  [types.SET_ALL_MESSAGES_LOADED](_state, conversationId) {
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.allMessagesLoaded = true;
    }
  },

  [types.CLEAR_ALL_MESSAGES_LOADED](_state, conversationId) {
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.allMessagesLoaded = false;
    }
  },
  [types.CLEAR_CURRENT_CHAT_WINDOW](_state) {
    _state.selectedChatId = null;
  },

  [types.SET_PREVIOUS_CONVERSATIONS](_state, { id, data }) {
    if (data.length) {
      const [chat] = _state.allConversations.filter(c => c.id === id);
      chat.messages.unshift(...data);
    }
  },
  [types.SET_ALL_ATTACHMENTS](_state, { id, data }) {
    _state.attachments[id] = [...data];
  },
  [types.SET_MISSING_MESSAGES](_state, { id, data }) {
    const [chat] = _state.allConversations.filter(c => c.id === id);
    if (!chat) return;
    chat.messages = data;
  },

  [types.SET_CHAT_DATA_FETCHED](_state, conversationId) {
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.dataFetched = true;
    }
  },

  [types.SET_ACTIVE_INBOX](_state, inboxId) {
    _state.currentInbox = inboxId ? parseInt(inboxId, 10) : null;
  },

  [types.SET_CONVERSATION_CAN_REPLY](_state, { conversationId, canReply }) {
    const [chat] = _state.allConversations.filter(c => c.id === conversationId);
    if (chat) {
      chat.can_reply = canReply;
    }
  },

  [types.CLEAR_CONTACT_CONVERSATIONS](_state, contactId) {
    const chats = _state.allConversations.filter(
      c => c.meta.sender.id !== contactId
    );
    _state.allConversations = chats;
  },

  [types.SET_CONVERSATION_FILTERS](_state, data) {
    _state.appliedFilters = data;
  },

  [types.CLEAR_CONVERSATION_FILTERS](_state) {
    _state.appliedFilters = [];
  },

  [types.SET_LAST_MESSAGE_ID_IN_SYNC_CONVERSATION](
    _state,
    { conversationId, messageId }
  ) {
    _state.syncConversationsMessages[conversationId] = messageId;
  },

  [types.SET_CONTEXT_MENU_CHAT_ID](_state, chatId) {
    _state.contextMenuChatId = chatId;
  },

  [types.SET_CHAT_LIST_FILTERS](_state, data) {
    _state.conversationFilters = data;
  },
  [types.UPDATE_CHAT_LIST_FILTERS](_state, data) {
    _state.conversationFilters = { ..._state.conversationFilters, ...data };
  },

  [types.ADD_CONVERSATION](_state, conversation) {
    _state.allConversations.push(conversation);
  },

  [types.UPDATE_CONVERSATION](_state, conversation) {
    const index = _state.allConversations.findIndex(
      c => c.id === conversation.id
    );
    if (index !== -1) {
      const existingConversation = _state.allConversations[index];
      _state.allConversations.splice(index, 1, {
        ...existingConversation,
        ...conversation,
      });
    }
  },

  [types.CHANGE_CONVERSATION_STATUS](
    _state,
    { conversationId, status, snoozedUntil }
  ) {
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.status = status;
      chat.snoozed_until = snoozedUntil;
    }
  },

  [types.ASSIGN_AGENT](_state, { conversationId, assignee }) {
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.meta.assignee = assignee;
    }
  },

  [types.ASSIGN_TEAM](_state, { team, conversationId }) {
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.meta.team = team;
    }
  },

  [types.ASSIGN_PRIORITY](_state, { priority, conversationId }) {
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.priority = priority;
    }
  },

  [types.ADD_MESSAGE](_state, message) {
    const chat = getConversationById(_state)(message.conversation_id);
    if (chat) {
      const index = chat.messages.findIndex(m => m.id === message.id);
      if (index === -1) {
        chat.messages.push(message);
      } else {
        chat.messages.splice(index, 1, message);
      }
    }
  },

  [types.SET_CONVERSATION_METADATA](_state, { id, data }) {
    const chat = getConversationById(_state)(id);
    if (chat) {
      chat.meta = { ...chat.meta, ...data };
    }
  },

  [types.UPDATE_CONVERSATION_CUSTOM_ATTRIBUTES](
    _state,
    { conversationId, customAttributes }
  ) {
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.custom_attributes = customAttributes;
    }
  },

  [types.UPDATE_CONVERSATION_LAST_ACTIVITY](
    _state,
    { conversationId, lastActivityAt }
  ) {
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.last_activity_at = lastActivityAt;
    }
  },

  [types.MUTE_CONVERSATION](_state) {
    const chat = getConversationById(_state)(_state.selectedChatId);
    if (chat) {
      chat.muted = true;
    }
  },

  [types.UNMUTE_CONVERSATION](_state) {
    const chat = getConversationById(_state)(_state.selectedChatId);
    if (chat) {
      chat.muted = false;
    }
  },

  [types.SET_CURRENT_CHAT_WINDOW](_state, data) {
    _state.selectedChatId = data.id;
  },

  [types.UPDATE_MESSAGE_UNREAD_COUNT](_state, { conversationId, unreadCount }) {
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.unread_count = unreadCount;
    }
  },

  [types.ADD_CONVERSATION_ATTACHMENTS](_state, message) {
    const { conversation_id: conversationId, attachments } = message;
    if (attachments && attachments.length) {
      const chat = getConversationById(_state)(conversationId);
      if (chat) {
        _state.attachments[conversationId] = [
          ...(_state.attachments[conversationId] || []),
          ...attachments,
        ];
      }
    }
  },

  [types.DELETE_CONVERSATION_ATTACHMENTS](_state, message) {
    const { conversation_id: conversationId, attachments } = message;
    if (attachments && attachments.length) {
      const attachmentIds = attachments.map(a => a.id);
      _state.attachments[conversationId] = (
        _state.attachments[conversationId] || []
      ).filter(a => !attachmentIds.includes(a.id));
    }
  },

  [types.DELETE_CONVERSATION](_state, conversationId) {
    _state.allConversations = _state.allConversations.filter(
      c => c.id !== conversationId
    );
    if (_state.selectedChatId === conversationId) {
      _state.selectedChatId = null;
    }
  },

  [types.UPDATE_CONVERSATION_CONTACT](_state, payload) {
    const { conversationId, ...sender } = payload;
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.meta.sender = { ...chat.meta.sender, ...sender };
    }
  },

  [types.UPDATE_CONVERSATION_CALL_STATUS](
    _state,
    { conversationId, callStatus }
  ) {
    const chat = getConversationById(_state)(conversationId);
    if (!chat) return;

    chat.additional_attributes = {
      ...chat.additional_attributes,
      call_status: callStatus,
    };
  },

  [types.UPDATE_MESSAGE_CALL_STATUS](_state, { conversationId, callStatus }) {
    const chat = getConversationById(_state)(conversationId);
    if (!chat) return;

    const lastCall = (chat.messages || []).findLast(
      m => m.content_type === CONTENT_TYPES.VOICE_CALL
    );

    if (!lastCall) return;

    lastCall.content_attributes ??= {};
    lastCall.content_attributes.data = {
      ...lastCall.content_attributes.data,
      status: callStatus,
    };
  },

  [types.UPDATE_CHAT_LIST_FILTERS](_state, data) {
    _state.conversationFilters = { ..._state.conversationFilters, ...data };
  },

  [types.SET_INBOX_CAPTAIN_ASSISTANT](_state, data) {
    _state.copilotAssistant = data.assistant;
  },

  [types.UPDATE_CONVERSATION_SUMMARY_STATUS](
    _state,
    { conversation_id: conversationId, status }
  ) {
    const chat = getConversationById(_state)(conversationId);
    if (chat) {
      chat.summaryStatus = status;
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
