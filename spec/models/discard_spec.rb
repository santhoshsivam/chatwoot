require 'rails_helper'

RSpec.describe 'Soft Delete (Discard)', type: :model do
  let(:account) { create(:account) }

  it 'responds to discard methods in Account' do
    expect(account).to respond_to(:discard)
    expect(account).to respond_to(:undiscard)
    expect(account).to respond_to(:discarded?)
  end

  it 'sets discarded_at when discarded' do
    account.discard
    expect(account.discarded_at).not_to be_nil
    expect(account.discarded?).to be true
  end

  it 'cascades discard to inboxes' do
    inbox = create(:inbox, account: account)
    account.discard
    expect(inbox.reload.discarded?).to be true
  end

  it 'syncs message discarded_at with content_attributes[:deleted]' do
    message = create(:message, account: account)
    message.discard
    expect(message.content_attributes['deleted']).to be true
    message.undiscard
    expect(message.content_attributes['deleted']).to be false
  end
end
