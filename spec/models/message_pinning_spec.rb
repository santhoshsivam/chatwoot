# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Message do
  describe 'database columns' do
    it { is_expected.to have_db_column(:pinned).of_type(:boolean).with_options(default: false, null: false) }
    it { is_expected.to have_db_column(:pinned_at).of_type(:datetime) }
  end
end
