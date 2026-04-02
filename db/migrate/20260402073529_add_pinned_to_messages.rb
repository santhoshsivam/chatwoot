class AddPinnedToMessages < ActiveRecord::Migration[7.1]
  def change
    add_column :messages, :pinned, :boolean, default: false, null: false
    add_column :messages, :pinned_at, :datetime
  end
end
