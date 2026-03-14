# Initial Concept
Chatwoot is a modern, open-source, and self-hosted customer support platform designed to help businesses deliver exceptional customer support experiences. Built for scale and flexibility, Chatwoot gives you full control over your customer data while providing powerful tools to manage conversations across channels.

# Product Guide

## Product Vision
Empower businesses to provide seamless, omnichannel customer support with an open-source, extensible, and self-hosted platform.

## Target Users
- **Support Agents:** Need a unified inbox to manage and respond to customer queries efficiently.
- **Support Managers:** Need reports and insights to monitor team performance and customer satisfaction.
- **Developers:** Need an extensible platform with robust APIs and integrations.

## Core Features
- **Omnichannel Inbox:** Centralized management of conversations from multiple channels.
- **AI Agent (Captain):** Automate responses and handle routine queries.
- **Help Center:** A portal for publishing FAQs and articles.
- **Collaboration Tools:** Private notes, @mentions, and labels for internal teamwork.
- **Integrations:** Slack, Dialogflow, Shopify, and more.
- **Reporting & Insights:** Dashboards for real-time monitoring and historical analysis.

## Technical Architecture
- **Backend Framework:** Ruby on Rails (MVC architecture), chosen for its developer productivity and robust ecosystem.
- **Frontend Framework:** Vue.js for a responsive and interactive user interface.
- **Communication Layer:** ActionCable for real-time websocket-based updates, ensuring agents see new messages instantly.
- **Database:** PostgreSQL for reliable, scalable relational data storage.
- **Caching & Real-time Support:** Redis for background job queuing (via Sidekiq) and ActionCable's pub/sub mechanism.
- **Extensibility:** A well-defined REST API and webhook system to facilitate custom integrations and third-party app development.
- **Deployment & Scalability:** Containerized with Docker, supporting various deployment options from Heroku to self-hosted Kubernetes clusters.

## Key Goals
- **Accessibility:** Easy to deploy and use for businesses of all sizes.
- **Scalability:** Built to handle high volumes of customer interactions.
- **Extensibility:** Facilitate custom integrations and enhancements through its open-source nature.
