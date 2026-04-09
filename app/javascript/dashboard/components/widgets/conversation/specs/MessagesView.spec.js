import { shallowMount } from '@vue/test-utils';
import MessagesView from '../MessagesView.vue';
import { createStore } from 'vuex';
import { emitter } from 'shared/helpers/mitt';
import { BUS_EVENTS } from 'shared/constants/busEvents';
import { useRoute } from 'vue-router';

vi.mock('vue-router', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRoute: vi.fn(),
  };
});

vi.mock('shared/helpers/mitt', () => ({
  emitter: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
}));

vi.mock('dashboard/composables/useLabelSuggestions', () => ({
  useLabelSuggestions: () => ({
    captainTasksEnabled: { value: false },
    isLabelSuggestionFeatureEnabled: { value: false },
    getLabelSuggestions: vi.fn(),
  }),
}));

vi.mock('shared/helpers/localStorage', () => ({
  LocalStorage: {
    getFlag: vi.fn().mockReturnValue(true),
  },
}));

describe('MessagesView.vue', () => {
  let store;
  let getters;
  let actions;

  beforeEach(() => {
    useRoute.mockReturnValue({
      query: {},
    });
    getters = {
      getSelectedChat: () => ({ id: 1, messages: [], status: 'open' }),
      getCurrentUserID: () => 1,
      getAllMessagesLoaded: () => false,
      getCurrentAccountId: () => 1,
      'inboxes/getInbox': () => () => ({}),
      'conversationTypingStatus/getUserList': () => () => [],
    };
    actions = {
      fetchAllAttachments: vi.fn(),
      fetchPreviousMessages: vi.fn(),
      markMessagesRead: vi.fn(),
      fetchMessagesAround: vi.fn(),
    };
    store = createStore({ getters, actions });
  });

  it('scrolls to and highlights message if it exists in DOM', async () => {
    const scrollIntoViewMock = vi.fn();
    document.getElementById = vi.fn().mockReturnValue({
      scrollIntoView: scrollIntoViewMock,
    });
    const routerReplaceMock = vi.fn();

    shallowMount(MessagesView, {
      global: {
        plugins: [store],
        stubs: {
          ReplyBox: true,
          MessageList: true,
          Banner: true,
          ConversationLabelSuggestion: true,
          Spinner: true,
        },
        mocks: {
          $t: msg => msg,
          $route: { query: {} },
          $router: { replace: routerReplaceMock },
        },
      },
    });

    const onScrollToMessageCallback = emitter.on.mock.calls.find(
      call => call[0] === BUS_EVENTS.SCROLL_TO_MESSAGE
    )[1];

    onScrollToMessageCallback({ messageId: 123 });

    await new Promise(resolve => {
      setTimeout(resolve, 0);
    }); // wait for nextTick

    expect(document.getElementById).toHaveBeenCalledWith('message123');
    expect(scrollIntoViewMock).toHaveBeenCalled();
    expect(routerReplaceMock).toHaveBeenCalledWith({
      query: { messageId: 123 },
    });
  });

  it('dispatches fetchMessagesAround if message does not exist in DOM', async () => {
    document.getElementById = vi.fn().mockReturnValue(null);

    shallowMount(MessagesView, {
      global: {
        plugins: [store],
        stubs: {
          ReplyBox: true,
          MessageList: true,
          Banner: true,
          ConversationLabelSuggestion: true,
          Spinner: true,
        },
        mocks: {
          $t: msg => msg,
          $route: { query: {} },
        },
      },
    });

    const onScrollToMessageCallback = emitter.on.mock.calls.find(
      call => call[0] === BUS_EVENTS.SCROLL_TO_MESSAGE
    )[1];

    onScrollToMessageCallback({ messageId: 456 });

    await new Promise(resolve => {
      setTimeout(resolve, 0);
    }); // wait for nextTick

    expect(document.getElementById).toHaveBeenCalledWith('message456');
    expect(actions.fetchMessagesAround).toHaveBeenCalledWith(
      expect.anything(),
      {
        conversationId: 1,
        messageId: 456,
      }
    );
  });
});
