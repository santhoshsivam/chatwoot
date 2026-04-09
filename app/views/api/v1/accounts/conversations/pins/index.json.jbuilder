json.array! @pinned_messages do |message|
  json.partial! 'api/v1/models/message', message: message
end
