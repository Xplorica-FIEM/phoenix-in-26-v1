# Meet The Trainers - Documentation

A Pokémon-themed team showcase page with interactive cards, category filtering, and full Pokédex-style modal views.

## 🎯 Overview

This feature provides a modern, interactive way to showcase your team members as "trainers" with Pokémon-inspired design elements, including:
- Galaxy animated background
- 3D flip cards on hover
- Category filtering
- Full Pokédex modal view
- Responsive grid layout
- Animated stat bars
- Rarity-based visual effects

## 📁 File Structure

```
src/
├── app/
│   └── trainers/
│       └── page.tsx              # Main trainers page
├── components/
│   └── trainers/
│       ├── TrainerCard.tsx       # Individual trainer card with flip
│       ├── FilterBar.tsx         # Category filter buttons
│       └── TrainerPokedexModal.tsx # Full details modal
├── data/
│   └── trainers.ts               # Trainer data array
└── types/
    └── trainer.ts                # TypeScript interfaces
```

## 🚀 Usage

### Accessing the Page

Navigate to `/trainers` in your application to view the trainers page.

### Adding New Trainers

Edit `src/data/trainers.ts` and add a new trainer object:

```typescript
{
  id: 13,  // Unique ID
  name: 'Your Trainer Name',
  role: 'Position/Role',
  department: 'Department Name',
  category: 'GYM TRAINERS',  // See categories below
  rarity: 'Rare',            // Common | Rare | Epic | Legendary
  image: '/trainers/your-image.jpg',  // Image path (currently using emoji placeholder)
  pokemonType: 'Electric',   // See types below
  signatureMove: 'Special Move Name',
  hiddenAbility: 'Ability description',
  skills: ['Skill 1', 'Skill 2', 'Skill 3'],
  stats: {
    power: 85,      // 0-100
    speed: 90,      // 0-100
    logic: 88,      // 0-100
    creativity: 92, // 0-100
    leadership: 80  // 0-100
  }
}
```

## 📊 Configuration

### Categories

Available trainer categories:
- `LEAD TRAINER` - Top leadership roles
- `ELITE FOUR` - Senior/lead positions
- `GYM TRAINERS` - Mid-level team members
- `SUPPORT TEAM` - Support and junior roles
- `COORDINATOR` - Project managers and coordinators

### Rarity Levels

Each rarity has its own visual styling:
- `Common` - Gray gradient
- `Rare` - Blue gradient
- `Epic` - Purple gradient
- `Legendary` - Gold/Orange gradient

### Pokémon Types

Types are mapped to departments:
- `Electric` - Frontend Development (Yellow)
- `Fire` - Backend Development (Red)
- `Water` - DevOps (Blue)
- `Grass` - Design (Green)
- `Psychic` - Management (Pink)
- `Dragon` - Full Stack (Purple)

## 🎨 Customization

### Changing Colors

Edit the color mappings in the component files:

**TrainerCard.tsx / TrainerPokedexModal.tsx:**
```typescript
const rarityColors = {
  Common: 'from-gray-500 to-gray-600',
  // Add or modify rarity colors here
};

const typeColors = {
  Electric: 'bg-yellow-400/80',
  // Add or modify type colors here
};
```

### Modifying Animations

Animations are defined in `src/app/globals.css`:
- `animate-fadeInUp` - Fade in with upward motion
- `animate-particle` - Floating particle animation
- `animate-glow-pulse` - Pulsing glow effect
- 3D flip transformations (perspective-1000, transform-style-3d)

### Adjusting Grid Layout

In `src/app/trainers/page.tsx`, modify the grid classes:
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
```
- `grid-cols-1` - Mobile (1 column)
- `md:grid-cols-2` - Tablet (2 columns)
- `lg:grid-cols-3` - Laptop (3 columns)
- `xl:grid-cols-4` - Desktop (4 columns)

## ✨ Features Explained

### Card Flip Animation

Cards flip on hover to reveal:
- **Front**: Basic info (name, role, department, rarity)
- **Back**: Detailed info (skills, stats, signature move, hidden ability)

### Pokédex Modal

Click any card to open a full-screen modal with:
- Large trainer display
- Complete stat breakdown
- All skills and abilities
- Entry number formatting (#001, #002, etc.)
- ESC key or click-outside to close

### Category Filtering

Use the filter buttons to show trainers by category. Click "ALL" to show everyone.

### Responsive Design

- **Mobile**: Single column, vertical stacking
- **Tablet**: 2 columns, optimized touch targets
- **Desktop**: 3-4 columns, hover effects enabled

## 🎯 Best Practices

### Images

To add actual trainer images:
1. Place images in `public/trainers/`
2. Name them consistently (e.g., `trainer-name.jpg`)
3. Update the `image` field in trainer data
4. Images should be square (recommended: 512x512px)
5. Optimize images before adding (use WebP format for best performance)

### Stats

Keep stats realistic and balanced:
- Use 0-100 range
- Average team member: 70-85
- Senior members: 85-95
- Leadership: 95-100

### Writing

- **Signature Move**: Keep it short and punchy (2-3 words)
- **Hidden Ability**: One clear sentence (under 60 characters)
- **Skills**: 3-6 relevant technical or soft skills

## 🔧 Troubleshooting

### Cards Not Flipping

Ensure you're hovering (desktop). On mobile, tap the card to flip.

### Modal Not Opening

Check that `onOpenModal` is properly connected in the TrainerCard component.

### Filter Not Working

Verify that trainer categories exactly match one of the defined categories (case-sensitive).

### Animation Issues

Make sure `globals.css` includes all the custom animations and utilities.

## 🎨 Design Philosophy

This page follows the Phoenix project's design guidelines:
- **Orbitron font** for headings and buttons
- **Transparency** compatible with dark/light modes
- **Performance-first** animations using CSS transforms
- **Clean, intentional** design with purpose
- **Pokémon theme** integrated tastefully

## 📝 Notes

- The page uses client-side rendering (`'use client'`) for interactivity
- No external animation libraries (pure CSS + React)
- Fully accessible with keyboard navigation (ESC to close modal)
- Optimized for performance with `transform` and `opacity` animations
- Background uses pure CSS gradients and pseudo-elements

## 🚀 Future Enhancements

Potential additions:
- Add real trainer photos
- Team member search functionality
- Sort by stats/name
- Export trainer cards as images
- Team composition analytics
- Trainer comparison mode
- Achievement badges
- Integration with GitHub profiles
