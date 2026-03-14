# Implementation Plan: Auto-generate Handoff Summary

## Phase 1: Research & Discovery
- [x] Task: Research conversation transfer trigger points in Chatwoot (Rails controllers/models).
- [x] Task: Explore existing LLM integration services (e.g., `Captain`, `AI::SummaryService`).
- [x] Task: Conductor - User Manual Verification 'Phase 1: Research & Discovery' (Protocol in workflow.md)

## Phase 2: Backend Implementation
- [x] Task: Write tests for the `HandoffSummaryService`.
- [x] Task: Implement the `HandoffSummaryService` to call the LLM and generate the structured summary.
- [x] Task: Write tests for the transfer interceptor.
- [x] Task: Implement a hook to trigger the summary generation during conversation transfer.
- [x] Task: Write tests for creating the private note with the generated summary.
- [x] Task: Implement the logic to save the summary as a private note.
- [x] Task: Conductor - User Manual Verification 'Phase 2: Backend Implementation' (Protocol in workflow.md) (1d5c6bd)

## Phase 3: Frontend Integration (Optional/Enhancement)
- [x] Task: Write tests for the handoff UI changes.
- [x] Task: Update the transfer UI to show a "Generating summary..." state.
- [x] Task: Conductor - User Manual Verification 'Phase 3: Frontend Integration' (Protocol in workflow.md) (fdce08d)

## Phase 4: Final Verification
- [~] Task: Run full test suite (RSpec & Vitest).
- [ ] Task: Perform end-to-end manual verification of the handoff flow.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Verification' (Protocol in workflow.md)
