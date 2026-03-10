# Implementation Plan: Implement Soft Delete

## Phase 1: Database and Model Layer
- [ ] Task: Setup `discard` gem and create migrations for core models
    - [ ] Add `discard` gem to `Gemfile`
    - [ ] Run `bundle install`
    - [ ] Create migration to add `discarded_at` to `conversations`, `messages`, and `contacts`
    - [ ] Run migrations
- [ ] Task: Update Models to support soft delete
    - [ ] Include `Discard::Model` in `Conversation`, `Message`, and `Contact`
    - [ ] Update associations to handle cascading soft deletes if necessary
    - [ ] Update existing `Message` soft delete logic to use `discard`
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Database and Model Layer' (Protocol in workflow.md)

## Phase 2: API and Controller Layer
- [ ] Task: Update API endpoints for archiving and restoring records
    - [ ] Add `archive` and `restore` endpoints for `Conversations`
    - [ ] Add `archive` and `restore` endpoints for `Messages`
    - [ ] Add `archive` and `restore` endpoints for `Contacts`
- [ ] Task: Update finders and controllers to handle discarded records
    - [ ] Ensure default finders exclude discarded records
    - [ ] Update dashboard and inbox views to filter out discarded items
- [ ] Task: Conductor - User Manual Verification 'Phase 2: API and Controller Layer' (Protocol in workflow.md)

## Phase 3: Frontend Implementation
- [ ] Task: Update UI for Archive and Restore actions
    - [ ] Replace "Delete" with "Archive" in the Conversation sidebar
    - [ ] Add "Archive" action to Message menu
    - [ ] Implement "Restore" button in an "Archived" view or filter
- [ ] Task: Implement Archived items view/filter
    - [ ] Add a filter to view archived conversations
    - [ ] Display archived messages with a visual indicator
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Frontend Implementation' (Protocol in workflow.md)
