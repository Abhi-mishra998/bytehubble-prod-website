# CI/CD Pipeline Documentation

## Overview

This repository uses GitHub Actions for continuous integration and deployment. The pipeline automatically runs tests, builds the project, and deploys on code changes.

## Workflows

### 1. CI/CD Pipeline (`ci.yml`)
**Triggered on:** Every push to `main` or `develop` branch, and all pull requests

**What it does:**
- Installs dependencies using `npm ci`
- Runs ESLint linting (`npm run lint`)
- Builds the Next.js project (`npm run build`)
- Verifies build artifacts
- Runs on Node.js 18.x and 20.x
- Performs code quality checks (TypeScript, security audit)
- Creates a summary report

**Status:** Can be viewed in the "Actions" tab on GitHub

### 2. Deploy to Production (`deploy.yml`)
**Triggered on:** Push to `main` branch after CI passes

**What it does:**
- Waits for CI pipeline to complete successfully
- Runs a production build
- Verifies the build output
- Prepares for deployment (templates for Vercel, Netlify, AWS S3, Docker included)

**Deployment Platforms Supported:**
- Vercel (Next.js optimized)
- Netlify
- AWS S3 + CloudFront
- Docker (any container platform)

### 3. Scheduled Checks (`scheduled-checks.yml`)
**Triggered on:** Daily at 2 AM UTC (or manually via workflow dispatch)

**What it does:**
- Runs security audit (`npm audit`)
- Checks for outdated packages
- Performs clean rebuild from scratch
- Uploads audit reports

## Setup Instructions

### Step 1: Basic Setup (Already Done ✓)
The workflow files are already created in `.github/workflows/`

### Step 2: Enable GitHub Actions
1. Go to your GitHub repository
2. Navigate to **Settings** → **Actions** → **General**
3. Ensure "Allow all actions and reusable workflows" is selected
4. Click **Save**

### Step 3: Configure Deployment (Optional)

#### Option A: Deploy to Vercel
1. Generate a Vercel token: https://vercel.com/account/tokens
2. Get your Vercel Org ID and Project ID from Vercel dashboard
3. Go to GitHub repo → **Settings** → **Secrets and variables** → **Actions**
4. Add these secrets:
   - `VERCEL_TOKEN` (your Vercel token)
   - `VERCEL_ORG_ID` (your organization ID)
   - `VERCEL_PROJECT_ID` (your project ID)
5. Uncomment the Vercel deployment section in `.github/workflows/deploy.yml`

#### Option B: Deploy to Netlify
1. Generate Netlify token: https://app.netlify.com/user/applications/personal
2. Get your Site ID from Netlify
3. Add secrets to GitHub:
   - `NETLIFY_TOKEN`
   - `NETLIFY_SITE_ID`
4. Uncomment the Netlify section in `deploy.yml`

#### Option C: Deploy to AWS S3
1. Create AWS IAM user with S3 access
2. Add secrets:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_S3_BUCKET`
3. Uncomment AWS S3 section in `deploy.yml`

#### Option D: Docker Container
1. Create Docker Hub account or use AWS ECR
2. Add secrets:
   - `DOCKER_HUB_USERNAME`
   - `DOCKER_HUB_TOKEN`
3. Uncomment Docker section in `deploy.yml`

## Viewing Pipeline Status

### In GitHub
1. Navigate to **Actions** tab in your repository
2. View all workflow runs
3. Click on a specific run to see detailed logs
4. Each job shows real-time output and artifacts

### Status Badge (Optional)
Add this to your README.md:
```markdown
[![CI/CD Pipeline](https://github.com/YOUR_USERNAME/bytehubble-website/actions/workflows/ci.yml/badge.svg)](https://github.com/YOUR_USERNAME/bytehubble-website/actions)
```

## Pipeline Stages

```
Push to main/develop
        ↓
┌─────────────────────────┐
│   CI/CD Pipeline        │
├─────────────────────────┤
│ ✓ Checkout code         │
│ ✓ Setup Node.js         │
│ ✓ Install deps          │
│ ✓ Run linting           │
│ ✓ Build project         │
│ ✓ Verify artifacts      │
│ ✓ Code quality checks   │
└─────────────────────────┘
        ↓
    CI Passes?
        ↓
    YES → Deploy to Production
        ↓
    NO → Notify developer
```

## Build Artifacts

### Stored After Each Build
- `.next` directory (Next.js build output)
- Artifacts are retained for 7 days
- Available in Actions → Workflow Run → Artifacts

### Download Artifacts
1. Go to **Actions** tab
2. Select a workflow run
3. Scroll down to **Artifacts**
4. Download the build output

## Troubleshooting

### Build Fails
1. Check the build logs in **Actions** → **CI/CD Pipeline** → **Build project**
2. Common issues:
   - Missing dependencies: Run `npm ci` locally
   - TypeScript errors: Run `npx tsc --noEmit` locally
   - Lint errors: Run `npm run lint` locally

### Deployment Fails
1. Verify secrets are correctly set in GitHub Settings
2. Check deployment platform credentials
3. Review the deploy logs for specific error messages

### Clear Cache
1. Go to **Actions** → **All workflows**
2. Click **Clear caches** (if available)
3. Rerun workflow

## Environment Variables

### Available in Workflows
- `github.sha` - Commit SHA
- `github.ref` - Branch name
- `GITHUB_STEP_SUMMARY` - For adding to step summary

### Add Custom Variables
In `.github/workflows/*.yml`, add to any step:
```yaml
env:
  NODE_ENV: production
  NEXT_PUBLIC_API_URL: https://api.example.com
```

## Manual Workflow Dispatch

### Run Scheduled Checks Manually
1. Go to **Actions** → **Scheduled Checks**
2. Click **Run workflow** button
3. Select branch (default: main)
4. Click **Run workflow**

## Best Practices

### For Developers
1. **Push frequently** - CI catches issues early
2. **Check Actions status** - Before merging PRs
3. **Review logs** - If CI fails, fix issues locally first
4. **Use feature branches** - For PRs, CI runs automatically

### For Code Quality
1. **Keep linting strict** - Catches code issues
2. **Run builds locally** - Before pushing: `npm run build`
3. **Test on Node 18 & 20** - Both versions are tested
4. **Review security audits** - Check daily reports

## Advanced Configuration

### Skip CI for Certain Commits
Add `[skip ci]` to commit message:
```bash
git commit -m "Update README [skip ci]"
```

### Conditional Steps
Example: Only run on main branch
```yaml
if: github.ref == 'refs/heads/main'
```

### Custom Notifications
Add to workflow to send Slack/email notifications:
```yaml
- name: Send notification
  if: failure()
  run: # Custom notification script
```

## Performance Tips

1. **Use npm ci instead of npm install** ✓ (Already configured)
2. **Cache dependencies** ✓ (Already configured)
3. **Run parallel jobs** ✓ (Already configured)
4. **Minimize artifact retention** ✓ (7 days configured)

## Maintenance

### Regular Tasks
- **Weekly**: Review action logs for patterns
- **Monthly**: Update action versions
- **Quarterly**: Review and update workflows

### Update Actions
Current versions (as of 2026-05-04):
- `actions/checkout@v4`
- `actions/setup-node@v4`
- `actions/upload-artifact@v4`

Update with: `gh action-versions update` (requires gh CLI)

## Support & Documentation

- GitHub Actions Docs: https://docs.github.com/actions
- Next.js Build Guide: https://nextjs.org/docs/app/building-your-application/deploying
- This project: `.github/workflows/` directory

## Next Steps

1. ✅ Workflows are set up
2. ⏳ Push code to trigger CI
3. 📊 View results in Actions tab
4. ⚙️ Configure deployment (optional)
5. 🚀 Automate your releases

---

**Last Updated:** 2026-05-04  
**Maintained by:** Development Team
