# QuizCraft

A modern, server-rendered quiz platform built with Next.js App Router. QuizCraft lets you browse quiz categories, take time-limited quizzes with instant feedback, and view your final score.

---

## 🚀 Features

- **Dynamic Routing & SSR**  
  Category pages (`/quizzes/[category]`) and quiz pages (`/quiz/[id]`) are rendered on the server for SEO and performance.

- **API-First Data**  
  All quiz data is exposed via Next.js API routes (`/api/quizzes/[category]`, `/api/quiz/[id]`).

- **Interactive Client Experience**  
  Client-side React state handles question navigation, answer selection, timer countdown, and immediate feedback.

- **Dynamic Metadata**  
  Per-category SEO tags are generated with `generateMetadata()` in the App Router.

- **Responsive & Animated UI**  
  Built with Tailwind CSS and Lucide icons for a clean, animated design.

---

## 🛠️ Tech Stack

- **Next.js 13 App Router** (Server & Client Components)  
- **TypeScript** for type safety  
- **React** for UI & state management  
- **Tailwind CSS** for utility-first styling  
- **Lucide React** for lightweight SVG icons  

---

## 🎨 Design & Development Approach

1. **AI-Assisted Design & Boilerplate**  
   - Generated an initial Tailwind + Next.js UI mockup via AI prompts.  
   - Used that boilerplate to scaffold core components and styles.

2. **Custom Integration & Logic**  
   - Hand-crafted SSR data-fetching in App Router, wired up API routes under `/api`.  
   - Built dynamic SEO metadata and animated backgrounds by hand.  
   - Implemented client-side quiz state management (timer, question flow, feedback).

3. **Iterative Refinement**  
   - Polished UX animations, color schemes, and responsive layouts.  
   - Ensured accessibility, mobile optimization, and robust error handling.

> _All integration, data-flow wiring, and interactivity logic was developed manually—AI only provided the initial visual and structural boilerplate._




