# Implementation Plan: Multiple Pinned Messages

## Phase 1: Database & Backend Implementation
- [x] Task: Create a migration to add a `pinned` boolean and `pinned_at` timestamp to the `messages` table. (fadb56b)
- [x] Task: Update the `Message` model to include scopes for pinned messages. (aa5b33d)
- [ ] Task: Create a `PinsController` (or update `MessagesController`) to handle pinning and unpinning actions.
- [ ] Task: Write tests for pinning and unpinning logic in the `Message` model.
- [ ] Task: Write tests for the `PinsController` (or equivalent) endpoints.
- [ ] Task: Implement a background job or service (if needed) to handle the `pinned_at` timestamp update.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Database & Backend Implementation' (Protocol in workflow.md)

## Phase 2: API & Frontend Integration (Pins List)
- [ ] Task: Update the conversation API to include pinned messages in the response or provide a dedicated endpoint.
- [ ] Task: Create a Vue.js component for the "Pins" icon and count in the conversation header.
- [ ] Task: Create a Vue.js component for the "Pinned Messages" list (dropdown or sidebar).
- [ ] Task: Write tests for the "Pins" list component.
- [ ] Task: Implement the logic to fetch and display pinned messages in the header.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: API & Frontend Integration (Pins List)' (Protocol in workflow.md)

## Phase 3: Navigation & Context Loading
- [ ] Task: Update the message list component to handle "scrolling to a specific message ID".
- [ ] Task: Implement a "Fetch Context" API endpoint to load messages around a specific message ID.
- [ ] Task: Integrate the "Fetch Context" logic into the frontend message loader.
- [ ] Task: Write tests for the context-loading logic (frontend and backend).
- [ ] Task: Add a "Highlight" effect when a message is scrolled into view from the pins list.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Navigation & Context Loading' (Protocol in workflow.md)

## Phase 4: Final Polishing & Testing
- [ ] Task: Perform end-to-end manual verification of the pinning/unpinning and navigation flow.
- [ ] Task: Ensure accessibility (ARIA labels, keyboard navigation) for the new "Pins" UI.
- [ ] Task: Run full test suite (RSpec & Vitest) to check for regressions.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Verification' (Protocol in workflow.md)
