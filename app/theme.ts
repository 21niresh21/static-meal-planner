'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#2e7d32', // A healthy green
            light: '#4caf50',
            dark: '#1b5e20',
        },
        secondary: {
            main: '#ed6c02', // An orange accent for energy/appetite
        },
        background: {
            default: '#f5f7f5',
            paper: '#ffffff',
        },
    },
    typography: {
        fontFamily: 'var(--font-geist-sans), Roboto, Arial, sans-serif',
        h1: {
            fontWeight: 700,
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 600,
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 30px 0 rgba(0,0,0,0.1)',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                },
            },
        },
    },
});

export default theme;
