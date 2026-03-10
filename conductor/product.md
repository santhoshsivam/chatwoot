# Initial Concept

Chatwoot is an open-source, self-hosted customer support platform that centralizes conversations from various channels.

# Product Guide: Chatwoot

## Overview
Chatwoot is an open-source, omni-channel customer engagement suite that allows companies to manage their customer support across various channels like live chat, email, Facebook, Instagram, Twitter, WhatsApp, Telegram, and more. It is built using Ruby on Rails and Vue.js.

## Target Audience
- **Customer Support Teams:** Who need a unified inbox for all customer queries.
- **SMBs and Enterprises:** Looking for a self-hosted alternative to Intercom or Zendesk.
- **Open-Source Enthusiasts:** Who want to customize and extend their support platform.

## Key Goals
- **Unified Communication:** Centralize all customer conversations.
- **Automation:** Use AI and rule-based automation to handle repetitive tasks.
- **Scalability:** Design a system that can handle thousands of concurrent conversations.
- **Self-Hosting:** Provide a robust platform that users can host on their own infrastructure.

## Core Features
- **Omni-channel Support:** Connect various communication channels.
- **Shared Inbox:** Allow multiple agents to collaborate on conversations.
- **Canned Responses:** Speed up support with pre-defined answers.
- **AI Agent (Captain):** Automate responses and summaries.
- **Help Center:** Create knowledge base articles for self-service.
- **Integrations:** Connect with Slack, Webhooks, and other third-party services.

## Design Philosophy
- **Modern UI:** A clean and responsive dashboard for agents.
- **Extensibility:** A modular architecture for adding new channels and integrations.
- **Data Privacy:** Full control over customer data through self-hosting.

## Technical Requirements
- **Backend:** Ruby on Rails 7.x
- **Frontend:** Vue.js 3 with Tailwind CSS
- **Database:** PostgreSQL
- **Caching/Pub-Sub:** Redis
- **Background Jobs:** Sidekiq
- **Storage:** S3-compatible storage for attachments

## Future Roadmap
- Improved AI capabilities for agent assistance.
- Enhanced analytics and reporting.
- More native channel integrations.
