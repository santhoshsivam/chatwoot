require 'rails_helper'

RSpec.describe 'Conversation Pins API', type: :request do
  let!(:account) { create(:account) }
  let!(:agent) { create(:user, account: account, role: :agent) }
  let!(:inbox) { create(:inbox, account: account) }
  let!(:conversation) { create(:conversation, inbox: inbox, account: account) }
  let!(:message) { create(:message, conversation: conversation, account: account) }

  before do
    create(:inbox_member, inbox: inbox, user: agent)
  end

  describe 'POST /api/v1/accounts/{account.id}/conversations/{conversation.id}/messages/{message.id}/pin' do
    it 'pins the message' do
      post "/api/v1/accounts/#{account.id}/conversations/#{conversation.display_id}/messages/#{message.id}/pin",
           headers: agent.create_new_auth_token,
           as: :json

      expect(response).to have_http_status(:success)
      expect(message.reload.pinned).to be true
      expect(message.reload.pinned_at).not_to be_nil
    end
  end

  describe 'POST /api/v1/accounts/{account.id}/conversations/{conversation.id}/messages/{message.id}/unpin' do
    before do
      message.update!(pinned: true, pinned_at: Time.now.utc)
    end

    it 'unpins the message' do
      post "/api/v1/accounts/#{account.id}/conversations/#{conversation.display_id}/messages/#{message.id}/unpin",
           headers: agent.create_new_auth_token,
           as: :json

      expect(response).to have_http_status(:success)
      expect(message.reload.pinned).to be false
    end
  end

  describe 'GET /api/v1/accounts/{account.id}/conversations/{conversation.id}/pins' do
    let!(:pinned_message) { create(:message, conversation: conversation, account: account, pinned: true, pinned_at: Time.now.utc) }

    it 'returns all pinned messages in the conversation' do
      get "/api/v1/accounts/#{account.id}/conversations/#{conversation.display_id}/pins",
          headers: agent.create_new_auth_token,
          as: :json

      expect(response).to have_http_status(:success)
      json_response = response.parsed_body
      expect(json_response.length).to eq(1)
      expect(json_response.first['id']).to eq(pinned_message.id)
    end
  end
end
