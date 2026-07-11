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
│   └── INDIA_ABDM_PLANNING.md
├── .gitignore
└── README.md