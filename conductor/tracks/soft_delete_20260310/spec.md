# Track Specification: Implement Soft Delete

## Overview
Implement soft delete functionality for core and configuration entities in Chatwoot to prevent accidental data loss, allow for recovery, and maintain data integrity.

## Goals
- Add soft delete capability to core transactional models and critical configuration models.
- Standardize soft delete using the `discard` gem.
- Update API endpoints to handle soft deleted (archived) records.
- Update the frontend to show "Archive" actions instead of permanent delete for these entities.
- Provide a way to view and restore archived items.

## Success Criteria
- Deleting a targeted entity does not remove it from the database immediately.
- Records are marked as discarded via a `discarded_at` timestamp.
- Discarded records are excluded from default views and API responses but can be retrieved via specific filters.
- Users (with appropriate permissions) can restore discarded records.
- Permanent deletion is only possible after a record has been archived, or via a specific "Purge" action.

## Scope (Target Models)
### Core Transactional Models
- `Conversation`
- `Message` (Migrate existing `deleted` logic to `discard`)
- `Contact`

### Configuration & Content Models
- `Account`
- `User`
- `Inbox`
- `CannedResponse`
- `AutomationRule`
- `Macro`
- `Article` (Help Center)

## Technical Details
- **Gem:** `discard` gem for standardized soft delete.
- **Database:** Add `discarded_at` column to the tables corresponding to the target models.
- **Models:** Include `Discard::Model` in all target models.
- **Cascading:** Handle cascading soft deletes (e.g., discarding an `Account` should ideally discard its `Inboxes`, or at least prevent access).
- **Frontend:** Update Vue.js components to support "Archive" and "Restore" actions for these entities.
