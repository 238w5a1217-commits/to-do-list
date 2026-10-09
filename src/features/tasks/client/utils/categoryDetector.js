export const CATEGORIES = {
  Tech: {
    id: 'Tech',
    name: 'Tech & Code',
    iconName: 'Laptop',
    bg: '#F3E8FF',
    color: '#8B5CF6',
    border: '#E9D5FF',
    keywords: [
      'react', 'js', 'javascript', 'frontend', 'backend', 'node', 'express',
      'code', 'coding', 'program', 'programming', 'bug', 'developer', 'software',
      'api', 'database', 'mongo', 'mongodb', 'css', 'html', 'python', 'git', 'github'
    ]
  },
  Project: {
    id: 'Project',
    name: 'Project & Build',
    iconName: 'FileText',
    bg: '#E0F2FE',
    color: '#0284C7',
    border: '#BAE6FD',
    keywords: [
      'build', 'project', 'app', 'application', 'feature', 'deploy', 'design',
      'architecture', 'wireframe', 'spec', 'docs', 'documentation', 'roadmap', 'todo', 'task'
    ]
  },
  Fitness: {
    id: 'Fitness',
    name: 'Fitness & Health',
    iconName: 'Dumbbell',
    bg: '#FCE7F3',
    color: '#EC4899',
    border: '#FBCFE8',
    keywords: [
      'exercise', 'gym', 'workout', 'training', 'run', 'running', 'jog', 'yoga',
      'fitness', 'stretch', 'walk', 'cardio', 'muscle', 'healthy', 'diet', 'water'
    ]
  },
  Study: {
    id: 'Study',
    name: 'Study & Reading',
    iconName: 'BookOpen',
    bg: '#DCFCE7',
    color: '#16A34A',
    border: '#BBF7D0',
    keywords: [
      'read', 'book', 'study', 'studying', 'learn', 'learning', 'course',
      'tutorial', 'exam', 'lecture', 'homework', 'notes', 'chapter', 'pages', 'revise'
    ]
  },
  Shopping: {
    id: 'Shopping',
    name: 'Shopping & Groceries',
    iconName: 'ShoppingCart',
    bg: '#FFEDD5',
    color: '#EA580C',
    border: '#FED7AA',
    keywords: [
      'buy', 'groceries', 'milk', 'eggs', 'vegetables', 'shopping', 'store',
      'market', 'purchase', 'order', 'cart', 'supermarket', 'essentials', 'food'
    ]
  },
  Career: {
    id: 'Career',
    name: 'Career & Work',
    iconName: 'Briefcase',
    bg: '#FFE4E6',
    color: '#E11D48',
    border: '#FECDD3',
    keywords: [
      'interview', 'dsa', 'resume', 'cv', 'job', 'career', 'meeting',
      'client', 'presentation', 'system design', 'work', 'office', 'contract', 'portfolio'
    ]
  },
  Personal: {
    id: 'Personal',
    name: 'Personal & Home',
    iconName: 'User',
    bg: '#EEF2FF',
    color: '#4F46E5',
    border: '#C7D2FE',
    keywords: [
      'call', 'family', 'mom', 'dad', 'clean', 'cleaning', 'laundry',
      'room', 'doctor', 'appointment', 'bill', 'birthday', 'relax', 'organize'
    ]
  },
  General: {
    id: 'General',
    name: 'General Task',
    iconName: 'CheckSquare',
    bg: '#F1F5F9',
    color: '#64748B',
    border: '#E2E8F0',
    keywords: []
  }
};

/**
 * Automatically detects the best fitting category based on title and description
 * @param {string} title
 * @param {string} description
 * @returns {string} Category key ('Tech' | 'Project' | 'Fitness' | 'Study' | 'Shopping' | 'Career' | 'Personal' | 'General')
 */
export const detectCategory = (title = '', description = '') => {
  const combinedText = `${title} ${description}`.toLowerCase();

  // Score each category based on keyword matches
  let bestCategory = 'General';
  let highestScore = 0;

  for (const [key, meta] of Object.entries(CATEGORIES)) {
    if (key === 'General') continue;

    let score = 0;
    for (const keyword of meta.keywords) {
      // Word boundary match or partial match
      const regex = new RegExp(`\\b${keyword}\\b`, 'i');
      if (regex.test(combinedText)) {
        score += 3;
      } else if (combinedText.includes(keyword)) {
        score += 1;
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestCategory = key;
    }
  }

  return bestCategory;
};

/**
 * Normalizes any category string into a valid category meta
 */
export const getCategoryMeta = (categoryName) => {
  if (!categoryName) return CATEGORIES.General;
  const match = Object.keys(CATEGORIES).find(
    (key) => key.toLowerCase() === categoryName.toLowerCase()
  );
  return match ? CATEGORIES[match] : CATEGORIES.General;
};
