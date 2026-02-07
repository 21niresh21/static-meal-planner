'use client'

import { useState, useEffect } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { recipes as initialRecipes } from './data/recipes';
import { Recipe } from './types/recipe';
import DraggableRecipeCard from './components/DraggableRecipeCard';
import RecipeDetailModal from './components/RecipeDetailModal';

const STORAGE_KEY = 'meal-planner-recipe-order';

export default function Home() {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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
          <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 400 }}>
            Delicious recipes with complete nutritional information
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
            💡 Drag and drop to reorder • Click to view details
          </Typography>
        </Box>

        {/* Recipe Grid with Drag and Drop */}
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
            {initialRecipes.map((recipe) => (
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
            <SortableContext items={recipes.map(r => r.id)} strategy={rectSortingStrategy}>
              <Box sx={{ 
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)'
                },
                gap: 3
              }}>
                {recipes.map((recipe) => (
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

        {/* Footer Stats */}
        <Box sx={{ mt: 6, textAlign: 'center', py: 3, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="body2" color="text.secondary">
            {recipes.length} {recipes.length === 1 ? 'Recipe' : 'Recipes'} Available
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
