# PrepForge — Technical Interview & Placement Preparation Platform

PrepForge is a complete, production-oriented SaaS learning and technical interview preparation platform designed for **Aryan** and **Parsa** (plus public student cohorts). It covers the full engineering placement lifecycle:

**Learn → Practice → Take Exams → Analyze Results → Revise Weak Topics → Track Progress**

## 1. Architecture & Technology Stack

- **Frontend**: React 18, TypeScript (Strict Mode), Vite, Tailwind CSS, Lucide Icons, Recharts, React Hook Form + Zod validation patterns
- **Backend & Database**: Firebase Authentication, Cloud Firestore, Firebase Storage, Firebase App Check, Firebase Cloud Functions (`functions/src/index.ts`)
- **Coding Execution**:
  - **Mode A (Built-in Isolated Worker Sandbox)**: Runs Python problem solutions against visible sample test cases (`Run Code`) and hidden test suites (`Submit Solution`) inside an isolated Web Worker with execution timeout (`3000ms`), recursion guard, and zero network/DOM access.
  - **Mode B (External Sandbox Execution API)**: Pluggable HTTP bridge to a Firebase Cloud Function / Judge0 / Piston container cluster (`VITE_SANDBOX_EXECUTION_API_URL`) with explicit Setup-Required diagnostics if external credentials are not yet configured.
- **Excel Integration**: Full 8-step Excel Import Wizard and bidirectional Export supporting all 8 canonical workbook tabs (`Dashboard`, `Master Roadmap`, `Daily Tracker`, `Python Practice`, `AIML Prep`, `Problem Log`, `Interview Q Bank`, `Resources`).

## 2. Installation & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template and populate Firebase keys
cp .env.example .env.local

# 3. Start local development server
npm run dev

# 4. Run automated verification test suite
npm run test
```

## 3. Firebase Setup & Deployment Instructions

1. Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
2. Enable **Authentication** (Email/Password and Google Sign-In providers).
3. Enable **Cloud Firestore** in production mode and deploy rules & composite indexes:
   ```bash
   firebase deploy --only firestore:rules,firestore:indexes,storage:rules
   ```
4. Enable **Firebase App Check** with reCAPTCHA v3 and add the site key to `VITE_FIREBASE_APP_CHECK_SITE_KEY` in `.env.local`.
5. Deploy trusted Cloud Functions for server-validated exams and grading:
   ```bash
   cd functions && npm install && cd ..
   firebase deploy --only functions
   ```
6. Build and deploy the frontend to Firebase Hosting:
   ```bash
   npm run build
   firebase deploy --only hosting
   ```

## 4. Admin Access Setup Procedure

Public registration (`role == 'student'`) **never** grants administrator privileges, and `firestore.rules` strictly blocks any client write that attempts to modify a user's `role` field.

To provision an initial administrator account securely:
1. Register the user account via standard Email/Password signup.
2. Run the administrative claim script from a trusted machine with Firebase Admin SDK credentials (`GOOGLE_APPLICATION_CREDENTIALS` set outside the repository):
   ```bash
   npx ts-node scripts/setAdminClaim.ts admin@prepforge.dev
   ```
   Or set `{ "admin": true }` in Firebase Custom Claims and update `/users/{uid}.role = "admin"` via the Firebase Console / Admin SDK.

## 5. Configured, Working, and Externally Dependent Features Matrix

| Feature Module | Status | Implementation & Security Details |
| :--- | :--- | :--- |
| **Public Website (9 Routes)** | Working Out-of-the-Box | `/`, `/features`, `/subjects`, `/pricing`, `/login`, `/signup`, `/forgot-password`, `/privacy`, `/terms` with zero fake testimonials or payment forms. |
| **Authentication & Profiles** | Working + Live Firebase Ready | Email/password signup, login/logout, email verification state, password reset, profile editing, and instant profile switcher for Aryan, Parsa, Admin, or New Student. Connects to live Firebase Auth when `.env.local` is populated. |
| **5-Track Hierarchical Learning** | Working Out-of-the-Box | All 65 modules across Python (16), DSA (14), SQL/CS (9), AIML (17), and Interview Prep (9) with explanations, code snippets, outputs, common mistakes, notes, bookmarks, and completion persistence. |
| **Randomized Mock Exam Engine** | Working Out-of-the-Box | Configurable exams, Fisher-Yates randomization, server-validated deadline timestamp (`expiresAtMs`), refresh recovery, negative marking, and idempotent scoring lock. |
| **Python Coding Lab** | Working (Isolated Worker) + External API Ready | Supports visible sample runs (`Run Code`) and hidden test case grading (`Submit Solution`) in an isolated sandbox worker, plus explicit Setup-Required state when switched to External Cloud Sandbox mode without an API URL. |
| **8-Sheet Excel Import/Export** | Working Out-of-the-Box | 8-step Import Wizard with column mapping, row-level validation, conflict preview (`Keep Newer App`, `Overwrite`, `Skip`), and multi-sheet `.xlsx`/`.csv` export. |
| **Shared Study Group (Aryan + Parsa)** | Working Out-of-the-Box | Invite code validation (`FORGE-AP-2026`), shared roadmap, side-by-side progress comparison with real dates/metrics, activity feed, and strict private note/draft isolation. |
| **Firestore & Storage Security Rules** | Ready for Deployment | Full `firestore.rules`, `storage.rules`, and `firestore.indexes.json` included and verified by automated tests. |
