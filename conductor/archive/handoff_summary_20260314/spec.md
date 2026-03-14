# Specification: Auto-generate Handoff Summary

## Goal
Improve agent efficiency and handoff quality by automatically generating a structured summary of a conversation when it's being transferred to another agent or team.

## Requirements
- **Trigger:** Detect when a conversation is about to be transferred.
- **Content:** Use an LLM to generate a summary including:
  - Customer intent
  - Sentiment
  - Key issues discussed
  - Suggested next steps
- **Output:** Insert the summary as a private note within the conversation.
- **Accuracy:** Ensure the summary reflects the actual conversation history.
- **Privacy:** Only use the conversation history for summary generation.

## Technical Details
- **Backend:** Rails service to intercept transfer actions and call the LLM.
- **LLM Integration:** Use the existing Chatwoot LLM infrastructure (e.g., Captain/AI Agent).
- **Frontend:** Trigger the summary generation before the transfer is completed or show a preview.
- **Permissions:** Ensure only authorized agents can trigger and view the summary.
