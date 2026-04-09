import { shallowMount } from '@vue/test-utils';
import ConversationHeader from '../ConversationHeader.vue';
import { createStore } from 'vuex';
import { useRoute } from 'vue-router';

vi.mock('vue-router', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRoute: vi.fn(),
  };
});

describe('ConversationHeader.vue', () => {
  let store;
  let getters;

  beforeEach(() => {
    useRoute.mockReturnValue({
      params: { account_id: 1, inbox_id: 1 },
      name: 'chat',
    });
    getters = {
      getSelectedChat: () => ({ id: 1, pinned_messages_count: 5 }),
      getCurrentAccountId: () => 1,
      getPinnedMessages: () => [],
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
          'v-dropdown': {
            template: '<div><slot /><slot name="popper" /></div>',
          },
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

  it('dispatches fetchPinnedMessages when pins button is clicked', async () => {
    const chat = {
      id: 1,
      pinned_messages_count: 5,
      meta: { sender: { id: 1 } },
    };
    const actions = {
      fetchPinnedMessages: vi.fn(),
    };
    store = createStore({ getters, actions });

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
          'v-dropdown': {
            template: '<div><slot /><slot name="popper" /></div>',
          },
        },
        mocks: {
          $t: msg => msg,
        },
      },
    });

    const pinsButton = wrapper.find('[data-testid="pinned-messages-button"]');
    await pinsButton.trigger('click');
    expect(actions.fetchPinnedMessages).toHaveBeenCalled();
  });
});
