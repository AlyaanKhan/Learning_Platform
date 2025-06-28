import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Menu, Code, BookOpen, Library, Brain, Cpu, MessageSquare, Sun, Moon } from 'lucide-react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useColorMode } from '../App';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
  backdropFilter: 'blur(8px)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease-in-out',
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  width: '100vw',
  margin: 0,
  padding: 0,
}));

const NavButton = styled(Button)<{ component?: React.ElementType; to?: string }>(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? '#fff' : theme.palette.primary.main,
  margin: '0 8px',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    width: '0%',
    height: '2px',
    bottom: 0,
    left: '50%',
    background: theme.palette.primary.main,
    transition: 'all 0.3s ease-in-out',
    transform: 'translateX(-50%)',
  },
  '&:hover::after': {
    width: '100%',
  },
}));

const navItems = [
  { text: 'Python Basics', path: '/python-basics', icon: <Code size={20} /> },
  { text: 'Advanced Python', path: '/advanced-python', icon: <BookOpen size={20} /> },
  { text: 'Libraries', path: '/libraries', icon: <Library size={20} /> },
  { text: 'Machine Learning', path: '/machine-learning', icon: <Brain size={20} /> },
  { text: 'AI', path: '/artificial-intelligence', icon: <Cpu size={20} /> },
  { text: 'LangChain', path: '/langchain', icon: <MessageSquare size={20} /> },
];

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const colorMode = useColorMode();
  const isDark = theme.palette.mode === 'dark';
  const navigate = useNavigate();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActive = (path: string) => location.pathname === path;

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.text}
            component={RouterLink} 
            to={item.path}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(72, 85, 184, 0.08)',
              },
            }}
          >
            <Box sx={{ mr: 2, color: theme.palette.mode === 'dark' ? '#fff' : 'primary.main' }}>{item.icon}</Box>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontWeight: 500,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <StyledAppBar>
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: 'primary.dark',
              },
            }}
          >
            <Code size={24} style={{ marginRight: 8 }} />
            Python Learning
          </Typography>

          {isMobile ? (
            <IconButton
              color={theme.palette.mode === 'dark' ? 'inherit' : 'primary'}
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <NavButton
                  key={item.text}
                  component={RouterLink}
                  to={item.path}
                  startIcon={item.icon}
                >
                  {item.text}
                </NavButton>
              ))}
              <Button
                color="inherit"
                startIcon={<BookOpen size={20} />}
                onClick={() => navigate('/quizzes')}
                sx={{
                  backgroundColor: isActive('/quizzes') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                }}
              >
                Quizzes
              </Button>
              <IconButton
                sx={{ ml: 2 }}
                color={theme.palette.mode === 'dark' ? 'inherit' : 'primary'}
                onClick={colorMode.toggleColorMode}
                aria-label="Toggle dark/light mode"
              >
                {isDark ? <Sun size={22} /> : <Moon size={22} />}
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </StyledAppBar>
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar; 