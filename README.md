# Go Out With Me - React Version

A fun interactive React application asking "Will You Be My GF?" with animated bunny reactions.

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to see the result.

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build:

```bash
npm run preview
```

## Features

- Interactive "Yes/No" button experience
- Animated Lottie animations
- Responsive design with styled-components
- The "No" button moves randomly when hovered!

## Technologies Used

- React 19
- TypeScript
- Vite
- Styled Components
- React Lottie

## Deployment to Vercel

This project is configured to deploy on Vercel:

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will automatically detect Vite and use the `vercel.json` configuration
5. Click "Deploy"

The `vercel.json` file is already configured to:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: `vite`

## Project Structure

```
src/
  ├── animations/        # Lottie animation JSON files
  ├── components/        # Reusable components
  │   ├── Button.tsx
  │   ├── GlobalStyles.tsx
  │   └── index.ts
  ├── App.tsx           # Main application component
  └── main.tsx          # Application entry point
```
