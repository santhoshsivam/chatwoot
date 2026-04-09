# Implementation Plan: Multiple Pinned Messages

## Phase 1: Database & Backend Implementation
- [x] Task: Create a migration to add a `pinned` boolean and `pinned_at` timestamp to the `messages` table. (fadb56b)
- [x] Task: Update the `Message` model to include scopes for pinned messages. (aa5b33d)
- [x] Task: Create a `PinsController` (or update `MessagesController`) to handle pinning and unpinning actions. (545fb9a)
- [x] Task: Write tests for pinning and unpinning logic in the `Message` model. (aa5b33d)
- [x] Task: Write tests for the `PinsController` (or equivalent) endpoints. (545fb9a)
- [x] Task: Implement a background job or service (if needed) to handle the `pinned_at` timestamp update. (545fb9a)
- [x] Task: Conductor - User Manual Verification 'Phase 1: Database & Backend Implementation' (Protocol in workflow.md) (e0d27cd)

## Phase 2: API & Frontend Integration (Pins List)
- [x] Task: Update the conversation API to include pinned messages in the response or provide a dedicated endpoint. (3ae74f6)
- [x] Task: Create a Vue.js component for the "Pins" icon and count in the conversation header. (a3ab758)
- [x] Task: Create a Vue.js component for the "Pinned Messages" list (dropdown or sidebar). (d33f5bf)
- [x] Task: Write tests for the "Pins" list component. (d33f5bf)
- [x] Task: Implement the logic to fetch and display pinned messages in the header. (e8f6b21)
- [x] Task: Conductor - User Manual Verification 'Phase 2: API & Frontend Integration (Pins List)' (Protocol in workflow.md) (4754af1)

## Phase 3: Navigation & Context Loading
- [x] Task: Update the message list component to handle "scrolling to a specific message ID". (c61a123)
- [x] Task: Implement a "Fetch Context" API endpoint to load messages around a specific message ID. (c61a123)
- [x] Task: Integrate the "Fetch Context" logic into the frontend message loader. (c61a123)
- [x] Task: Write tests for the context-loading logic (frontend and backend). (c61a123)
- [x] Task: Add a "Highlight" effect when a message is scrolled into view from the pins list. (c61a123)
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Navigation & Context Loading' (Protocol in workflow.md)

## Phase 4: Final Polishing & Testing
- [ ] Task: Perform end-to-end manual verification of the pinning/unpinning and navigation flow.
- [ ] Task: Ensure accessibility (ARIA labels, keyboard navigation) for the new "Pins" UI.
- [ ] Task: Run full test suite (RSpec & Vitest) to check for regressions.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Verification' (Protocol in workflow.md)
