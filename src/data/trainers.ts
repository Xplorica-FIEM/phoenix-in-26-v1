import { Trainer } from '@/types/trainer';

// Sample trainer data for the Phoenix team
export const trainers: Trainer[] = [
  {
    id: 1,
    name: 'Ash Ketchum',
    role: 'Founder & Chief Architect',
    department: 'Leadership',
    category: 'LEAD TRAINER',
    rarity: 'Legendary',
    image: '/trainers/ash.jpg',
    pokemonType: 'Dragon',
    signatureMove: 'Vision Strike',
    hiddenAbility: 'Inspires team members to exceed their limits',
    skills: ['Strategic Planning', 'Full Stack', 'Team Leadership', 'Innovation'],
    stats: {
      power: 95,
      speed: 88,
      logic: 92,
      creativity: 98,
      leadership: 100
    }
  },
  {
    id: 2,
    name: 'Misty Waterflower',
    role: 'Lead DevOps Engineer',
    department: 'Infrastructure',
    category: 'ELITE FOUR',
    rarity: 'Epic',
    image: '/trainers/misty.jpg',
    pokemonType: 'Water',
    signatureMove: 'Cloud Cascade',
    hiddenAbility: 'Maintains perfect uptime under pressure',
    skills: ['AWS', 'Kubernetes', 'CI/CD', 'Monitoring'],
    stats: {
      power: 85,
      speed: 90,
      logic: 88,
      creativity: 75,
      leadership: 82
    }
  },
  {
    id: 3,
    name: 'Brock Harrison',
    role: 'Senior Backend Developer',
    department: 'Engineering',
    category: 'ELITE FOUR',
    rarity: 'Epic',
    image: '/trainers/brock.jpg',
    pokemonType: 'Fire',
    signatureMove: 'API Fortress',
    hiddenAbility: 'Creates unbreakable backend architectures',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis'],
    stats: {
      power: 92,
      speed: 78,
      logic: 95,
      creativity: 70,
      leadership: 80
    }
  },
  {
    id: 4,
    name: 'Dawn Berlitz',
    role: 'Head of Design',
    department: 'Creative',
    category: 'ELITE FOUR',
    rarity: 'Epic',
    image: '/trainers/dawn.jpg',
    pokemonType: 'Grass',
    signatureMove: 'Aesthetic Bloom',
    hiddenAbility: 'Transforms ideas into beautiful interfaces',
    skills: ['UI/UX Design', 'Figma', 'Animation', 'Branding'],
    stats: {
      power: 70,
      speed: 85,
      logic: 75,
      creativity: 100,
      leadership: 78
    }
  },
  {
    id: 5,
    name: 'Gary Oak',
    role: 'Lead Frontend Engineer',
    department: 'Engineering',
    category: 'ELITE FOUR',
    rarity: 'Epic',
    image: '/trainers/gary.jpg',
    pokemonType: 'Electric',
    signatureMove: 'Lightning Component',
    hiddenAbility: 'Builds lightning-fast user interfaces',
    skills: ['React', 'TypeScript', 'Next.js', 'Performance'],
    stats: {
      power: 88,
      speed: 95,
      logic: 90,
      creativity: 85,
      leadership: 75
    }
  },
  {
    id: 6,
    name: 'May Maple',
    role: 'Frontend Developer',
    department: 'Engineering',
    category: 'GYM TRAINERS',
    rarity: 'Rare',
    image: '/trainers/may.jpg',
    pokemonType: 'Electric',
    signatureMove: 'Responsive Surge',
    hiddenAbility: 'Masters mobile-first design patterns',
    skills: ['React', 'CSS', 'Tailwind', 'Accessibility'],
    stats: {
      power: 75,
      speed: 88,
      logic: 80,
      creativity: 82,
      leadership: 70
    }
  },
  {
    id: 7,
    name: 'Max Douglas',
    role: 'Backend Developer',
    department: 'Engineering',
    category: 'GYM TRAINERS',
    rarity: 'Rare',
    image: '/trainers/max.jpg',
    pokemonType: 'Fire',
    signatureMove: 'Data Inferno',
    hiddenAbility: 'Optimizes database queries at scale',
    skills: ['Go', 'MongoDB', 'GraphQL', 'Microservices'],
    stats: {
      power: 80,
      speed: 75,
      logic: 88,
      creativity: 68,
      leadership: 65
    }
  },
  {
    id: 8,
    name: 'Serena Yvonne',
    role: 'Project Manager',
    department: 'Management',
    category: 'COORDINATOR',
    rarity: 'Epic',
    image: '/trainers/serena.jpg',
    pokemonType: 'Psychic',
    signatureMove: 'Workflow Harmony',
    hiddenAbility: 'Coordinates complex projects effortlessly',
    skills: ['Agile', 'Scrum', 'Stakeholder Management', 'Planning'],
    stats: {
      power: 72,
      speed: 82,
      logic: 85,
      creativity: 80,
      leadership: 95
    }
  },
  {
    id: 9,
    name: 'Clemont Citron',
    role: 'Full Stack Developer',
    department: 'Engineering',
    category: 'GYM TRAINERS',
    rarity: 'Rare',
    image: '/trainers/clemont.jpg',
    pokemonType: 'Dragon',
    signatureMove: 'Full Stack Fusion',
    hiddenAbility: 'Connects frontend and backend seamlessly',
    skills: ['React', 'Node.js', 'Docker', 'Testing'],
    stats: {
      power: 78,
      speed: 80,
      logic: 92,
      creativity: 75,
      leadership: 72
    }
  },
  {
    id: 10,
    name: 'Iris Dragon',
    role: 'QA Engineer',
    department: 'Quality',
    category: 'SUPPORT TEAM',
    rarity: 'Rare',
    image: '/trainers/iris.jpg',
    pokemonType: 'Dragon',
    signatureMove: 'Bug Crusher',
    hiddenAbility: 'Finds bugs others miss',
    skills: ['Test Automation', 'Selenium', 'Jest', 'Quality Assurance'],
    stats: {
      power: 70,
      speed: 85,
      logic: 90,
      creativity: 72,
      leadership: 68
    }
  },
  {
    id: 11,
    name: 'Cilan Green',
    role: 'UI/UX Designer',
    department: 'Creative',
    category: 'GYM TRAINERS',
    rarity: 'Rare',
    image: '/trainers/cilan.jpg',
    pokemonType: 'Grass',
    signatureMove: 'Design Garden',
    hiddenAbility: 'Creates organic user experiences',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems'],
    stats: {
      power: 68,
      speed: 78,
      logic: 75,
      creativity: 92,
      leadership: 70
    }
  },
  {
    id: 12,
    name: 'Bonnie Citron',
    role: 'Junior Developer',
    department: 'Engineering',
    category: 'SUPPORT TEAM',
    rarity: 'Common',
    image: '/trainers/bonnie.jpg',
    pokemonType: 'Electric',
    signatureMove: 'Learning Bolt',
    hiddenAbility: 'Rapidly absorbs new technologies',
    skills: ['JavaScript', 'HTML/CSS', 'Git', 'Problem Solving'],
    stats: {
      power: 60,
      speed: 75,
      logic: 70,
      creativity: 78,
      leadership: 55
    }
  }
];
