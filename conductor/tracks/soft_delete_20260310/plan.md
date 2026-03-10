# Implementation Plan: Implement Soft Delete

## Phase 1: Database and Model Layer (Expanded) [checkpoint: 90cf3c4]
- [x] Task: Setup `discard` gem and create migrations for target models (94e5c07)
    - [x] Add `discard` gem to `Gemfile`
    - [x] Run `bundle install`
    - [x] Create migrations to add `discarded_at` to: `accounts`, `users`, `conversations`, `messages`, `contacts`, `inboxes`, `canned_responses`, `automation_rules`, `macros`, `articles`
    - [x] Run migrations
- [x] Task: Update Models to support soft delete (4d5d939)
    - [x] Include `Discard::Model` in all target models
    - [x] Update associations to handle cascading soft deletes where appropriate (e.g., `Account` -> `Inboxes`)
    - [x] Migrate existing `Message` soft delete logic (using the `deleted` attribute) to use the `discard` pattern
- [x] Task: Conductor - User Manual Verification 'Phase 1: Database and Model Layer (Expanded)' (Protocol in workflow.md)

## Phase 2: API and Controller Layer [checkpoint: 6de6124]
- [x] Task: Update API endpoints for archiving and restoring core entities (ea70311)
    - [x] Add `archive` and `restore` endpoints for `Conversations` and `Messages`
    - [x] Add `archive` and `restore` endpoints for `Contacts`
- [x] Task: Update API endpoints for configuration and content entities (ea70311)
    - [x] Add `archive` and `restore` endpoints for `Inboxes`
    - [x] Add `archive` and `restore` endpoints for `CannedResponses`, `AutomationRules`, `Macros`, and `Articles`
- [x] Task: Update finders and controllers to handle discarded records (ea70311)
    - [x] Ensure default finders exclude discarded records for all target models
    - [x] Update dashboard and inbox views to filter out discarded items
- [x] Task: Conductor - User Manual Verification 'Phase 2: API and Controller Layer' (Protocol in workflow.md)

## Phase 3: Frontend Implementation
- [ ] Task: Update UI for Archive and Restore actions on Core Entities
    - [ ] Replace "Delete" with "Archive" in the Conversation sidebar
    - [ ] Add "Archive" action to Message menu
    - [ ] Implement "Restore" button in an "Archived" view or filter for conversations
- [ ] Task: Update UI for Archive and Restore actions on Configuration Entities
    - [ ] Add "Archive" action to Inboxes management
    - [ ] Add "Archive" action to Canned Responses, Macros, and Automation Rules
    - [ ] Add "Archive" action to Articles in the Help Center
- [ ] Task: Implement Archived items views/filters
    - [ ] Add a filter to view archived conversations
    - [ ] Create a "Deleted/Archived" section in management settings for Inboxes, Canned Responses, etc.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Frontend Implementation' (Protocol in workflow.md)
