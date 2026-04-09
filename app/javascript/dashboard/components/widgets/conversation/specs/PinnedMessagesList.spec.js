import { shallowMount } from '@vue/test-utils';
import PinnedMessagesList from '../PinnedMessagesList.vue';

vi.mock('shared/helpers/timeHelper', () => ({
  messageStamp: vi.fn(time => time),
}));

describe('PinnedMessagesList.vue', () => {
  it('renders pinned messages with sender and timestamp', () => {
    const pinnedMessages = [
      {
        id: 1,
        content: 'Message 1',
        created_at: 123456789,
        sender: { name: 'Agent 1' },
      },
      {
        id: 2,
        content: 'Message 2',
        created_at: 123456790,
        sender: { name: 'Agent 2' },
      },
    ];
    const wrapper = shallowMount(PinnedMessagesList, {
      props: { pinnedMessages },
      global: {
        stubs: {
          'fluent-icon': true,
        },
        mocks: {
          $t: msg => msg,
        },
      },
    });

    const messages = wrapper.findAll('[data-testid="pinned-message-item"]');
    expect(messages.length).toBe(2);
    expect(messages.at(0).text()).toContain('Message 1');
    expect(messages.at(0).text()).toContain('Agent 1');
    expect(messages.at(1).text()).toContain('Message 2');
    expect(messages.at(1).text()).toContain('Agent 2');
  });

  it('renders empty state when no pinned messages', () => {
    const wrapper = shallowMount(PinnedMessagesList, {
      props: { pinnedMessages: [] },
      global: {
        stubs: {
          'fluent-icon': true,
        },
        mocks: {
          $t: msg => msg,
        },
      },
    });

    expect(wrapper.find('[data-testid="pinned-messages-empty"]').exists()).toBe(
      true
    );
  });
});
