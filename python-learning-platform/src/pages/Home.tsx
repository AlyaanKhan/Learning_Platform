import { Container, Typography, Box, Button, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Code, BookOpen, Library, Brain, Cpu, MessageSquare, ArrowRight } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';

const Hero = styled(motion.div)(({ theme }) => ({
  background: `linear-gradient(90deg, #4855b8 0%, #6b76d4 100%)`,
  borderRadius: theme.shape.borderRadius * 2,
  padding: theme.spacing(6, 4),
  marginBottom: theme.spacing(6),
  boxShadow: '0 8px 32px 0 rgba(72, 85, 184, 0.15)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: 56,
  letterSpacing: 1,
  textAlign: 'center',
  marginBottom: theme.spacing(2),
  textShadow: '0 4px 24px rgba(72, 85, 184, 0.18)',
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  fontWeight: 400,
  fontSize: 22,
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  color: 'rgba(255,255,255,0.92)',
}));

const AnimatedIcon = styled(motion.div)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: theme.spacing(1),
}));

const SectionPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 1.5,
  boxShadow: '0 2px 16px 0 rgba(72, 85, 184, 0.08)',
  background: theme.palette.background.paper,
  transition: 'box-shadow 0.3s',
  '&:hover': {
    boxShadow: '0 8px 32px 0 rgba(72, 85, 184, 0.15)',
    transform: 'translateY(-4px) scale(1.02)',
  },
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
}));

const sections = [
  {
    title: 'Python Basics',
    desc: 'Start your Python journey with the fundamentals.',
    icon: <Code size={32} />, path: '/python-basics',
  },
  {
    title: 'Advanced Python',
    desc: 'Master OOP, decorators, generators, and more.',
    icon: <BookOpen size={32} />, path: '/advanced-python',
  },
  {
    title: 'Libraries',
    desc: 'Explore essential Python libraries for every field.',
    icon: <Library size={32} />, path: '/libraries',
  },
  {
    title: 'Machine Learning',
    desc: 'Dive into ML concepts and practical examples.',
    icon: <Brain size={32} />, path: '/machine-learning',
  },
  {
    title: 'AI',
    desc: 'Learn about neural networks, NLP, and more.',
    icon: <Cpu size={32} />, path: '/artificial-intelligence',
  },
  {
    title: 'LangChain + LLM',
    desc: 'Integrate Python with LLMs and LangChain.',
    icon: <MessageSquare size={32} />, path: '/langchain',
  },
];

const firstRow = sections.slice(0, 3);
const secondRow = sections.slice(3, 6);
// If you add more, use: const thirdRow = sections.slice(6);

const Home = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      <Hero
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <AnimatedIcon
          initial={{ rotate: -10 }}
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Code size={48} />
        </AnimatedIcon>
        <HeroTitle variant="h2">
          Python Learning Platform
        </HeroTitle>
        <HeroSubtitle>
          The modern, interactive way to master Python, AI, and Machine Learning.<br />
          Explore hands-on examples, libraries, and real-world projects.
        </HeroSubtitle>
        <Button
          component={RouterLink}
          to="/python-basics"
          size="large"
          variant="contained"
          color="secondary"
          endIcon={<ArrowRight size={22} />}
          sx={{ fontWeight: 600, fontSize: 20, px: 4, py: 1.5, borderRadius: 3, boxShadow: '0 2px 8px rgba(245,0,87,0.10)' }}
        >
          Get Started
        </Button>
      </Hero>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
        {firstRow.map((section, idx) => (
          <Box key={section.title} sx={{ flex: '1 1 300px', minWidth: 'calc(33% - 32px)' }}>
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(72, 85, 184, 0.15)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.08, duration: 0.5 }}
              style={{ height: '100%' }}
            >
              <SectionPaper elevation={0}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>{section.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{section.title}</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>{section.desc}</Typography>
                <Button
                  component={RouterLink}
                  to={section.path}
                  variant="outlined"
                  color="primary"
                  endIcon={<ArrowRight size={18} />}
                  sx={{ fontWeight: 600, borderRadius: 2, px: 2, py: 0.5 }}
                >
                  Explore
                </Button>
              </SectionPaper>
            </motion.div>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, mt: 4 }}>
        {secondRow.map((section, idx) => (
          <Box key={section.title} sx={{ flex: '1 1 300px', minWidth: 'calc(33% - 32px)' }}>
            <motion.div
              whileHover={{ scale: 1.04, boxShadow: '0 8px 32px 0 rgba(72, 85, 184, 0.15)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + idx * 0.08, duration: 0.5 }}
              style={{ height: '100%' }}
            >
              <SectionPaper elevation={0}>
                <Box sx={{ color: 'primary.main', mb: 2 }}>{section.icon}</Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{section.title}</Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>{section.desc}</Typography>
                <Button
                  component={RouterLink}
                  to={section.path}
                  variant="outlined"
                  color="primary"
                  endIcon={<ArrowRight size={18} />}
                  sx={{ fontWeight: 600, borderRadius: 2, px: 2, py: 0.5 }}
                >
                  Explore
                </Button>
              </SectionPaper>
            </motion.div>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Home; 