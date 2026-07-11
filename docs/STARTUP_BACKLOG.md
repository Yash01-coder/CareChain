# CareChain v2.0 Startup Backlog

CareChain is an India-first, open-source, patient-centric digital health platform powered by blockchain and future AI features.

## Current Priority

Before Phase 2 development starts, we must clean the project and create a proper startup backlog.

## Phase 1.6 - Backlog And Repository Cleanup

### Goals

- Prepare CareChain for open-source GitHub release.
- Remove unused empty files.
- Protect secrets and environment variables.
- Create clear MVP development phases.
- Plan India-first ABDM/ABHA-style health identity support.

### Must Do

- Remove unused empty frontend files.
- Add root `.gitignore`.
- Add `.env.example` files.
- Make sure `.env` files are not pushed to GitHub.
- Replace default Vite README with CareChain README.
- Create clear sprint backlog for CareChain v2.0.

## Phase 2 - CareChain v2.0 MVP

### Sprint 1 - UI/UX Foundation

- Professional landing page
- Patient dashboard
- Doctor dashboard
- Record upload flow
- Record list
- Grant/revoke access flow
- Audit trail page
- Responsive design

### Sprint 2 - Backend Refactor

- Add `/api/v1` routes
- Split controller/service/repository layers
- Add validation
- Add centralized error handling
- Stop returning password hashes
- Standardize API responses

### Sprint 3 - Security And Blockchain

- Improve JWT security
- Add rate limiting
- Add file upload limits
- Store file hash/proof on blockchain
- Improve audit logs
- Strengthen consent model

### Sprint 4 - Deployment

- Deploy frontend
- Deploy backend
- Configure MongoDB Atlas
- Add production environment variables
- Add API documentation
- Add GitHub Actions later

## Future Phases

### Phase 3 - Flutter Mobile App

- Patient mobile app
- QR sharing
- Push notifications
- Biometric unlock

### Phase 4 - AI Features

- Report summary
- Prescription explanation
- OCR
- Intelligent search

### Phase 5 - SaaS Platform

- Hospital accounts
- Staff roles
- Enterprise dashboard
- Subscription plans