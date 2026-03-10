require 'rails_helper'

RSpec.describe 'Soft Delete (Discard)', type: :model do
  let(:account) { create(:account) }

  shared_examples 'a discardable model' do |factory_name|
    it "responds to discard methods in #{factory_name}" do
      model = if factory_name == :account
                account
              else
                create(factory_name, account: account)
              end
      expect(model).to respond_to(:discard)
      expect(model).to respond_to(:undiscard)
      expect(model).to respond_to(:discarded?)
    end

    it "sets discarded_at when #{factory_name} is discarded" do
      model = if factory_name == :account
                account
              else
                create(factory_name, account: account)
              end
      model.discard
      expect(model.discarded_at).not_to be_nil
      expect(model.discarded?).to be true
    end

    it "excludes discarded #{factory_name} from default scope" do
      model = if factory_name == :account
                account
              else
                create(factory_name, account: account)
              end
      model.discard
      expect(model.class.all).not_to include(model)
      expect(model.class.with_discarded).to include(model)
    end
  end

  context 'with Transactional Models' do
    it_behaves_like 'a discardable model', :conversation
    it_behaves_like 'a discardable model', :message
    it_behaves_like 'a discardable model', :contact
  end

  context 'with Configuration and Content Models' do
    it_behaves_like 'a discardable model', :account
    it_behaves_like 'a discardable model', :inbox
    it_behaves_like 'a discardable model', :canned_response
    it_behaves_like 'a discardable model', :automation_rule
    it_behaves_like 'a discardable model', :macro

    it 'responds to discard methods in article' do
      portal = create(:portal, account: account)
      category = create(:category, account: account, portal: portal)
      article = create(:article, account: account, portal: portal, author: create(:user), category: category)
      expect(article).to respond_to(:discard)
      expect(article).to respond_to(:undiscard)
      expect(article).to respond_to(:discarded?)
    end

    it 'sets discarded_at when article is discarded' do
      portal = create(:portal, account: account)
      category = create(:category, account: account, portal: portal)
      article = create(:article, account: account, portal: portal, author: create(:user), category: category)
      article.discard
      expect(article.discarded_at).not_to be_nil
      expect(article.discarded?).to be true
    end
  end

  context 'with User Model' do
    it 'responds to discard methods in User' do
      user = create(:user)
      expect(user).to respond_to(:discard)
      expect(user).to respond_to(:undiscard)
      expect(user).to respond_to(:discarded?)
    end

    it 'sets discarded_at when user is discarded' do
      user = create(:user)
      user.discard
      expect(user.discarded_at).not_to be_nil
      expect(user.discarded?).to be true
    end
  end

  it 'cascades discard to inboxes from account' do
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
