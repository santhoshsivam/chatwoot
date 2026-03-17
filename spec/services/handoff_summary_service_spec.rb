require 'rails_helper'

RSpec.describe HandoffSummaryService do
  let(:account) { create(:account) }
  let(:conversation) { create(:conversation, account: account) }
  let(:service) { described_class.new(conversation: conversation) }

  before do
    allow(account).to receive(:feature_enabled?).and_call_original
    allow(account).to receive(:feature_enabled?).with('captain_tasks').and_return(true)
    InstallationConfig.find_or_create_by(name: 'CAPTAIN_OPEN_AI_API_KEY') do |config|
      config.value = 'test-key'
    end
  end

  describe '#perform' do
    it 'calls Captain::SummaryService and creates a private note' do
      summary_content = "Customer Intent: Help\nSummary: Problem solved\nAction Items: Done"
      summary_service = instance_double(Captain::SummaryService)
      allow(Captain::SummaryService).to receive(:new).with(
        account: account,
        conversation_display_id: conversation.display_id
      ).and_return(summary_service)

      allow(summary_service).to receive(:perform).and_return({ message: summary_content })

      expect { service.perform }.to change { conversation.messages.count }.by(1)

      last_message = conversation.messages.last
      expect(last_message.content).to include(summary_content)
      expect(last_message.private).to be true
      expect(last_message.message_type).to eq('outgoing')
    end

    it 'does not create a note if Captain::SummaryService returns an error' do
      summary_service = instance_double(Captain::SummaryService)
      allow(Captain::SummaryService).to receive(:new).and_return(summary_service)
      allow(summary_service).to receive(:perform).and_return({ error: 'LLM failed' })

      expect { service.perform }.not_to change { conversation.messages.count }
    end

    it 'does not create a note if captain_tasks feature is disabled' do
      allow(account).to receive(:feature_enabled?).with('captain_tasks').and_return(false)

      expect { service.perform }.not_to change { conversation.messages.count }
    end
  end
end
