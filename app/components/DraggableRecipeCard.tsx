'use client';
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, IconButton, Tooltip } from '@mui/material';
import { DragIndicator as DragIcon } from '@mui/icons-material';
import RecipeCard from './RecipeCard';
import { Recipe } from '../types/recipe';

interface DraggableRecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

const DraggableRecipeCard: React.FC<DraggableRecipeCardProps> = ({ recipe, onClick }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: recipe.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      sx={{
        position: 'relative',
        touchAction: 'none',
        '&:hover .drag-handle': {
          opacity: 1,
        },
      }}
    >
      {/* Drag Handle */}
      <Tooltip title="Drag to reorder" placement="top">
        <IconButton
          className="drag-handle"
          {...attributes}
          {...listeners}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(4px)',
            opacity: 0,
            transition: 'opacity 0.2s ease-in-out',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 1)',
            },
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
          size="small"
        >
          <DragIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      
      <Box onClick={onClick}>
        <RecipeCard recipe={recipe} />
      </Box>
    </Box>
  );
};

export default DraggableRecipeCard;
