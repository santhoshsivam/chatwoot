import { shallowMount } from '@vue/test-utils';
import ConversationHeader from '../ConversationHeader.vue';
import { createStore } from 'vuex';

describe('ConversationHeader.vue', () => {
  let store;
  let getters;

  beforeEach(() => {
    getters = {
      getSelectedChat: () => ({ id: 1, pinned_messages_count: 5 }),
      getCurrentAccountId: () => 1,
      'inboxes/getInboxes': () => [],
      'inboxes/getInbox': () => () => ({}),
      'contacts/getContact': () => () => ({ name: 'John Doe' }),
    };
    store = createStore({ getters });
  });

  it('renders the pins count when pinned_messages_count is greater than 0', () => {
    const chat = {
      id: 1,
      pinned_messages_count: 5,
      meta: { sender: { id: 1 } },
    };
    const wrapper = shallowMount(ConversationHeader, {
      props: { chat },
      global: {
        plugins: [store],
        stubs: {
          'fluent-icon': true,
          BackButton: true,
          Avatar: true,
          InboxName: true,
          SLACardLabel: true,
          MoreActions: true,
        },
        mocks: {
          $t: msg => msg,
        },
      },
    });

    const pinsButton = wrapper.find('[data-testid="pinned-messages-button"]');
    expect(pinsButton.exists()).toBe(true);
    expect(pinsButton.text()).toContain('5');
  });
});
