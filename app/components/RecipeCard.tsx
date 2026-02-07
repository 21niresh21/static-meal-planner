'use client';
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardMedia, 
  Typography, 
  Box, 
  Stack, 
  Chip, 
  Divider
} from '@mui/material';
import { 
  AccessTime as AccessTimeIcon, 
  Restaurant as RestaurantIcon,
  AttachMoney as MoneyIcon,
  LocalFireDepartment as CaloriesIcon
} from '@mui/icons-material';
import { Recipe } from '../types/recipe';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
}

const MacroBox = ({ label, value, unit, color }: { label: string, value: number, unit: string, color: string }) => (
  <Box sx={{ textAlign: 'center', flex: 1 }}>
    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: 'block' }}>
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 700, color: color }}>
      {value}{unit}
    </Typography>
  </Box>
);

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height="180"
        image={recipe.image}
        alt={recipe.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" sx={{ lineHeight: 1.2, fontWeight: 700 }}>
            {recipe.title}
          </Typography>
          <Chip 
            
            label={`₹${recipe.costPerServing.toFixed(2)}`} 
            size="small" 
            color="primary" 
            variant="outlined" 
            sx={{ fontWeight: 600 }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, height: '3.6em', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {recipe.description}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {recipe.prepTime} prep
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RestaurantIcon sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">
              {recipe.servings} servings
            </Typography>
          </Box>
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ bgcolor: 'background.default', p: 1.5, borderRadius: 2 }}>
          <Stack direction="row" spacing={1} divider={<Divider orientation="vertical" flexItem />}>
            <MacroBox label="Cals" value={recipe.macros.calories} unit="" color="primary.main" />
            <MacroBox label="Protein" value={recipe.macros.protein} unit="g" color="secondary.main" />
            <MacroBox label="Carbs" value={recipe.macros.carbs} unit="g" color="info.main" />
            <MacroBox label="Fat" value={recipe.macros.fat} unit="g" color="error.main" />
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
