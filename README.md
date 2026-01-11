# Mindora - Personality Quiz Frontend

Modern Next.js frontend for Mindora personality quiz application with JWT authentication. Built with TypeScript, Tailwind CSS, and GSAP animations.

![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)

## 🚀 Features

### Core Functionality
- **JWT Authentication**: Secure user registration and login
- **Interactive Quiz**: 10 personality questions with instant feedback
- **4 Personality Types**: Detailed analysis for Architect, Explorer, Supporter, and Leader
- **Single Attempt**: Each user can take the quiz once
- **Result Persistence**: View your results anytime when logged in
- **Share Results**: Easy link sharing with unique tokens

### Design & UX
- **Responsive**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, accessible design with smooth transitions
- **Progress Tracking**: Visual progress bar based on answers
- **Error Handling**: Comprehensive error boundaries and user feedback

### Technical
- **Type Safety**: Full TypeScript implementation
- **JWT Auth**: Secure token-based authentication
- **Auto-Submit Flow**: Save answers and auto-submit after authentication
- **State Management**: React Hooks with localStorage persistence

## 🛠 Tech Stack

- **Framework**: [Next.js 16.1.1](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [GSAP 3.12](https://greensock.com/gsap/)
- **HTTP Client**: [Axios 1.7](https://axios-http.com/)
- **Fonts**: Google Fonts (Space Grotesk, Orbitron, Inter, DM Sans)

## 🚦 Getting Started

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher
- **Backend API**: Running at `http://localhost:3000`

### Installation

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment variables**
   
   Create a `.env.local` file (already created):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api/quiz
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3001](http://localhost:3001)

## 📜 Available Scripts

- `npm run dev` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 Pages Overview

### 1. Landing Page (`/`)
- Hero section with animated title and floating elements
- Feature cards showcasing quiz benefits
- Personality type previews with glassmorphism effects
- Dynamic past results indicator

### 2. Quiz Page (`/quiz`)
- Progress bar with real-time updates
- Smooth question transitions using GSAP
- Interactive option selection with ripple effects
- Navigation with previous/next/submit buttons
- Auto-save to sessionStorage

### 3. Result Page (`/result/[token]`)
- 3D tilting personality card with mouse tracking
- Animated score breakdown with count-up effects
- Share functionality
- Options to retake or view all results

### 4. My Results Page (`/my-results`)
- Grid view of all past quiz results
- Delete functionality for individual results
- Sorted by date (newest first)
- Quick access to detailed results

## 🔌 API Integration

The frontend integrates with a NestJS backend running at `http://localhost:3000/api/quiz`

### Endpoints:

1. **GET /personalities** - Fetch all personality types
2. **GET /questions** - Fetch quiz questions
3. **POST /submit** - Submit quiz answers
4. **GET /result/:token** - Retrieve result by token

See the code in `lib/api.ts` for implementation details.

## 💾 LocalStorage

Results are stored locally with the key `mindora_quiz_results`:

- Maximum 10 results stored
- Oldest results auto-deleted when limit exceeded
- Handles storage quota errors gracefully

## 🎨 Design Features

### Colors
- **Architect**: Electric Blue (`#00d4ff`)
- **Explorer**: Vibrant Purple (`#a855f7`)
- **Supporter**: Soft Green (`#10b981`)
- **Leader**: Bold Orange (`#f59e0b`)

### Animations
- Hero title fade and scale-in
- Question slide transitions
- Score count-up effects
- 3D tilt effects on cards
- Floating elements
- Pulse glows

## ⚡ Performance

- Code splitting with dynamic imports
- GSAP animations at 60fps
- Optimized images and assets
- Minimal bundle size
- Lazy loaded components

## ♿ Accessibility

- Full keyboard navigation support
- ARIA labels on all interactive elements
- WCAG AA color contrast compliance
- Screen reader friendly
- Focus indicators visible

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import in Vercel dashboard
3. Set environment variable: `NEXT_PUBLIC_API_URL`
4. Deploy

### Build Command
```bash
npm run build
```

## 📝 Project Structure

```
frontend/
├── app/                    # Next.js pages
├── components/             # React components
│   ├── ui/                # Reusable UI
│   ├── quiz/              # Quiz components
│   ├── result/            # Result components
│   ├── layout/            # Layout components
│   └── animations/        # Animation wrappers
├── lib/                   # Utilities
│   ├── api.ts            # API client
│   ├── storage.ts        # LocalStorage
│   ├── animations.ts     # GSAP configs
│   └── types.ts          # TypeScript types
├── hooks/                 # Custom hooks
└── public/                # Static assets
```

## 🔧 Development

This project uses:
- TypeScript strict mode
- ESLint for code quality
- Tailwind CSS for styling
- GSAP for animations

## 📄 License

MIT License

---

**Built with ❤️ for the Mindora personality quiz platform**


## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Kousasy Jbeali