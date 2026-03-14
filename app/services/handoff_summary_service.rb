class HandoffSummaryService
  def initialize(conversation:)
    @conversation = conversation
    @account = conversation.account
  end

  def perform
    return unless captain_tasks_enabled?

    broadcast_status('in_progress')
    summary_result = generate_summary

    if summary_result.nil? || summary_result[:error]
      broadcast_status('failed')
      return
    end

    create_private_note(summary_result[:message])
    broadcast_status('completed')
  end

  private

  def captain_tasks_enabled?
    @account.feature_enabled?('captain_tasks')
  end

  def generate_summary
    Captain::SummaryService.new(
      account: @account,
      conversation_display_id: @conversation.display_id
    ).perform
  end

  def create_private_note(content)
    @conversation.messages.create!(
      content: content,
      account_id: @account.id,
      inbox_id: @conversation.inbox_id,
      message_type: :outgoing,
      private: true
    )
  end

  def broadcast_status(status)
    # Broadcast to agents
    tokens = @account.agents.pluck(:pubsub_token) + @account.administrators.pluck(:pubsub_token)
    tokens = tokens.uniq.compact

    return if tokens.blank?

    payload = {
      conversation_id: @conversation.id,
      status: status,
      account_id: @account.id
    }

    ActionCableBroadcastJob.perform_later(tokens, Events::Types::CONVERSATION_SUMMARY_STATUS, payload)
  end
end
