# Implementation Plan: Implement Soft Delete

## Phase 1: Database and Model Layer (Expanded)
- [x] Task: Setup `discard` gem and create migrations for target models (94e5c07)
    - [x] Add `discard` gem to `Gemfile`
    - [x] Run `bundle install`
    - [x] Create migrations to add `discarded_at` to: `accounts`, `users`, `conversations`, `messages`, `contacts`, `inboxes`, `canned_responses`, `automation_rules`, `macros`, `articles`
    - [x] Run migrations
- [ ] Task: Update Models to support soft delete
    - [ ] Include `Discard::Model` in all target models
    - [ ] Update associations to handle cascading soft deletes where appropriate (e.g., `Account` -> `Inboxes`)
    - [ ] Migrate existing `Message` soft delete logic (using the `deleted` attribute) to use the `discard` pattern
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Database and Model Layer (Expanded)' (Protocol in workflow.md)

## Phase 2: API and Controller Layer
- [ ] Task: Update API endpoints for archiving and restoring core entities
    - [ ] Add `archive` and `restore` endpoints for `Conversations` and `Messages`
    - [ ] Add `archive` and `restore` endpoints for `Contacts`
- [ ] Task: Update API endpoints for configuration and content entities
    - [ ] Add `archive` and `restore` endpoints for `Inboxes`
    - [ ] Add `archive` and `restore` endpoints for `CannedResponses`, `AutomationRules`, `Macros`, and `Articles`
- [ ] Task: Update finders and controllers to handle discarded records
    - [ ] Ensure default finders exclude discarded records for all target models
    - [ ] Update dashboard and inbox views to filter out discarded items
- [ ] Task: Conductor - User Manual Verification 'Phase 2: API and Controller Layer' (Protocol in workflow.md)

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
