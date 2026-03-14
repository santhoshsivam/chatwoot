class HandoffSummaryService
  def initialize(conversation:)
    @conversation = conversation
    @account = conversation.account
  end

  def perform
    return unless captain_tasks_enabled?

    summary_result = generate_summary
    return if summary_result.nil? || summary_result[:error]

    create_private_note(summary_result[:message])
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
end
