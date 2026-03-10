class AddDiscardedAtToTargetModels < ActiveRecord::Migration[7.0]
  def change
    add_column :accounts, :discarded_at, :datetime
    add_index :accounts, :discarded_at

    add_column :users, :discarded_at, :datetime
    add_index :users, :discarded_at

    add_column :conversations, :discarded_at, :datetime
    add_index :conversations, :discarded_at

    add_column :messages, :discarded_at, :datetime
    add_index :messages, :discarded_at

    add_column :contacts, :discarded_at, :datetime
    add_index :contacts, :discarded_at

    add_column :inboxes, :discarded_at, :datetime
    add_index :inboxes, :discarded_at

    add_column :canned_responses, :discarded_at, :datetime
    add_index :canned_responses, :discarded_at

    add_column :automation_rules, :discarded_at, :datetime
    add_index :automation_rules, :discarded_at

    add_column :macros, :discarded_at, :datetime
    add_index :macros, :discarded_at

    add_column :articles, :discarded_at, :datetime
    add_index :articles, :discarded_at
  end
end
