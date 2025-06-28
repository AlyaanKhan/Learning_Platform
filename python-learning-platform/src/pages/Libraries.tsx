import { Container, Typography, Box, Divider, IconButton, Tooltip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  Database, 
  Globe, 
  Webhook, 
  Monitor, 
  Server, 
  TestTube, 
  Copy, 
  Check,
  Terminal 
} from 'lucide-react';
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

function CopyButton({ value, whiteIcon = false }: { value: string, whiteIcon?: boolean }) {
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
        sx={{ position: 'absolute', top: 8, right: 8, color: copied ? 'success.main' : (whiteIcon ? '#fff' : 'primary.main'), zIndex: 2 }}
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

const Libraries = () => {
  const navigate = useNavigate();
  const topics: Topic[] = [
    {
      title: 'Data Science Libraries',
      icon: <Database size={24} />,
      content: [
        {
          title: 'NumPy',
          description: 'Numerical computing with NumPy arrays',
          code: `import numpy as np

# Creating arrays
arr = np.array([1, 2, 3, 4, 5])
matrix = np.array([[1, 2], [3, 4]])

# Array operations
print(arr * 2)  # [2 4 6 8 10]
print(matrix.T)  # [[1 3], [2 4]]`,
          commands: ['pip install numpy']
        },
        {
          title: 'Pandas',
          description: 'Data manipulation with Pandas',
          code: `import pandas as pd

# Creating DataFrame
df = pd.DataFrame({
    'Name': ['Alice', 'Bob', 'Charlie'],
    'Age': [25, 30, 35],
    'City': ['New York', 'London', 'Paris']
})

# Data operations
print(df.groupby('City')['Age'].mean())`,
          commands: ['pip install pandas']
        },
        {
          title: 'Matplotlib',
          description: 'Data visualization with Matplotlib',
          code: `import matplotlib.pyplot as plt
import numpy as np

# Create data
x = np.linspace(0, 10, 100)
y = np.sin(x)

# Create plot
plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)')
plt.title('Sine Wave')
plt.xlabel('x')
plt.ylabel('sin(x)')
plt.legend()
plt.grid(True)
plt.show()`,
          commands: ['pip install matplotlib']
        }
      ]
    },
    {
      title: 'Web Development',
      icon: <Globe size={24} />,
      content: [
        {
          title: 'Flask',
          description: 'Building web applications with Flask',
          code: `from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/hello')
def hello():
    return jsonify({"message": "Hello, World!"})

if __name__ == '__main__':
    app.run(debug=True)`,
          commands: ['pip install flask']
        },
        {
          title: 'FastAPI',
          description: 'Modern web APIs with FastAPI',
          code: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Item(BaseModel):
    name: str
    price: float

@app.post("/items/")
async def create_item(item: Item):
    return item`,
          commands: ['pip install fastapi']
        }
      ]
    },
    {
      title: 'Web Scraping',
      icon: <Webhook size={24} />,
      content: [
        {
          title: 'BeautifulSoup',
          description: 'Parsing HTML with BeautifulSoup',
          code: `from bs4 import BeautifulSoup
import requests

# Fetching and parsing
response = requests.get('https://example.com')
soup = BeautifulSoup(response.text, 'html.parser')

# Finding elements
title = soup.find('h1').text
links = soup.find_all('a')`,
          commands: ['pip install beautifulsoup4']
        },
        {
          title: 'Selenium',
          description: 'Browser automation with Selenium',
          code: `from selenium import webdriver
from selenium.webdriver.common.by import By

# Initialize driver
driver = webdriver.Chrome()

# Navigate to page
driver.get('https://example.com')

# Find elements
element = driver.find_element(By.ID, 'my-id')
print(element.text)

# Close browser
driver.quit()`,
          commands: ['pip install selenium']
        }
      ]
    },
    {
      title: 'GUI Development',
      icon: <Monitor size={24} />,
      content: [
        {
          title: 'Tkinter',
          description: 'Creating desktop applications',
          code: `import tkinter as tk

root = tk.Tk()
root.title("My App")

label = tk.Label(root, text="Hello, World!")
label.pack()

button = tk.Button(root, text="Click Me!")
button.pack()

root.mainloop()`,
          commands: ['pip install tk']
        }
      ]
    },
    {
      title: 'Database ORMs',
      icon: <Server size={24} />,
      content: [
        {
          title: 'SQLAlchemy',
          description: 'Database operations with SQLAlchemy',
          code: `from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    email = Column(String)

# Creating tables
engine = create_engine('sqlite:///users.db')
Base.metadata.create_all(engine)`,
          commands: ['pip install sqlalchemy']
        }
      ]
    },
    {
      title: 'Testing',
      icon: <TestTube size={24} />,
      content: [
        {
          title: 'pytest',
          description: 'Writing and running tests',
          code: `import pytest

def test_addition():
    assert 1 + 1 == 2

def test_string():
    assert "hello" + " world" == "hello world"

# Running tests: pytest test_file.py`,
          commands: ['pip install pytest']
        },
        {
          title: 'unittest',
          description: 'Writing tests with unittest',
          code: `import unittest

class TestCalculator(unittest.TestCase):
    def setUp(self):
        self.calc = Calculator()
    
    def test_add(self):
        self.assertEqual(self.calc.add(1, 2), 3)
        self.assertEqual(self.calc.add(-1, 1), 0)
    
    def test_subtract(self):
        self.assertEqual(self.calc.subtract(3, 2), 1)
        self.assertEqual(self.calc.subtract(1, 1), 0)

if __name__ == '__main__':
    unittest.main()`,
          commands: ['pip install unittest']
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Heading initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <HeadingText variant="h3">
          <Database size={36} style={{ marginRight: 16 }} /> Python Libraries
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
              <Box sx={{ position: 'relative' }}>
                <CopyButton value={item.code || item.commands?.join('\n') || ''} whiteIcon={topic.icon === <Monitor size={24} /> || topic.icon === <Server size={24} />} />
                {item.code && <CodeBlock>{item.code}</CodeBlock>}
                {item.commands && (
                  <CmdBlock>
                    {item.commands.map((cmd, cmdIndex) => (
                      <div key={cmdIndex}>{cmd}</div>
                    ))}
                  </CmdBlock>
                )}
              </Box>
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

export default Libraries; 