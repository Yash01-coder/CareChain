# CareChain

CareChain is an India-first, open-source digital healthcare platform that helps patients securely own, manage, and share medical records with healthcare providers using modern web technology, encryption, IPFS storage, and blockchain-based verification.

The long-term vision is to build a patient-centric healthcare ecosystem with support for consent-first record sharing, ABDM/ABHA-style identity planning, AI-assisted healthcare features, mobile access, and hospital SaaS workflows.

## Project Status

CareChain is currently in prototype-to-MVP transition.

The project already includes:

- React frontend
- Node.js and Express backend
- MongoDB database
- Solidity smart contracts
- IPFS-based file storage flow
- JWT authentication
- Patient and doctor workflows
- Record upload and access control
- Audit trail foundation

Current focus:

- Repository cleanup
- Open-source preparation
- Startup backlog creation
- CareChain v2.0 MVP planning

## India-First Direction

CareChain is being designed for India first.

The platform will prepare for:

- ABHA-style patient identity fields
- Consent-first record sharing
- Doctor and facility verification
- India-friendly health workflows
- Future ABDM alignment

CareChain is not currently ABDM certified, government approved, or officially integrated with ABHA APIs.

## Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Framer Motion
- Three.js / React Three Fiber
- Axios
- Ethers.js

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- JWT authentication
- Multer
- AES encryption utilities
- Pinata/IPFS integration

### Blockchain

- Solidity
- Hardhat
- Ethers.js

## Project Structure

```txt
CareChain/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env.example
│   └── server.js
├── blockchain/
│   ├── contracts/
│   ├── ignition/
│   ├── .env.example
│   └── hardhat.config.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
├── docs/
│   ├── STARTUP_BACKLOG.md
│   ├── INDIA_ABDM_PLANNING.md
│   └── PHASE_2_SPRINT_1_UI_UX_PLAN.md
├── CONTRIBUTING.md
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── .gitignore
└── README.md

Getting Started
1. Clone the repository
git clone https://github.com/Yash01-coder/CareChain.git
cd CareChain
2. Backend setup
cd backend
npm install
cp .env.example .env
npm run dev
Update .env with your MongoDB, JWT, encryption, Pinata, and blockchain values.
Backend API routes are versioned under:
/api/v1
Examples:
/api/v1/auth
/api/v1/records
/api/v1/doctors
3. Frontend setup
cd frontend
npm install
cp .env.example .env
npm run dev
The frontend uses VITE_API_BASE_URL to connect to the backend API.
For local development:
VITE_API_BASE_URL=http://localhost:5000/api/v1
4. Blockchain setup
cd blockchain
npm install
cp .env.example .env
npx hardhat compile

MVP Roadmap

Phase 1.6 - Cleanup And Backlog
Clean unused files
Protect secrets
Add .env.example
Prepare GitHub README
Create startup backlog
Plan India-first ABDM/ABHA-style structure

Phase 2 - CareChain v2.0 MVP
Professional UI/UX
Patient dashboard
Doctor dashboard
Medical record management
Consent and access control
Blockchain verification
Audit trail
Deployment

Phase 3 - Mobile App
Flutter patient app
QR-based sharing
Push notifications
Offline-friendly access

Phase 4 - AI Features
Report summarization
Prescription explanation
OCR
Intelligent record search

Phase 5 - SaaS Platform
Hospital accounts
Staff roles
Analytics
Enterprise dashboard
Subscription model

Recent MVP Improvements

Added shared authenticated AppShell.
Refactored patient dashboard to use shared layout.
Refactored doctor dashboard to use shared layout.
Moved frontend API base URL to VITE_API_BASE_URL.
Introduced backend /api/v1 route prefix.
Removed password hash from auth API responses.

Security Notes

CareChain handles sensitive healthcare-related data. Before production use:
Do not commit .env files.
Do not use real patient records in demos.
Rotate exposed secrets before publishing.
Add stronger validation and rate limiting.
Improve authentication and authorization flows.
Store blockchain integrity proofs, not medical data.
Complete privacy and compliance review.

Contributing

CareChain is planned as an open-source project.
Please read:
CONTRIBUTING.md
SECURITY.md
CODE_OF_CONDUCT.md

Good first contribution areas include documentation, UI empty states, loading states, environment variable documentation, and small frontend component cleanup.

License

License to be decided.
```