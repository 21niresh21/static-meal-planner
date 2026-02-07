'use client'

import { useState, useEffect } from 'react';
import { Container, Typography, Box, Chip, Tabs, Tab } from '@mui/material';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { recipes as initialRecipes } from './data/recipes';
import { Recipe, MealType } from './types/recipe';
import DraggableRecipeCard from './components/DraggableRecipeCard';
import RecipeDetailModal from './components/RecipeDetailModal';

const STORAGE_KEY = 'meal-planner-recipe-order';

const mealTypes: MealType[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];

const mealIcons: Record<MealType, string> = {
  'Breakfast': '🌅',
  'Lunch': '☀️',
  'Dinner': '🌙',
  'Snack': '🍎',
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`meal-tabpanel-${index}`}
      aria-labelledby={`meal-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Load saved order from localStorage on mount
  useEffect(() => {
    setIsMounted(true);
    const savedOrder = localStorage.getItem(STORAGE_KEY);
    if (savedOrder) {
      try {
        const orderIds = JSON.parse(savedOrder) as string[];
        // Reorder recipes based on saved order
        const orderedRecipes = orderIds
          .map(id => initialRecipes.find(r => r.id === id))
          .filter((r): r is Recipe => r !== undefined);
        
        // Add any new recipes that aren't in the saved order
        const newRecipes = initialRecipes.filter(
          r => !orderIds.includes(r.id)
        );
        
        setRecipes([...orderedRecipes, ...newRecipes]);
      } catch (error) {
        console.error('Failed to load recipe order:', error);
      }
    }
  }, []);

  // Save order to localStorage whenever it changes
  const saveOrder = (newRecipes: Recipe[]) => {
    const orderIds = newRecipes.map(r => r.id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orderIds));
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px of movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setRecipes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        saveOrder(newOrder);
        return newOrder;
      });
    }
  };

  const handleCardClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRecipe(null), 200); // Clear after animation
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Group recipes by meal type
  const getRecipesByMealType = (mealType: MealType) => {
    return recipes.filter(r => r.mealType === mealType);
  };

  const renderRecipeGrid = (mealType: MealType) => {
    const mealRecipes = getRecipesByMealType(mealType);
    
    if (mealRecipes.length === 0) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No {mealType.toLowerCase()} recipes yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Add some delicious {mealType.toLowerCase()} recipes to get started!
          </Typography>
        </Box>
      );
    }

    return (
      <>
        {!isMounted ? (
          // Server-side render: simple grid without drag-drop
          <Box sx={{ 
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 3
          }}>
            {mealRecipes.map((recipe) => (
              <DraggableRecipeCard 
                key={recipe.id} 
                recipe={recipe} 
                onClick={() => handleCardClick(recipe)}
              />
            ))}
          </Box>
        ) : (
          // Client-side render: with drag-drop functionality
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={mealRecipes.map(r => r.id)} strategy={rectSortingStrategy}>
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: 3
              }}>
                {mealRecipes.map((recipe) => (
                  <DraggableRecipeCard 
                    key={recipe.id} 
                    recipe={recipe} 
                    onClick={() => handleCardClick(recipe)}
                  />
                ))}
              </Box>
            </SortableContext>
          </DndContext>
        )}
      </>
    );
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2e7d32 30%, #4caf50 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 1
            }}
          >
            Meal Planner
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400, mb: 1 }}>
            Plan your day with delicious recipes across all meals
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
            💡 Drag and drop to reorder • Click to view details
          </Typography>
        </Box>

        {/* Meal Type Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                fontSize: { xs: '0.875rem', sm: '1rem' },
                fontWeight: 600,
                textTransform: 'none',
                minHeight: 64,
              },
            }}
          >
            {mealTypes.map((mealType, index) => {
              const count = getRecipesByMealType(mealType).length;
              return (
                <Tab 
                  key={mealType}
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <span style={{ fontSize: '1.5rem' }}>{mealIcons[mealType]}</span>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                          {mealType}
                        </Typography>
                        <Chip 
                          label={count} 
                          size="small" 
                          sx={{ 
                            height: 20, 
                            fontSize: '0.75rem',
                            mt: 0.5,
                          }} 
                        />
                      </Box>
                    </Box>
                  }
                  id={`meal-tab-${index}`}
                  aria-controls={`meal-tabpanel-${index}`}
                />
              );
            })}
          </Tabs>
        </Box>

        {/* Tab Panels */}
        {mealTypes.map((mealType, index) => (
          <TabPanel key={mealType} value={activeTab} index={index}>
            {renderRecipeGrid(mealType)}
          </TabPanel>
        ))}

        {/* Footer Stats */}
        <Box sx={{ mt: 6, textAlign: 'center', py: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary">
            {recipes.length} Total {recipes.length === 1 ? 'Recipe' : 'Recipes'} • 
            {' '}{getRecipesByMealType('Breakfast').length} Breakfast • 
            {' '}{getRecipesByMealType('Lunch').length} Lunch • 
            {' '}{getRecipesByMealType('Dinner').length} Dinner • 
            {' '}{getRecipesByMealType('Snack').length} Snacks
          </Typography>
        </Box>
      </Container>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal 
        recipe={selectedRecipe} 
        open={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </Box>
  );
}
