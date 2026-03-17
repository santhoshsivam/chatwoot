# Project Workflow

## Guiding Principles

1. **The Plan is the Source of Truth:** All work must be tracked in `plan.md`
2. **The Tech Stack is Deliberate:** Changes to the tech stack must be documented in `tech-stack.md` *before* implementation
3. **Test-Driven Development:** Write unit tests before implementing functionality
4. **High Code Coverage:** Aim for >80% code coverage for all modules
5. **User Experience First:** Every decision should prioritize user experience
6. **Non-Interactive & CI-Aware:** Prefer non-interactive commands. Use `CI=true` for watch-mode tools (tests, linters) to ensure single execution.
7. **No Automatic Commits:** You don't need to commit anything without my prior approval. Every change must be verified with relevant tests and presented for review before a commit is requested.

## Task Workflow

All tasks follow a strict lifecycle:

### Standard Task Workflow

1. **Select Task:** Choose the next available task from `plan.md` in sequential order

2. **Mark In Progress:** Before beginning work, edit `plan.md` and change the task from `[ ]` to `[~]`

3. **Write Failing Tests (Red Phase):**
   - Create a new test file for the feature or bug fix.
   - Write one or more unit tests that clearly define the expected behavior and acceptance criteria for the task.
   - **CRITICAL:** Run the tests and confirm that they fail as expected. This is the "Red" phase of TDD. Do not proceed until you have failing tests.

4. **Implement to Pass Tests (Green Phase):**
   - Write the minimum amount of application code necessary to make the failing tests pass.
   - Run the test suite again and confirm that all tests now pass. This is the "Green" phase.

5. **Refactor (Optional but Recommended):**
   - With the safety of passing tests, refactor the implementation code and the test code to improve clarity, remove duplication, and enhance performance without changing the external behavior.
   - Rerun tests to ensure they still pass after refactoring.

6. **Verify Coverage:** Run coverage reports using the project's chosen tools. For example, in a Rails project, this might look like:
   ```bash
   bundle exec rspec --format documentation
   ```
   Target: >80% coverage for new code.

7. **Document Deviations:** If implementation differs from tech stack:
   - **STOP** implementation
   - Update `tech-stack.md` with new design
   - Add dated note explaining the change
   - Resume implementation

8. **Request Commit Approval:**
   - **CRITICAL:** Present the changes to the user using `git status` and `git diff`.
   - Propose a clear, concise commit message e.g, `feat(ui): Create basic HTML structure for calculator`.
   - **Wait for explicit user approval** to perform the commit.

9. **Commit Code Changes (Upon Approval):**
   - Stage all code changes related to the task.
   - Perform the commit.

10. **Attach Task Summary with Git Notes:**
    - **Step 10.1: Get Commit Hash:** Obtain the hash of the *just-completed commit* (`git log -1 --format="%H"`).
    - **Step 10.2: Draft Note Content:** Create a detailed summary for the completed task.
    - **Step 10.3: Attach Note:** Use the `git notes` command to attach the summary to the commit.

11. **Update Plan and Request Commit:**
    - **Step 11.1: Update Plan:** Read `plan.md`, find the line for the completed task, update its status from `[~]` to `[x]`, and append the first 7 characters of the commit hash.
    - **Step 11.2: Request Approval:** Present the updated `plan.md` and request permission to commit the plan update.

### Phase Completion Verification and Checkpointing Protocol

**Trigger:** This protocol is executed immediately after a task is completed that also concludes a phase in `plan.md`.

1. **Announce Protocol Start:** Inform the user that the phase is complete and the verification and checkpointing protocol has begun.

2. **Ensure Test Coverage for Phase Changes:**
   - **Step 2.1: Determine Phase Scope:** Find the starting point from `plan.md`.
   - **Step 2.2: List Changed Files:** Execute `git diff --name-only <previous_checkpoint_sha> HEAD`.
   - **Step 2.3: Verify and Create Tests:** Ensure every modified code file has corresponding tests.

3. **Execute Automated Tests with Proactive Debugging:**
   - Announce and execute the test suite (e.g., `bundle exec rspec`).
   - If tests fail, inform the user and attempt a fix (max 2 attempts).

4. **Propose a Detailed, Actionable Manual Verification Plan:**
   - Generate a step-by-step plan for the user to verify the changes manually.

5. **Await Explicit User Feedback:**
   - **PAUSE** and await the user's response: "**Does this meet your expectations? Please confirm with yes or provide feedback.**"

6. **Create Checkpoint Commit (Upon Approval):**
   - Stage all changes and request permission to create the checkpoint commit.
   - Perform the commit with message e.g., `conductor(checkpoint): Checkpoint end of Phase X`.

7. **Attach Verification Report using Git Notes:**
   - Attach a detailed verification report to the checkpoint commit.

8. **Update Plan and Request Commit:**
   - Record the phase checkpoint SHA in `plan.md` and request permission to commit the update.

## Quality Gates

Before marking any task complete, verify:

- [ ] All tests pass
- [ ] Code coverage meets requirements (>80%)
- [ ] Code follows project's code style guidelines
- [ ] All public functions/methods are documented
- [ ] Type safety is enforced
- [ ] No linting or static analysis errors
- [ ] Documentation updated if needed

## Development Commands (Chatwoot)

### Setup
```bash
# Install dependencies
bundle install
pnpm install
# Setup database
bin/rails db:prepare
```

### Daily Development
```bash
# Start development server
foreman start -f ./Procfile.dev
# Run tests
bundle exec rspec
pnpm test
```

### Before Committing
```bash
# Run all pre-commit checks
bundle exec rubocop
pnpm eslint
bundle exec rspec
```

## Commit Guidelines

### Message Format
```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding missing tests
- `chore`: Maintenance tasks
