class Api::V1::Accounts::Conversations::PinsController < Api::V1::Accounts::Conversations::BaseController
  def index
    @pinned_messages = @conversation.messages.pinned
    render json: @pinned_messages
  end
end
