import { createContext, useState, useMemo, useContext, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#6366f1' : '#818cf8',
            light: '#818cf8',
            dark: '#4f46e5',
            contrastText: '#ffffff',
          },
          secondary: {
            main: mode === 'light' ? '#f59e0b' : '#fbbf24',
            light: '#fbbf24',
            dark: '#d97706',
            contrastText: '#ffffff',
          },
          background: {
            // ✅ الألوان الجديدة - أسود حقيقي
            default: mode === 'light' ? '#f9fafb' : '#000000', // أسود نقي
            paper: mode === 'light' ? '#ffffff' : '#0a0a0a',   // أسود داكن جداً
          },
          text: {
            primary: mode === 'light' ? '#111827' : '#ffffff',   // أبيض نقي
            secondary: mode === 'light' ? '#6b7280' : '#a1a1aa', // رمادي فاتح
          },
          divider: mode === 'light' ? '#e5e7eb' : '#27272a', // فاصل داكن
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: { fontWeight: 700 },
          h2: { fontWeight: 700 },
          h3: { fontWeight: 600 },
          button: {
            textTransform: 'none',
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 8,
                padding: '10px 24px',
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                boxShadow:
                  mode === 'light'
                    ? '0 4px 6px -1px rgba(0,0,0,0.1)'
                    : '0 4px 6px -1px rgba(255,255,255,0.05)', // ظل أخف في Dark
                // ✅ border في Dark Mode
                border: mode === 'dark' ? '1px solid #27272a' : 'none',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#ffffff' : '#0a0a0a', // أسود
                // ✅ border بدل box-shadow في Dark
                borderBottom: mode === 'dark' ? '1px solid #27272a' : '1px solid #e5e7eb',
              },
            },
          },
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === 'light' ? '#ffffff' : '#0a0a0a', // أسود
                // ✅ border في Dark Mode
                borderRight: mode === 'dark' ? '1px solid #27272a' : 'none',
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none', // ✅ إزالة الـ gradient الافتراضي
              },
            },
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeMode must be used within ThemeProvider');
  }
  return context;
};