# GCP Branch-Based CI/CD Deployment Setup Guide
**Single Service · Automated Canary · Zero Downtime**

This document describes a production-grade branch-based CI/CD system using **GitLab CI + Google Cloud Run**, with **automatic traffic splitting** and **safe promotions**.

---

## Architecture Overview

- **Single Cloud Run Service:** `web-app`
- **Single GCP Project:** All environments in one project
- **Revision Tags:**
  - `green-test` (preview)
  - `green-deploy` (canary)
  - `blue-prod` (production)
- **Traffic Splitting:** Automatically managed by branch
- **Stable URLs:** Each tag maps to a fixed domain
- **Zero Downtime:** Traffic shifts safely between revisions

---

## Deployment Model (Important)

> **Branch controls deployment**  
> **Tag controls routing**  
> **Traffic percentage controls exposure**

You deploy **one Cloud Run service**, not multiple services.

---

## Files Created

1. **Dockerfile** – Multi-stage React → Nginx build
2. **nginx.conf** – SPA routing + health checks
3. **.dockerignore** – Optimized Docker context
4. **deploy/deploy.sh** – Branch-aware deployment + traffic automation
5. **.gitlab-ci.yml** – GitLab CI/CD pipeline



## Branch → Tag → Traffic Mapping

| Branch        | Revision Tag   | Traffic | Purpose        | URL |
|--------------|---------------|---------|----------------|-----|
| `green-test` | `green-test`  | 0%      | Preview / QA   | green-test.example.com |
| `green-deploy` | `green-deploy` | 10%     | Canary         | green-deploy.example.com |
| `blue-prod`  | `blue-prod`   | 100%    | Production     | blue-prod.example.com |

---

## Automated Deployment Flow

### 1. Merge to `green-test`

- New revision is created
- Tagged as `green-test`
- Receives **0% traffic**
- No impact on users
- Used for QA and validation

✅ Safe preview  
✅ No production risk  

---

### 2. Merge to `green-deploy`

- New revision is created
- Tagged as `green-deploy`
- Receives **10% traffic**
- Remaining **90% stays on `blue-prod`**
- Canary rollout begins

✅ Real user traffic  
✅ Easy rollback  

---

### 3. Merge to `blue-prod`

- New revision is created
- Tagged as `blue-prod`
- Receives **100% traffic**
- Canary closed automatically

✅ Full production rollout  
✅ Zero downtime  

---

## Traffic Management (Automatic)

Traffic is controlled entirely by the deploy script:

- `green-test` → deployed with `--no-traffic`
- `green-deploy` → 10% canary traffic
- `blue-prod` → 100% production traffic

No manual steps  
No UI interaction  
Fully automated  

---

## GitLab CI/CD Variables Setup

**GitLab → Settings → CI/CD → Variables**

### Required Variables

| Variable | Description |
|--------|-------------|
| `GCP_PROJECT_ID` | Google Cloud project ID |
| `GCP_REGION` | Deployment region (default: `us-central1`) |
| `ARTIFACT_REGISTRY_REPO` | Artifact Registry repo name |
| `SERVICE_NAME` | `web-app` |

---

### Build-Time Variables (Vite)

| Variable | Environment |
|--------|-------------|
| `VITE_API_BASE_URL_TEST` | green-test |
| `VITE_API_BASE_URL_STAGING` | green-deploy |
| `VITE_API_BASE_URL_PROD` | blue-prod |

> These are injected at **build time**, which is required for Vite-based apps.

---

## Authentication

### Option 1: Workload Identity Federation (Recommended)

- No service account keys
- Short-lived credentials
- Production-safe

Required IAM roles:
- `roles/run.admin`
- `roles/artifactregistry.writer`
- `roles/iam.serviceAccountUser`

---

### Option 2: Service Account Key (Fallback)

- Store Base64-encoded JSON in:
  - `GCP_SERVICE_ACCOUNT_KEY`

⚠ Not recommended for long-term use.

---

## One-Time GCP Setup

### Enable Required APIs

```bash
gcloud services enable run.googleapis.com artifactregistry.googleapis.com
