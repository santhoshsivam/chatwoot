# Implementation Plan: Message Pinning

## Phase 1: Database and Backend
- [ ] Task: Database Migration - Add `pinned` state to messages.
- [ ] Task: Backend - Implement `pin` and `unpin` service logic.
    - [ ] Task: TDD - Write unit tests for Pin/Unpin service logic.
    - [ ] Task: Implementation - Write backend logic to pass tests.
- [ ] Task: API - Expose endpoints.
    - [ ] Task: TDD - Write integration tests for Pin API.
    - [ ] Task: Implementation - Implement Controller/API endpoints.
- [ ] Task: Real-time - Update ActionCable dispatchers.
- [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

## Phase 2: Frontend Implementation
- [ ] Task: UI - Context Menu Pin action.
- [ ] Task: UI - Latest pinned message header.
    - [ ] Task: TDD - Write component tests for Header.
    - [ ] Task: Implementation - Write Header UI logic.
- [ ] Task: UI - Right-side panel.
    - [ ] Task: TDD - Write component tests for Pinned Messages Panel.
    - [ ] Task: Implementation - Write Panel UI and scroll logic.
- [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)
