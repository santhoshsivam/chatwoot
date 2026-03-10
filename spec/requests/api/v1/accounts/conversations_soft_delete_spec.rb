require 'rails_helper'

RSpec.describe 'Api::V1::Accounts::Conversations Soft Delete', type: :request do
  let(:account) { create(:account) }
  let(:agent) { create(:user, account: account, role: :agent) }
  let(:conversation) { create(:conversation, account: account) }

  before do
    create(:inbox_member, user: agent, inbox: conversation.inbox)
  end

  describe 'POST /api/v1/accounts/:account_id/conversations/:id/archive' do
    it 'archives the conversation' do
      post "/api/v1/accounts/#{account.id}/conversations/#{conversation.display_id}/archive",
           headers: agent.create_new_auth_token,
           as: :json

      expect(response).to have_http_status(:success)
      expect(conversation.reload.discarded?).to be true
    end
  end

  describe 'POST /api/v1/accounts/:account_id/conversations/:id/restore' do
    it 'restores the conversation' do
      conversation.discard
      post "/api/v1/accounts/#{account.id}/conversations/#{conversation.display_id}/restore",
           headers: agent.create_new_auth_token,
           as: :json

      expect(response).to have_http_status(:success)
      expect(conversation.reload.discarded?).to be false
    end
  end

  describe 'GET /api/v1/accounts/:account_id/conversations' do
    it 'excludes archived conversations by default' do
      conversation.discard
      get "/api/v1/accounts/#{account.id}/conversations",
          headers: agent.create_new_auth_token,
          as: :json

      expect(response).to have_http_status(:success)
      body = JSON.parse(response.body, symbolize_names: true)
      # Check payload IDs
      payload_ids = body[:data][:payload].map { |c| c[:id] }
      expect(payload_ids).not_to include(conversation.id)
    end
  end
end
