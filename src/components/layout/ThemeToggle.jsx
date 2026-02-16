import { IconButton, Tooltip, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useThemeMode } from '../../context/ThemeContext';

function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();
  const theme = useTheme();

  return (
    <Tooltip title={mode === 'light' ? 'Dark Mode' : 'Light Mode'}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: 'text-primary',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'rotate(180deg)',
            backgroundColor: 'action.hover',
          },
        }}
      >
        {mode === 'light' ? (
          <Brightness4 sx={{ fontSize: 24 }} />
        ) : (
          <Brightness7 sx={{ fontSize: 24 }} />
        )}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeToggle;