# AlgoMaster Deployment Guide

This guide walks you through deploying the AlgoMaster algorithm course app to GitHub Pages step by step.

## Prerequisites

Before you begin, ensure you have:

1. **GitHub account**: Create a free account at https://github.com if you don't have one
2. **Git installed**: Download from https://git-scm.com/downloads
3. **Code editor** (optional but recommended): VS Code, Sublime Text, or any text editor
4. **Terminal/Command Prompt**: Bash (Mac/Linux) or PowerShell (Windows)

## Step 1: Create a GitHub Repository

1. Log in to GitHub at https://github.com
2. Click the **+** icon in the top-right corner
3. Select **New repository**
4. Configure the repository:
   - **Repository name**: `algo-study`
   - **Description** (optional): "Complete algorithm course with proofs and multi-language solutions"
   - **Visibility**: Public (required for free GitHub Pages)
   - **Initialize with**: Do NOT check "Add a README" — we'll use our own
5. Click **Create repository**

## Step 2: Initialize Git in Your Project

Open your terminal/command prompt and navigate to your project directory:

```bash
cd /path/to/algo-study
```

Initialize a Git repository:

```bash
git init
```

Add the remote GitHub repository (replace `USERNAME` with your GitHub username):

```bash
git remote add origin https://github.com/USERNAME/algo-study.git
```

Verify the remote was added:

```bash
git remote -v
```

You should see:
```
origin  https://github.com/USERNAME/algo-study.git (fetch)
origin  https://github.com/USERNAME/algo-study.git (push)
```

## Step 3: Add Files and Create Initial Commit

Stage all project files:

```bash
git add .
```

Check what will be committed:

```bash
git status
```

Create your initial commit:

```bash
git commit -m "Initial commit: AlgoMaster algorithm course with Vue 3 CDN setup"
```

## Step 4: Push to GitHub

Push your code to GitHub:

```bash
git branch -M main
git push -u origin main
```

The `-u` flag sets `origin/main` as the upstream tracking branch. Future pushes can use just `git push`.

You should now see your code on GitHub at:
```
https://github.com/USERNAME/algo-study
```

## Step 5: Enable GitHub Pages

The deployment workflow (`.github/workflows/deploy.yml`) is already configured. GitHub Pages will automatically publish whenever you push to the `main` branch.

To enable GitHub Actions deployment:

1. Go to your repository on GitHub
2. Click the **Settings** tab
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - **Source**: set to **GitHub Actions** (not "Deploy from a branch")
5. Click **Save**

Now trigger the workflow:

1. Go to the **Actions** tab
2. Look for the "Deploy to GitHub Pages" workflow
3. Click **Run workflow** → **Run workflow** (or push any commit)
4. If it shows a failure, click on it and check the error logs

## Step 6: Access Your Live Site

GitHub Pages will automatically deploy your site when changes are pushed to `main`. Your live site will be available at:

```
https://USERNAME.github.io/algo-study/
```

Replace `USERNAME` with your actual GitHub username.

The first deployment may take 1-2 minutes. Refresh the page if you don't see content immediately.

## Step 7: Update Your Site

To add or modify content:

1. Make changes to your files locally
2. Stage the changes:
   ```bash
   git add .
   ```
3. Commit your changes:
   ```bash
   git commit -m "Describe your changes here"
   ```
4. Push to GitHub:
   ```bash
   git push
   ```

The workflow will automatically redeploy your site within 1-2 minutes.

### Useful Git Commands

View commit history:
```bash
git log --oneline
```

Undo the last commit (if not yet pushed):
```bash
git reset --soft HEAD~1
```

Check current branch and uncommitted changes:
```bash
git status
```

View differences in uncommitted changes:
```bash
git diff
```

## Troubleshooting

### "GitHub Pages is not detecting my changes"

1. Check the **Actions** tab in your GitHub repository
2. Look for the latest "Deploy to GitHub Pages" workflow
3. If it failed, click on it to see error logs
4. Common causes:
   - Branch name is not `main` (rename with: `git branch -M main`)
   - Workflow file is in wrong location (should be `.github/workflows/deploy.yml`)
   - Missing proper Git configuration

### "I see a 404 page on the live site"

1. Ensure you're accessing the correct URL: `https://USERNAME.github.io/algo-study/`
2. Check that the workflow has completed (green checkmark in Actions tab)
3. Hard refresh your browser: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
4. Wait a few minutes for DNS propagation

### "Content appears broken (missing styles, scripts)"

1. Ensure the repository is **Public** (check Settings > General)
2. Verify all CDN links in `index.html` are correct
3. Check browser console for 404 errors (F12 → Console tab)
4. Ensure `assets/main.css` exists and is in the correct location

### "I want to use a custom domain"

1. Go to **Settings > Pages**
2. Under "Custom domain", enter your domain (e.g., `algo.yoursite.com`)
3. Follow GitHub's instructions for DNS configuration
4. Wait 24 hours for DNS changes to propagate

### "I accidentally pushed sensitive data (API keys, passwords)"

1. Do NOT try to pull the repository or share the link
2. Go to Settings > Danger zone > Delete this repository
3. Create a new repository with a different name
4. Remove all sensitive data from your code
5. Push to the new repository

### "My changes aren't showing up"

1. Make sure you committed your changes:
   ```bash
   git status  # should show nothing or only untracked files
   ```
2. Make sure you pushed them:
   ```bash
   git log --oneline -5  # check if your commits are there
   ```
3. Check the Actions tab — is the workflow running?
4. If the workflow says "success", hard refresh your browser

## Advanced: Working with Branches

For larger projects, work on a `develop` branch before pushing to `main`:

```bash
# Create and switch to develop branch
git checkout -b develop

# Make your changes and commit
git add .
git commit -m "Your changes"

# Push to develop
git push -u origin develop

# When ready for production, merge into main
git checkout main
git merge develop
git push
```

## Additional Resources

- **Git documentation**: https://git-scm.com/doc
- **GitHub Pages documentation**: https://docs.github.com/en/pages
- **Vue 3 documentation**: https://vuejs.org/
- **Vue Router documentation**: https://router.vuejs.org/

## Support

If you encounter issues not covered here:

1. Check the GitHub Actions logs (Actions tab → latest workflow run)
2. Search existing GitHub issues for your problem
3. Check browser console for JavaScript errors (F12 → Console)
4. Verify all file paths and imports match your directory structure

---

Happy deploying! Your AlgoMaster course is now live on the web.
