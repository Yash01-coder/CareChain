# Phase 2 Sprint 1 - UI/UX Implementation Plan

## Objective

Transform CareChain from a prototype interface into a professional, startup-quality healthcare platform UI.

Sprint 1 focuses only on frontend structure, visual consistency, reusable components, and core user flows.

## Scope

This sprint includes:

- App shell and navigation
- Shared layout system
- Patient dashboard improvements
- Doctor dashboard improvements
- Records list UI
- Upload record UI
- Grant/revoke access UI
- Audit trail UI
- Responsive behavior
- Loading, empty, and error states

This sprint does not include:

- Backend refactor
- AI features
- Flutter app
- SaaS billing
- Official ABDM integration
- New blockchain contract changes

## Design Direction

CareChain should feel:

- Trustworthy
- Calm
- Secure
- Modern
- Healthcare-focused
- Startup-quality
- Easy for non-technical users

Avoid:

- Overly academic project styling
- Random gradients everywhere
- Blockchain-heavy language for normal users
- Cluttered dashboards
- Unclear actions
- Pages that feel disconnected from each other

## App Shell

Create a consistent shell for authenticated pages.

Required elements:

- Sidebar or top navigation
- CareChain brand area
- Current page title
- User role indicator
- Logout action
- Responsive mobile menu
- Main content area
- Consistent spacing

## Core Pages

### Patient Dashboard

Purpose:

Give patients a clear overview of their records, access permissions, and recent activity.

Must show:

- Total records
- Active doctor access grants
- Recent uploads
- Recent audit activity
- Primary actions:
  - Upload record
  - View records
  - Grant access
  - View audit trail

### Doctor Dashboard

Purpose:

Help doctors access authorized patient records quickly and responsibly.

Must show:

- Authorized patients
- Recent access activity
- Search or lookup area
- Access status
- Clear permission messaging

### My Records

Purpose:

Show all uploaded records in a clean, searchable format.

Must support:

- Record cards or table
- Record type
- Upload date
- Verification status
- Download action
- Empty state when no records exist

### Upload Record

Purpose:

Make uploading a medical record feel safe and understandable.

Must show:

- File picker
- Record type selector
- Privacy/security note
- Upload progress/loading state
- Success/error feedback

### Grant Access

Purpose:

Let patients control doctor access.

Must show:

- Doctor wallet/address field
- Grant access action
- Revoke access action
- Emergency access option
- Clear warning for emergency access
- Success/error feedback

### Audit Trail

Purpose:

Give patients trust and transparency.

Must show:

- Timeline or table of events
- Action type
- Date/time
- Who performed the action
- Record reference if available
- Empty state

## Reusable Components

Create or standardize:

- `AppShell`
- `Sidebar`
- `PageHeader`
- `StatCard`
- `StatusBadge`
- `EmptyState`
- `LoadingState`
- `ErrorState`
- `PrimaryButton`
- `SecondaryButton`
- `DataTable`
- `RecordCard`

## Acceptance Criteria

Sprint 1 is complete when:

- Authenticated pages share a consistent layout.
- Patient and doctor dashboards look like the same product.
- Core actions are easy to find.
- Empty/loading/error states exist.
- UI is responsive.
- Frontend build passes.
- No new backend behavior is required.