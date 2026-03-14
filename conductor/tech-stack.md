# Tech Stack

## Core Technologies
- **Backend:** Ruby on Rails (~> 7.1)
- **Frontend:** Vue.js (v3)
- **Database:** PostgreSQL
- **Real-time Engine:** ActionCable (Websockets)
- **Background Jobs:** Sidekiq (Redis)

## Supporting Technologies
- **Languages:** Ruby (3.4.4), JavaScript/TypeScript
- **Styling:** Tailwind CSS, PostCSS
- **State Management:** Vuex / Pinia (inferred)
- **Testing:** RSpec (Ruby), Vitest (JavaScript)
- **Deployment:** Docker, Kubernetes support, Heroku support

## External Integrations (Commonly used)
- **Communication APIs:** Twilio (WhatsApp/SMS), Facebook/Instagram Messenger, Slack, Telegram
- **AI/Chatbots:** Dialogflow, OpenAI (for Captain)
- **Customer Data:** Shopify, Linear
- **Monitoring:** Sentry, New Relic (inferred from config/)

## Architecture Pattern
- **Pattern:** Monolith with a rich frontend application, utilizing MVC for the backend and a component-based architecture for the frontend.
- **API Strategy:** Primarily RESTful, supplemented by WebSockets for real-time interaction.
