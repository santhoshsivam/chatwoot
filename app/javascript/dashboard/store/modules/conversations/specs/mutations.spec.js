import { mutations } from '../index';
import types from '../../../mutation-types';

describe('#mutations', () => {
  describe('#UPDATE_CONVERSATION_CALL_STATUS', () => {
    it('does nothing if conversation is not found', () => {
      const state = { allConversations: [] };
      mutations[types.UPDATE_CONVERSATION_CALL_STATUS](state, {
        conversationId: 1,
        callStatus: 'ringing',
      });
      expect(state.allConversations).toEqual([]);
    });

    it('updates call_status preserving existing additional_attributes', () => {
      const state = {
        allConversations: [
          { id: 1, additional_attributes: { other_attr: 'value' } },
        ],
      };
      mutations[types.UPDATE_CONVERSATION_CALL_STATUS](state, {
        conversationId: 1,
        callStatus: 'in-progress',
      });
      expect(state.allConversations[0].additional_attributes).toEqual({
        other_attr: 'value',
        call_status: 'in-progress',
      });
    });

    it('creates additional_attributes if it does not exist', () => {
      const state = { allConversations: [{ id: 1 }] };
      mutations[types.UPDATE_CONVERSATION_CALL_STATUS](state, {
        conversationId: 1,
        callStatus: 'completed',
      });
      expect(state.allConversations[0].additional_attributes).toEqual({
        call_status: 'completed',
      });
    });
  });

  describe('#UPDATE_MESSAGE_CALL_STATUS', () => {
    it('does nothing if conversation is not found', () => {
      const state = { allConversations: [] };
      mutations[types.UPDATE_MESSAGE_CALL_STATUS](state, {
        conversationId: 1,
        callStatus: 'ringing',
      });
      expect(state.allConversations).toEqual([]);
    });

    it('does nothing if no voice call message exists', () => {
      const state = {
        allConversations: [
          { id: 1, messages: [{ id: 1, content_type: 'text' }] },
        ],
      };
      mutations[types.UPDATE_MESSAGE_CALL_STATUS](state, {
        conversationId: 1,
        callStatus: 'ringing',
      });
      expect(state.allConversations[0].messages[0]).toEqual({
        id: 1,
        content_type: 'text',
      });
    });

    it('updates the last voice call message status', () => {
      const state = {
        allConversations: [
          {
            id: 1,
            messages: [
              {
                id: 1,
                content_type: 'voice_call',
                content_attributes: { data: { status: 'ringing' } },
              },
              {
                id: 2,
                content_type: 'voice_call',
                content_attributes: { data: { status: 'ringing' } },
              },
            ],
          },
        ],
      };
      mutations[types.UPDATE_MESSAGE_CALL_STATUS](state, {
        conversationId: 1,
        callStatus: 'in-progress',
      });
      expect(
        state.allConversations[0].messages[0].content_attributes.data.status
      ).toBe('ringing');
      expect(
        state.allConversations[0].messages[1].content_attributes.data.status
      ).toBe('in-progress');
    });

    it('handles empty messages array', () => {
      const state = {
        allConversations: [{ id: 1, messages: [] }],
      };
      mutations[types.UPDATE_MESSAGE_CALL_STATUS](state, {
        conversationId: 1,
        callStatus: 'ringing',
      });
      expect(state.allConversations[0].messages).toEqual([]);
    });
  });

  describe('#UPDATE_CONVERSATION_SUMMARY_STATUS', () => {
    it('updates the summary status of the conversation', () => {
      const state = { allConversations: [{ id: 1 }] };
      mutations[types.UPDATE_CONVERSATION_SUMMARY_STATUS](state, {
        conversation_id: 1,
        status: 'in_progress',
      });
      expect(state.allConversations[0].summaryStatus).toBe('in_progress');
    });
  });
});
