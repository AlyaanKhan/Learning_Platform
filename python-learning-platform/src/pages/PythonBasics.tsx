import { Container, Typography, Box, Divider, IconButton, Tooltip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Code, Terminal, BookOpen, Lightbulb, Database, Copy, Check } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CodeBlock = styled('pre')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#23272e' : theme.palette.grey[100],
  color: theme.palette.mode === 'dark' ? '#f8f8f2' : theme.palette.text.primary,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  whiteSpace: 'pre',
  overflowX: 'auto',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#2c313a' : theme.palette.grey[200]}`,
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  fontSize: 16,
}));

const CmdBlock = styled('pre')(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#181c20' : '#f5f5f5',
  color: theme.palette.mode === 'dark' ? '#e0e0e0' : '#23272e',
  fontFamily: 'Fira Mono, monospace',
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  whiteSpace: 'pre',
  overflowX: 'auto',
  border: `1px solid ${theme.palette.mode === 'dark' ? '#23272e' : '#e0e0e0'}`,
  fontSize: 15,
  position: 'relative',
  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
}));

const Section = styled(motion.div)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(4),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  color: theme.palette.primary.main,
}));

const Heading = styled(motion.div)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(4),
  padding: theme.spacing(2, 0),
  borderRadius: theme.shape.borderRadius,
  background: `linear-gradient(90deg, #4855b8 0%, #6b76d4 100%)`,
  boxShadow: '0 4px 24px 0 rgba(72, 85, 184, 0.10)',
}));

const HeadingText = styled(Typography)(({ theme }) => ({
  color: '#fff',
  fontWeight: 700,
  fontSize: 40,
  letterSpacing: 1,
  textShadow: '0 2px 8px rgba(72, 85, 184, 0.15)',
  display: 'flex',
  alignItems: 'center',
}));

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <Tooltip title={copied ? 'Copied!' : 'Copy'} placement="top" arrow>
      <IconButton
        onClick={handleCopy}
        size="small"
        sx={{ position: 'absolute', top: 8, right: 8, color: copied ? 'success.main' : 'primary.main', zIndex: 2 }}
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </IconButton>
    </Tooltip>
  );
}

interface CodeExample {
  title: string;
  description: string;
  code?: string;
  commands?: string[];
}

interface Topic {
  title: string;
  icon: React.ReactNode;
  content: CodeExample[];
}

const PythonBasics = () => {
  const navigate = useNavigate();
  const topics: Topic[] = [
    {
      title: 'Getting Started',
      icon: <Terminal size={24} />,
      content: [
        {
          title: 'Installation',
          description: 'Setting up Python on your system',
          commands: [
            '# Windows',
            'winget install Python.Python.3.11',
            '',
            '# macOS',
            'brew install python@3.11',
            '',
            '# Linux',
            'sudo apt-get update',
            'sudo apt-get install python3.11'
          ]
        },
        {
          title: 'First Program',
          description: 'Writing your first Python program',
          code: `# hello.py
print("Hello, World!")

# Variables
name = "Python"
version = 3.11
print(f"Welcome to {name} {version}!")`
        }
      ]
    },
    {
      title: 'Basic Syntax',
      icon: <Code size={24} />,
      content: [
        {
          title: 'Variables and Data Types',
          description: 'Understanding Python data types',
          code: `# Numbers
integer = 42
float_num = 3.14

# Strings
text = "Hello, Python!"
multiline = """
This is a
multiline string
"""

# Boolean
is_true = True
is_false = False

# Print types
print(type(integer))  # <class 'int'>
print(type(float_num))  # <class 'float'>
print(type(text))  # <class 'str'>`
        }
      ]
    },
    {
      title: 'Control Flow',
      icon: <Lightbulb size={24} />,
      content: [
        {
          title: 'Conditionals',
          description: 'Using if-else statements',
          code: `age = 18

if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")

# Ternary operator
status = "adult" if age >= 18 else "minor"`
        },
        {
          title: 'Loops',
          description: 'Using for and while loops',
          code: `# For loop
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# While loop
count = 0
while count < 5:
    print(count)
    count += 1

# List comprehension
squares = [x**2 for x in range(5)]  # [0, 1, 4, 9, 16]`
        }
      ]
    },
    {
      title: 'Data Structures',
      icon: <Database size={24} />,
      content: [
        {
          title: 'Lists and Tuples',
          description: 'Working with sequences',
          code: `# Lists (mutable)
fruits = ['apple', 'banana', 'orange']
fruits.append('mango')
fruits[0] = 'pear'

# Tuples (immutable)
coordinates = (10, 20)
# coordinates[0] = 30  # Error!`
        },
        {
          title: 'Dictionaries',
          description: 'Key-value pairs',
          code: `# Dictionary
person = {
    'name': 'John',
    'age': 30,
    'city': 'New York'
}

# Accessing values
print(person['name'])  # John
print(person.get('age'))  # 30

# Adding/updating
person['job'] = 'Developer'
person['age'] = 31`
        }
      ]
    },
    {
      title: 'Functions',
      icon: <BookOpen size={24} />,
      content: [
        {
          title: 'Function Basics',
          description: 'Creating and using functions',
          code: `def greet(name, greeting="Hello"):
    return f"{greeting}, {name}!"

# Function calls
print(greet("Alice"))  # Hello, Alice!
print(greet("Bob", "Hi"))  # Hi, Bob!

# Lambda functions
square = lambda x: x**2
print(square(5))  # 25`
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Heading initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <HeadingText variant="h3">
          <Code size={36} style={{ marginRight: 16 }} /> Python Basics
        </HeadingText>
      </Heading>
      
      {topics.map((topic, index) => (
        <Section
          key={topic.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <IconWrapper>
            {topic.icon}
            <Typography variant="h5" sx={{ ml: 1, fontWeight: 600 }}>
              {topic.title}
            </Typography>
          </IconWrapper>
          
          {topic.content.map((item, itemIndex) => (
            <Box key={itemIndex} sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                {item.title}
              </Typography>
              <Typography variant="body1" paragraph sx={{ color: 'text.secondary' }}>
                {item.description}
              </Typography>
              {item.commands && (
                <Box sx={{ position: 'relative' }}>
                  <CopyButton value={item.commands.join('\n')} />
                  <CmdBlock>
                    {item.commands.map((cmd, cmdIndex) => (
                      <div key={cmdIndex}>{cmd}</div>
                    ))}
                  </CmdBlock>
                </Box>
              )}
              {item.code && (
                <Box sx={{ position: 'relative' }}>
                  <CopyButton value={item.code} />
                  <CodeBlock>
                    {item.code}
                  </CodeBlock>
                </Box>
              )}
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 2 }}
                startIcon={<Terminal size={20} />}
                onClick={async () => {
                  const codeToRun = item.code || (item.commands ? item.commands.join('\n') : '');
                  if (!codeToRun) {
                    alert('No code or commands to run.');
                    return;
                  }

                  navigate('/code-editor', { state: { code: codeToRun } });
                }}
              >
                Want to try?
              </Button>
            </Box>
          ))}
          {index < topics.length - 1 && <Divider sx={{ my: 2 }} />}
        </Section>
      ))}
    </Container>
  );
};

export default PythonBasics; 