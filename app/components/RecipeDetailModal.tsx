'use client';
import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  Stack,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import {
  Close as CloseIcon,
  AccessTime as AccessTimeIcon,
  Restaurant as RestaurantIcon,
  AttachMoney as MoneyIcon,
} from '@mui/icons-material';
import { Recipe } from '../types/recipe';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  open: boolean;
  onClose: () => void;
}

const MacroCard = ({ label, value, unit, color }: { label: string, value: number, unit: string, color: string }) => (
  <Box sx={{ 
    textAlign: 'center', 
    p: 2, 
    bgcolor: 'background.default', 
    borderRadius: 2,
    border: '2px solid',
    borderColor: color,
  }}>
    <Typography variant="h4" sx={{ fontWeight: 700, color: color, mb: 0.5 }}>
      {value}{unit}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
      {label}
    </Typography>
  </Box>
);

const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({ recipe, open, onClose }) => {
  if (!recipe) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh',
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1,
      }}>
        <Typography variant="h5" component="div" sx={{ fontWeight: 700, pr: 2 }}>
          {recipe.title}
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* Recipe Image */}
        <Box
          component="img"
          src={recipe.image}
          alt={recipe.title}
          sx={{
            width: '100%',
            height: 300,
            objectFit: 'cover',
            borderRadius: 2,
            mb: 3,
          }}
        />

        {/* Description */}
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {recipe.description}
        </Typography>

        {/* Quick Info */}
        <Stack direction="row" spacing={3} sx={{ mb: 3, flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Prep Time
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {recipe.prepTime}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Cook Time
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {recipe.cookTime}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <RestaurantIcon sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Servings
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                {recipe.servings}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MoneyIcon sx={{ fontSize: 20, mr: 1, color: 'primary.main' }} />
            <Box>
              <Typography variant="caption" color="text.secondary" display="block">
                Cost/Serving
              </Typography>
              <Typography variant="body2" fontWeight={600}>
                ₹{recipe.costPerServing.toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Macros */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Nutritional Information (per serving)
        </Typography>
        <Box sx={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 2,
          mb: 3
        }}>
          <MacroCard label="Calories" value={recipe.macros.calories} unit="" color="primary.main" />
          <MacroCard label="Protein" value={recipe.macros.protein} unit="g" color="secondary.main" />
          <MacroCard label="Carbs" value={recipe.macros.carbs} unit="g" color="info.main" />
          <MacroCard label="Fat" value={recipe.macros.fat} unit="g" color="error.main" />
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Ingredients */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Ingredients
        </Typography>
        <List sx={{ bgcolor: 'background.default', borderRadius: 2, mb: 3 }}>
          {recipe.ingredients.map((ingredient, index) => (
            <ListItem key={index} sx={{ py: 1 }}>
              <ListItemText
                primary={
                  <Typography variant="body2">
                    <strong>{ingredient.name}</strong> - {ingredient.amount}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Instructions */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Instructions
        </Typography>
        <List sx={{ pl: 0 }}>
          {recipe.instructions.map((instruction, index) => (
            <ListItem key={index} sx={{ alignItems: 'flex-start', py: 1 }}>
              <Box
                sx={{
                  minWidth: 32,
                  height: 32,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  mr: 2,
                  mt: 0.5,
                }}
              >
                {index + 1}
              </Box>
              <ListItemText
                primary={
                  <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                    {instruction}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Tags */}
        {recipe.tags.length > 0 && (
          <>
            <Divider sx={{ my: 3 }} />
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {recipe.tags.map((tag, index) => (
                <Chip key={index} label={tag} size="small" color="primary" variant="outlined" />
              ))}
            </Stack>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailModal;
