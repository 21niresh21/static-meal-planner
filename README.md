# Meal Planner - Static Recipe Application

A beautiful static web application displaying recipes organized by meal type (Breakfast, Lunch, Dinner, Snacks) with complete nutritional information, macros, and cost per serving. Built with Next.js and Material-UI.

## Features

- 🍳 **Organized by Meal Type**: Recipes categorized into Breakfast, Lunch, Dinner, and Snacks
- 📊 **Complete Macro Information**: Calories, Protein, Carbs, and Fat for each recipe
- 💰 **Cost Per Serving**: Track the cost of each meal in Indian Rupees (₹)
- ⏱️ **Prep & Cook Times**: Plan your cooking schedule
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations
- 📱 **Mobile Friendly**: Fully responsive layout
- 🔄 **Drag & Drop Reordering**: Rearrange recipes within each meal category - order is saved automatically
- 👆 **Click for Details**: Click any recipe card to view full details, ingredients, and step-by-step instructions
- 💾 **Persistent Order**: Your custom recipe order is saved in browser localStorage and persists across sessions

## Getting Started

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build for Production

```bash
npm run build
npm start
```

## Adding New Recipes

To add new recipes to the application, edit the `app/data/recipes.ts` file.

### Recipe Template

Here's the template for adding a new recipe:

```typescript
{
  id: '2', // Unique ID (increment from last recipe)
  title: 'Your Recipe Name',
  description: 'A brief, appetizing description of your recipe (1-2 sentences)',
  image: 'https://your-image-url.com/image.jpg', // Use Unsplash or similar
  prepTime: '15 mins', // Preparation time
  cookTime: '20 mins', // Cooking time
  servings: 4, // Number of servings
  costPerServing: 475, // Cost per serving in rupees
  macros: {
    calories: 350, // Total calories per serving
    protein: 25,   // Protein in grams
    carbs: 40,     // Carbohydrates in grams
    fat: 12,       // Fat in grams
  },
  ingredients: [
    { name: 'Ingredient 1', amount: '200g' },
    { name: 'Ingredient 2', amount: '1 cup' },
    { name: 'Ingredient 3', amount: '2 tbsp' },
    // Add more ingredients as needed
  ],
  instructions: [
    'Step 1: First instruction',
    'Step 2: Second instruction',
    'Step 3: Third instruction',
    // Add more steps as needed
  ],
  tags: ['Tag1', 'Tag2', 'Tag3'], // e.g., 'High Protein', 'Vegan', 'Quick'
  mealType: 'Lunch', // 'Breakfast', 'Lunch', 'Dinner', or 'Snack'
}
```

### Example: Adding a New Recipe

Open `app/data/recipes.ts` and add your recipe to the array:

```typescript
import { Recipe } from '../types/recipe';

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Lemon Herb Grilled Salmon',
    // ... existing recipe
  },
  // Add your new recipe here:
  {
    id: '2',
    title: 'Chicken Teriyaki Bowl',
    description: 'Tender chicken glazed with homemade teriyaki sauce, served over fluffy rice with steamed vegetables.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop',
    prepTime: '15 mins',
    cookTime: '20 mins',
    servings: 4,
    costPerServing: 350,
    macros: {
      calories: 480,
      protein: 32,
      carbs: 58,
      fat: 10,
    },
    ingredients: [
      { name: 'Chicken breast', amount: '500g' },
      { name: 'Soy sauce', amount: '1/4 cup' },
      { name: 'Brown sugar', amount: '2 tbsp' },
      { name: 'Garlic', amount: '3 cloves, minced' },
      { name: 'Ginger', amount: '1 tbsp, grated' },
      { name: 'Rice', amount: '2 cups, cooked' },
      { name: 'Mixed vegetables', amount: '2 cups' },
    ],
    instructions: [
      'Cut chicken into bite-sized pieces.',
      'Mix soy sauce, brown sugar, garlic, and ginger to make teriyaki sauce.',
      'Cook chicken in a pan over medium-high heat until golden.',
      'Add teriyaki sauce and simmer until chicken is glazed.',
      'Steam vegetables until tender-crisp.',
      'Serve chicken and vegetables over rice.',
    ],
    tags: ['High Protein', 'Asian', 'Family Friendly'],
  }
];
```

### Tips for Finding Recipe Images

- **Unsplash**: [https://unsplash.com/s/photos/food](https://unsplash.com/s/photos/food)
- **Pexels**: [https://www.pexels.com/search/food/](https://www.pexels.com/search/food/)
- Use the image URL format: `?q=80&w=1000&auto=format&fit=crop` for optimized loading

### Calculating Macros

You can use these tools to calculate nutritional information:
- [MyFitnessPal Recipe Calculator](https://www.myfitnesspal.com/recipe/calculator)
- [Nutritionix](https://www.nutritionix.com/)
- [USDA FoodData Central](https://fdc.nal.usda.gov/)

## Project Structure

```
meal-planner/
├── app/
│   ├── components/
│   │   ├── RecipeCard.tsx           # Recipe card component
│   │   ├── DraggableRecipeCard.tsx  # Draggable wrapper for cards
│   │   └── RecipeDetailModal.tsx    # Full recipe detail modal
│   ├── data/
│   │   └── recipes.ts               # Recipe data (EDIT THIS FILE)
│   ├── types/
│   │   └── recipe.ts                # TypeScript interfaces
│   ├── layout.tsx                   # Root layout with MUI theme
│   ├── page.tsx                     # Main page with drag-drop logic
│   └── theme.ts                     # MUI theme configuration
├── public/                          # Static assets
└── package.json
```

## Deployment to Vercel

This application is optimized for deployment on Vercel:

### Quick Deploy

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Visit [vercel.com](https://vercel.com) and sign in
3. Click "New Project" and import your repository
4. Vercel will auto-detect Next.js and configure the build settings
5. Click "Deploy"

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Important Notes for Vercel Deployment

- **Recipe Order Persistence**: User's custom recipe order is saved in browser localStorage, which works perfectly with static deployments
- **No Backend Required**: The app is fully static - no server-side code or database needed
- **Automatic Updates**: When you add new recipes to `app/data/recipes.ts` and push to your repo, Vercel will automatically rebuild and deploy
- **Zero Configuration**: Next.js is automatically detected and configured by Vercel

## How It Works

### Drag & Drop Reordering

- Drag any recipe card to reorder your meal list
- The order is automatically saved to your browser's localStorage
- Your custom order persists across browser sessions
- Works on both desktop (mouse) and mobile (touch)

### Recipe Details

- Click any recipe card to open a detailed modal
- View full ingredients list with amounts
- See step-by-step cooking instructions
- Check complete nutritional breakdown
- View recipe tags and metadata

## Technologies Used

- **Next.js 16** - React framework
- **Material-UI (MUI) v7** - Component library
- **TypeScript** - Type safety
- **Emotion** - CSS-in-JS styling
- **@dnd-kit** - Modern drag-and-drop library
- **localStorage** - Client-side persistence

## License

MIT
