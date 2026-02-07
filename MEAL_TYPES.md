# Meal Planner - Meal Type Organization Update

## 🎉 New Feature: Meal Type Categories

The app now organizes recipes into **4 meal categories**:

### 🌅 Breakfast (2 recipes)
1. **Protein Pancakes with Berries** - ₹120/serving
   - High protein breakfast with whole wheat pancakes
   - 380 cal | 22g protein | 52g carbs | 8g fat

2. **Masala Oats with Vegetables** - ₹60/serving
   - Savory Indian-style oats
   - 280 cal | 12g protein | 48g carbs | 6g fat

### ☀️ Lunch (2 recipes)
1. **Grilled Chicken Salad Bowl** - ₹200/serving
   - Fresh salad with grilled chicken
   - 320 cal | 38g protein | 18g carbs | 12g fat

2. **Rajma Chawal (Kidney Bean Curry)** - ₹80/serving
   - Classic North Indian comfort food
   - 420 cal | 16g protein | 68g carbs | 8g fat

### 🌙 Dinner (2 recipes)
1. **Lemon Herb Grilled Salmon** - ₹700/serving
   - Premium salmon with asparagus
   - 420 cal | 38g protein | 8g carbs | 26g fat

2. **Paneer Tikka Masala** - ₹180/serving
   - Creamy Indian curry
   - 380 cal | 18g protein | 22g carbs | 24g fat

### 🍎 Snacks (2 recipes)
1. **Protein Energy Balls** - ₹25/serving
   - No-bake healthy snack (makes 12)
   - 120 cal | 6g protein | 16g carbs | 4g fat

2. **Roasted Chickpeas (Chana)** - ₹30/serving
   - Crispy Indian-spiced chickpeas
   - 180 cal | 9g protein | 28g carbs | 4g fat

## 📋 Page Layout

The main page now displays recipes in **separate sections** by meal type:

```
┌─────────────────────────────────────┐
│         Meal Planner Header         │
│   (with subtitle and instructions)  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🌅 Breakfast              2 recipes│
│  ┌────┐  ┌────┐                     │
│  │ 1  │  │ 2  │                     │
│  └────┘  └────┘                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  ☀️ Lunch                  2 recipes│
│  ┌────┐  ┌────┐                     │
│  │ 3  │  │ 4  │                     │
│  └────┘  └────┘                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🌙 Dinner                 2 recipes│
│  ┌────┐  ┌────┐                     │
│  │ 5  │  │ 6  │                     │
│  └────┘  └────┘                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│  🍎 Snack                  2 recipes│
│  ┌────┐  ┌────┐                     │
│  │ 7  │  │ 8  │                     │
│  └────┘  └────┘                     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│         Footer with stats           │
│  8 Total • 2 Breakfast • 2 Lunch    │
│  2 Dinner • 2 Snacks                │
└─────────────────────────────────────┘
```

## 🔄 Drag & Drop Behavior

- **Within Category**: You can drag recipes within their meal type section
- **Order Persists**: Custom order is saved to localStorage
- **Separate Contexts**: Each meal section has its own drag-drop context

## 📝 Adding New Recipes

When adding a new recipe, you **must** specify the `mealType` field:

```typescript
{
  id: '9',
  title: 'Your New Recipe',
  // ... other fields ...
  mealType: 'Breakfast', // Required! Options: 'Breakfast', 'Lunch', 'Dinner', 'Snack'
}
```

The recipe will automatically appear in the correct section!

## 🎨 Visual Indicators

Each meal section has:
- **Emoji icon** (🌅 🌙 ☀️ 🍎)
- **Section header** with meal type name
- **Recipe count badge** showing number of recipes in that category
- **Consistent spacing** between sections

## 💡 Benefits

1. **Better Organization**: Easy to find recipes by meal time
2. **Meal Planning**: Plan your entire day at a glance
3. **Balanced Nutrition**: See variety across meal types
4. **Flexible**: Add as many recipes as you want to each category
5. **Scalable**: Sections automatically show/hide based on available recipes

## 🚀 Technical Implementation

### Type Safety
```typescript
export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
```

### Filtering
```typescript
const getRecipesByMealType = (mealType: MealType) => {
  return recipes.filter(r => r.mealType === mealType);
};
```

### Dynamic Rendering
- Each meal section renders independently
- Empty sections are automatically hidden
- Drag-drop context is scoped to each section

## 📊 Current Recipe Distribution

- **Total**: 8 recipes
- **Breakfast**: 2 recipes (25%)
- **Lunch**: 2 recipes (25%)
- **Dinner**: 2 recipes (25%)
- **Snacks**: 2 recipes (25%)

Perfect balance! 🎯

## 🔮 Future Enhancements

Potential features to add:
- Filter by meal type
- Daily meal plan generator
- Calorie targets per meal
- Grocery list by meal
- Meal prep scheduling
- Nutritional goals tracking

---

**Your meal planner is now fully organized by meal type!** 🎉
