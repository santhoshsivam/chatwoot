<script setup>
import { useI18n } from 'vue-i18n';
import { messageStamp } from 'shared/helpers/timeHelper';

defineProps({
  pinnedMessages: {
    type: Array,
    default: () => [],
  },
});

const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col h-full bg-n-surface-1">
    <div
      class="flex items-center justify-between px-4 py-3 border-b border-n-weak"
    >
      <h3 class="text-sm font-semibold text-n-slate-12">
        {{ t('CONVERSATION.PINNED_MESSAGES.TITLE') }}
      </h3>
    </div>
    <div class="flex-1 overflow-y-auto">
      <div
        v-if="pinnedMessages.length === 0"
        data-testid="pinned-messages-empty"
        class="flex flex-col items-center justify-center h-full p-8 text-center"
      >
        <fluent-icon icon="pin" size="32" class="mb-4 text-n-slate-10" />
        <p class="text-sm text-n-slate-11">
          {{ t('CONVERSATION.PINNED_MESSAGES.EMPTY') }}
        </p>
      </div>
      <div v-else class="flex flex-col divide-y divide-n-weak">
        <div
          v-for="message in pinnedMessages"
          :key="message.id"
          data-testid="pinned-message-item"
          class="p-4 transition-colors cursor-pointer hover:bg-n-alpha-2"
        >
          <div class="flex items-start gap-3">
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span
                  v-if="message.sender"
                  class="text-xs font-semibold truncate text-n-slate-12"
                >
                  {{ message.sender.name }}
                </span>
                <span
                  class="text-[10px] text-n-slate-10 whitespace-nowrap ml-2"
                >
                  {{ messageStamp(message.created_at) }}
                </span>
              </div>
              <p class="text-sm text-n-slate-12 line-clamp-3">
                {{ message.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
