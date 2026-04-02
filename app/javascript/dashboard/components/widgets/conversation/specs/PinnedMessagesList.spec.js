import { shallowMount } from '@vue/test-utils';
import PinnedMessagesList from '../PinnedMessagesList.vue';

describe('PinnedMessagesList.vue', () => {
  it('renders pinned messages', () => {
    const pinnedMessages = [
      { id: 1, content: 'Message 1', created_at: 123456789 },
      { id: 2, content: 'Message 2', created_at: 123456790 },
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
    expect(messages.at(1).text()).toContain('Message 2');
  });

  it('renders empty state when no pinned messages', () => {
    const wrapper = shallowMount(PinnedMessagesList, {
      props: { pinnedMessages: [] },
      global: {
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
