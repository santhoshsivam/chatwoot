require 'rails_helper'

RSpec.describe HandoffSummaryListener do
  let(:account) { create(:account) }
  let(:conversation) { create(:conversation, account: account) }
  let(:listener) { described_class.instance }

  describe '#assignee_changed' do
    it 'calls HandoffSummaryService when assignee_id is changed from one value to another' do
      agent1 = create(:user, account: account)
      agent2 = create(:user, account: account)
      event = Events::Base.new('assignee.changed', Time.zone.now, {
        conversation: conversation,
        changed_attributes: {
          'assignee_id' => [agent1.id, agent2.id]
        }
      })

      handoff_service = instance_double(HandoffSummaryService)
      expect(HandoffSummaryService).to receive(:new).with(conversation: conversation).and_return(handoff_service)
      expect(handoff_service).to receive(:perform)

      listener.assignee_changed(event)
    end

    it 'does not call HandoffSummaryService when assignee_id is changed from nil to a value' do
      agent2 = create(:user, account: account)
      event = Events::Base.new('assignee.changed', Time.zone.now, {
        conversation: conversation,
        changed_attributes: {
          'assignee_id' => [nil, agent2.id]
        }
      })

      expect(HandoffSummaryService).not_to receive(:new)
      listener.assignee_changed(event)
    end
  end

  describe '#team_changed' do
    it 'calls HandoffSummaryService when team_id is changed from one value to another' do
      team1 = create(:team, account: account)
      team2 = create(:team, account: account)
      event = Events::Base.new('team.changed', Time.zone.now, {
        conversation: conversation,
        changed_attributes: {
          'team_id' => [team1.id, team2.id]
        }
      })

      handoff_service = instance_double(HandoffSummaryService)
      expect(HandoffSummaryService).to receive(:new).with(conversation: conversation).and_return(handoff_service)
      expect(handoff_service).to receive(:perform)

      listener.team_changed(event)
    end
  end
end
