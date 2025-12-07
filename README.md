# Interest Calculator WebApp

## Project Overview
The Interest Calculator WebApp simplifies the process of managing, tracking, and calculating interest on money lent or borrowed between individuals or businesses.

## Core Functionalities
1. **Transaction Management** - Add transactions with date, amount, interest rate, name, contact, mode of payment, and screenshot upload
2. **Account Linking System** - Profiles for each giver/receiver with interlinked transactions
3. **Interest Calculation Module** - Automatic interest calculation (monthly/yearly), simple or compound interest
4. **Reminder & Notification System** - Smart pop-up reminders for upcoming and due payments
5. **Dashboard & Reporting** - Comprehensive dashboard with totals, summaries, graphs, and export options

## Technical Stack
- **Frontend:** Next.js with React and Tailwind CSS
- **Backend:** Node.js with Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Storage:** AWS S3 / Firebase (for screenshots)
- **Notifications:** Cron Jobs + Twilio / WhatsApp API (future)

## Project Structure
```
interest-calculator/
├── frontend/          # Next.js frontend application
├── backend/           # Node.js + Express backend
├── docker-compose.yml # Docker configuration for easy deployment
└── README.md          # This file
```

## Getting Started

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Configure your .env file with database and other credentials
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local
# Configure your .env.local file
npm run dev
```

## Features

### Current Version (v1.0)
- ✅ User Authentication (JWT)
- ✅ Transaction Management (Given/Taken)
- ✅ Person/Account Profiles
- ✅ Interest Calculation (Simple & Compound)
- ✅ Dashboard with Analytics
- ✅ Payment Reminders
- ✅ Export Reports (PDF/Excel)

### Future Upgrades
- Role-based authentication
- Backup and restore options
- AI-based reminders
- Accounting API integration
- Email/SMS/WhatsApp notifications

## API Documentation
API documentation is available at `/api-docs` when running the backend server.

## License
MIT License
