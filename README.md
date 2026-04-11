# Tushar Parihar — Portfolio Website

A full-stack personal portfolio built with the MERN Stack.

## 🔗 Live Links
- **Frontend:** 
- **Backend API:**

## 🛠 Tech Stack
- **Frontend:** React.js, TypeScript, CSS Animations
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas + Mongoose
- **Deployment:** Vercel (frontend) + Render (backend)

## ✨ Features
- Animated hero with typewriter effect
- Skills with animated progress bars
- Projects showcase with GitHub + live links
- Education & Experience timeline
- Certifications with modal viewer
- Contact form saved to MongoDB + email notification
- CV download in PDF and DOCX from backend
- Dark / Light mode toggle
- Fully responsive design

## 🚀 Local Setup

### 1. Clone the repo
git clone 
cd portfolio

### 2. Setup Backend
cd server
npm install
cp .env.example .env
# Fill in your values in .env
npm run dev

### 3. Setup Frontend
cd ../client
npm install
cp .env.example .env

npm run dev

## 📁 Folder Structure
portfolio/
  ├── client/     # React frontend
  └── server/     # Express backend
