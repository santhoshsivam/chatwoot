# Implementation Plan: Auto-generate Handoff Summary

## Phase 1: Research & Discovery
- [ ] Task: Research conversation transfer trigger points in Chatwoot (Rails controllers/models).
- [ ] Task: Explore existing LLM integration services (e.g., `Captain`, `AI::SummaryService`).
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Research & Discovery' (Protocol in workflow.md)

## Phase 2: Backend Implementation
- [ ] Task: Write tests for the `HandoffSummaryService`.
- [ ] Task: Implement the `HandoffSummaryService` to call the LLM and generate the structured summary.
- [ ] Task: Write tests for the transfer interceptor.
- [ ] Task: Implement a hook to trigger the summary generation during conversation transfer.
- [ ] Task: Write tests for creating the private note with the generated summary.
- [ ] Task: Implement the logic to save the summary as a private note.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Backend Implementation' (Protocol in workflow.md)

## Phase 3: Frontend Integration (Optional/Enhancement)
- [ ] Task: Write tests for the handoff UI changes.
- [ ] Task: Update the transfer UI to show a "Generating summary..." state.
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Frontend Integration' (Protocol in workflow.md)

## Phase 4: Final Verification
- [ ] Task: Run full test suite (RSpec & Vitest).
- [ ] Task: Perform end-to-end manual verification of the handoff flow.
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Final Verification' (Protocol in workflow.md)
