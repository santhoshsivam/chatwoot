class HandoffSummaryListener < BaseListener
  def assignee_changed(event)
    conversation, _account = extract_conversation_and_account(event)
    changed_attributes = event.data[:changed_attributes]

    return unless transfer?(changed_attributes, 'assignee_id')

    HandoffSummaryService.new(conversation: conversation).perform
  end

  def team_changed(event)
    conversation, _account = extract_conversation_and_account(event)
    changed_attributes = event.data[:changed_attributes]

    return unless transfer?(changed_attributes, 'team_id')

    HandoffSummaryService.new(conversation: conversation).perform
  end

  private

  def transfer?(changed_attributes, key)
    return false if changed_attributes.blank? || (!changed_attributes.key?(key) && !changed_attributes.key?(key.to_sym))

    data = changed_attributes[key] || changed_attributes[key.to_sym]
    previous_value = data[0]
    current_value = data[1]

    previous_value.present? && current_value.present? && previous_value != current_value
  end
end
