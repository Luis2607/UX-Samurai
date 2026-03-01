---
name: planning
description: Generates comprehensive implementation plans with bite-sized tasks. Use when you have requirements but haven't started coding.
---

# Planning Implementation

## When to use this skill
- When you have a clear spec or requirements.
- Before writing any code for a multi-step task.
- When the user asks for a "plan" or "implementation strategy".
- Transitioning from the rainstorming skill.

## Workflow

1.  **Context**: Use a dedicated task or worktree.
2.  **Output**: Save plans to planning/plans/YYYY-MM-DD-<feature-name>.md.
3.  **Granularity**: 
    -   Each step must be one atomic action (2-5 minutes).
    -   Follow TDD: Fail -> Pass -> Refactor -> Commit.

## Instructions

Write comprehensive implementation plans assuming the executor has zero context. Document everything needed: files to touch, exact code snippets, testing commands, and verification steps.

**The Golden Rule:** detailed, bite-sized tasks.

### Plan Document Header

Every plan **MUST** start with this header:

`markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]

**Architecture:** [2-3 sentences about approach]

**Tech Stack:** [Key technologies/libraries]

---
`

### Task Structure Template

Use this structure for every task in the plan:

`markdown
### Task N: [Component Name]

**Files:**
- Create: exact/path/to/file.py
- Modify: exact/path/to/existing.py

**Step 1: Write the failing test**
`python
# Code for the test
`

**Step 2: Run test to verify it fails**
Run: [Command]
Expected: FAIL

**Step 3: Write minimal implementation**
`python
# Code to make it pass
`

**Step 4: Run test to verify it passes**
Run: [Command]
Expected: PASS

**Step 5: Commit**
`ash
git add ...
git commit -m "feat: ..."
`
`

## Resources
- No specific templates needed.
