# SyneptLabs React Website

This is the React version of the SyneptLabs/ThoughtHealer website, maintaining the exact same structure and design as the original HTML version.

## Current Status

✅ **Completed:**
- Project structure setup
- Header/Navbar component with dark mode toggle
- Hero section with animations and interactive 3D visualization
- Tailwind CSS configuration matching original design
- Global styles and theme system

🚧 **In Progress:**
Converting remaining sections one by one:
- Card Section
- Services Section
- Features Section  
- Assessment Section
- About Section
- Team Section
- Pricing Section
- Contact Section
- Footer

## Installation

1. Navigate to the react-app directory:
```bash
cd react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will open at [http://localhost:3000](http://localhost:3000)

## Dependencies

- React 18.2.0
- React Router DOM 6.20.0
- Tailwind CSS 3.3.5
- AOS (Animate On Scroll) 2.3.4
- GSAP 3.12.2
- Particles.js 2.0.0

## External Scripts (CDN)

Make sure these scripts are loaded for full functionality:
- Three.js (for 3D effects)
- GSAP & ScrollTrigger
- Particles.js
- Alpine.js (for some interactive components)

## Structure

```
react-app/
├── public/
│   ├── index.html
│   ├── manifest.json
│   └── favicon.png (copy from parent directory)
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   └── HeroSection.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.js
│   ├── index.js
│   └── index.css
├── package.json
└── tailwind.config.js
```

## Features

- ✨ Fully responsive design
- 🌓 Dark/Light mode toggle
- 🎨 Smooth animations with AOS
- 🎭 Interactive 3D visualizations
- 🎯 Particle.js background effects
- 📱 Mobile-friendly navigation

## Next Steps

Continue converting the remaining sections from the original HTML:
1. Card Section (mental health cards)
2. Services Section
3. Features Section (products)
4. Interactive Assessment Section
5. About Section
6. Team Section
7. Pricing Section
8. Contact Form
9. Footer

## Notes

- The website maintains the same structure as the original HTML version
- All animations and effects are preserved
- Dark mode functionality is fully implemented
- The design uses the same Tailwind configuration as the original
