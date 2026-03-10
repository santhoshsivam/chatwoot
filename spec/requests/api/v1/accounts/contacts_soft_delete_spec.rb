require 'rails_helper'

RSpec.describe 'Api::V1::Accounts::Contacts Soft Delete', type: :request do
  let(:account) { create(:account) }
  let(:admin) { create(:user, account: account, role: :administrator) }
  let(:contact) { create(:contact, account: account) }

  before do
    # create_new_auth_token relies on the user being saved
    admin.confirm
  end

  describe 'POST /api/v1/accounts/:account_id/contacts/:id/archive' do
    it 'archives the contact' do
      post "/api/v1/accounts/#{account.id}/contacts/#{contact.id}/archive",
           headers: admin.create_new_auth_token,
           as: :json

      expect(response).to have_http_status(:success)
      expect(contact.reload.discarded?).to be true
    end
  end

  describe 'POST /api/v1/accounts/:account_id/contacts/:id/restore' do
    it 'restores the contact' do
      contact.discard
      post "/api/v1/accounts/#{account.id}/contacts/#{contact.id}/restore",
           headers: admin.create_new_auth_token,
           as: :json

      expect(response).to have_http_status(:success)
      expect(contact.reload.discarded?).to be false
    end
  end
end
