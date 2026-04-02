# Specification: Multiple Pinned Messages (Revised)

## Overview
Agents need a way to keep track of important messages (e.g., specific instructions, key user details, or critical context) within a long conversation without scrolling. This feature allows agents to "pin" multiple messages, making them easily accessible from the conversation header.

## Functional Requirements
- **Pinning Action:**
  - Agents can pin any message (incoming or outgoing) via a "Pin" option in the message action menu.
  - Agents can unpin a message via the same menu or directly from the pinned messages list.
- **Pinned Messages Display:**
  - A "Pins" icon or count will be displayed in the conversation top header bar.
  - Clicking this icon will reveal a list of all pinned messages for the current conversation.
  - The list will show a **Full Message List** preview of each pinned message and its timestamp.
- **Navigation (Scrolling Strategy):**
  - Clicking a pinned message in the list will scroll the main message thread to that specific message and highlight it briefly.
  - **Handling Old Messages:** If the pinned message is from an older part of the conversation (not currently loaded in the UI), the system will:
    1.  Clear the current message view (if necessary).
    2.  Fetch the context around the pinned message (e.g., 10 messages before and after).
    3.  Load this context and scroll directly to the pinned message.
    4.  Allow the agent to load more messages (up/down) from that point.
- **Permissions:**
  - All agents assigned to or with access to the conversation can pin and unpin messages.
- **Scope:**
  - Pinned messages are **Internal Only** and visible only to agents, not to the end customer.
  - There is no hard limit on the number of pinned messages per conversation.

## Acceptance Criteria
- [ ] A message can be pinned and unpinned by any agent.
- [ ] The conversation header displays a list of pinned messages.
- [ ] Clicking a pinned message scrolls the conversation to that message, even if it's very old.
- [ ] Pinned messages are persistent across sessions.
- [ ] Pinned messages are NOT visible to customers on any channel.

## Out of Scope
- Pinning whole conversations (this feature is for messages *within* a conversation).
- Custom categories or folders for pinned messages.
- Global "Pinned Messages" dashboard across all conversations.
