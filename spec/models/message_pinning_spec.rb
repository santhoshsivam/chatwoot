# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Message do
  describe 'database columns' do
    it { is_expected.to have_db_column(:pinned).of_type(:boolean).with_options(default: false, null: false) }
    it { is_expected.to have_db_column(:pinned_at).of_type(:datetime) }
  end

  describe 'scopes' do
    let!(:pinned_message) { create(:message, pinned: true) }
    let!(:unpinned_message) { create(:message, pinned: false) }

    it 'returns pinned messages' do
      expect(described_class.pinned).to include(pinned_message)
      expect(described_class.pinned).not_to include(unpinned_message)
    end
  end
end
