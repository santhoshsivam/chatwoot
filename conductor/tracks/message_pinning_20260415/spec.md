# Specification: Message Pinning Feature

## Overview
Enable support agents to pin multiple important messages within any conversation in Chatwoot for quick access. Pinned messages should be easily accessible without scrolling through the entire thread.

## Functional Requirements
- **Pinning Action:** Agents can pin/unpin messages across all conversation types.
- **Access Point:** 
  - The most recently pinned message is displayed at the top of the chat thread.
  - A button/indicator at the top allows opening a right-side panel containing all pinned messages.
- **Panel Interaction:** 
  - Scrolling through the list of pinned messages in the side panel.
  - Clicking on a pinned message in the panel scrolls the main conversation thread to that specific message.
- **Persistence:** Pinned messages persist until manually unpinned.
- **Capacity:** Unlimited pins.

## Non-Functional Requirements
- **Performance:** Real-time updates via ActionCable.
- **Data Integrity:** Accurate persistence in the database.

## Acceptance Criteria
- [ ] Pin action available on message context.
- [ ] Most recent pin visible in thread header.
- [ ] Right-side panel toggle to view all pinned messages.
- [ ] Clicking pinned message in panel scrolls thread to target message.
- [ ] Multiple pins correctly ordered.

## Out of Scope
- Role-based pinning restrictions.
- Auto-unpinning.
