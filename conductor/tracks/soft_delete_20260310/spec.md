# Track Specification: Implement Soft Delete

## Overview
Implement soft delete functionality for core entities in Chatwoot (e.g., Conversations, Messages, Contacts) to prevent accidental data loss and allow for recovery.

## Goals
- Add soft delete capability to core models.
- Update API endpoints to handle soft deleted (archived) records.
- Update the frontend to show an "Archive" action instead of permanent delete.
- Provide a way to view and restore archived items.

## Success Criteria
- Deleting a conversation/message/contact does not remove it from the database immediately.
- Records are marked as deleted (e.g., `discarded_at` timestamp).
- Archived records are excluded from default views but can be retrieved via specific filters.
- Users can restore archived records.
- Permanent deletion is only possible after a record has been archived.

## Technical Details
- **Gem:** Consider using `discard` gem for standardized soft delete.
- **Models:** `Conversation`, `Message`, `Contact`.
- **Database:** Add `discarded_at` column to `conversations`, `messages`, `contacts` tables.
- **Frontend:** Update Vue.js components to support "Archive" and "Restore" actions.
