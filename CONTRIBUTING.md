# Contributing to Sage Marigold

To keep our development fast and our git history clean during the cohort, please follow these guidelines.

---

## Branching Strategy

**Never push directly to `main`.** All changes must happen on a branch and be merged via a Pull Request.

- `feat/feature-name` -> New features (e.g., `feat/auth-login`)
- `fix/bug-name` -> Bug fixes (e.g., `fix/navbar-mobile-glitch`)
- `docs/change-name` -> Documentation only (e.g., `docs/update-readme`)
- `chore/task-name` -> Maintenance/Setup (e.g., `chore/add-linting`)

---

## Commit Message Convention

We use **Conventional Commits**. This makes it easy to see what each change does at a glance. Your commit message should look like this:

`type: description`

### Common Types:
| Type | Use Case |
| :--- | :--- |
| **feat** | A new feature for the user |
| **fix** | A bug fix |
| **docs** | Documentation changes only |
| **style** | Formatting, missing semi-colons, etc. (no code change) |
| **refactor** | Code change that neither fixes a bug nor adds a feature |
| **chore** | Updating build tasks, package manager configs, etc. |

**Example:** `feat: add user profile picture upload`

---

## The Workflow

1. **Sync with Main:** Before starting any work, ensure your local `main` is up to date.
   ```bash
   git checkout main
   git pull origin main
   ```

2. Create a Branch: 
   ```bash 
   git checkout -b feat/your-feature-name
   ```

3. Commit Regularly: Make small, logical commits.

4. Push & Open PR:
   ```bash
   git push origin feat/your-feature-name
   ```
5. Review: Fill out the PR template. At least one Team Lead must approve before merging.

## Final Rules
- NPM Only: Do not use yarn or pnpm. Our CI pipeline is configured for npm.

- Clean Code: Remove console.log statements before opening a PR.

- Stay Communicative: If you are stuck for more than 30 minutes, ping the group on Discord!

## Code Quality
We use ESLint to keep our code clean. Before pushing, please check your terminal for linting errors. You can run npm run lint to check for issues manually.