import { Container, Typography, Box, Divider, IconButton, Tooltip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Network, 
  MessageSquare, 
  Eye, 
  Gamepad,
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

const ArtificialIntelligence = () => {
  const navigate = useNavigate();
  const topics: Topic[] = [
    {
      title: 'Neural Networks',
      icon: <Brain size={24} />,
      content: [
        {
          title: 'Basic Neural Network',
          description: 'Creating a simple neural network with PyTorch',
          code: `import torch
import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self):
        super(SimpleNN, self).__init__()
        self.layer1 = nn.Linear(10, 5)
        self.relu = nn.ReLU()
        self.layer2 = nn.Linear(5, 1)
    
    def forward(self, x):
        x = self.layer1(x)
        x = self.relu(x)
        x = self.layer2(x)
        return x

# Create model
model = SimpleNN()
print(model)`
        },
        {
          title: 'Convolutional Neural Network',
          description: 'Image classification with CNN',
          code: `import torch
import torch.nn as nn

class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3)
        self.pool = nn.MaxPool2d(2, 2)
        self.fc1 = nn.Linear(32 * 13 * 13, 10)
    
    def forward(self, x):
        x = self.pool(torch.relu(self.conv1(x)))
        x = x.view(-1, 32 * 13 * 13)
        x = self.fc1(x)
        return x

# Create model
model = CNN()
print(model)`
        }
      ]
    },
    {
      title: 'Deep Learning Frameworks',
      icon: <Network size={24} />,
      content: [
        {
          title: 'TensorFlow',
          description: 'Building a model with TensorFlow',
          code: `import tensorflow as tf

# Create a simple model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu', input_shape=(10,)),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1)
])

# Compile model
model.compile(optimizer='adam',
              loss='mse',
              metrics=['mae'])

print(model.summary())`
        },
        {
          title: 'PyTorch',
          description: 'Creating a model with PyTorch',
          code: `import torch
import torch.nn as nn

class Model(nn.Module):
    def __init__(self):
        super(Model, self).__init__()
        self.layers = nn.Sequential(
            nn.Linear(10, 64),
            nn.ReLU(),
            nn.Linear(64, 32),
            nn.ReLU(),
            nn.Linear(32, 1)
        )
    
    def forward(self, x):
        return self.layers(x)

# Create model
model = Model()
print(model)`
        }
      ]
    },
    {
      title: 'Natural Language Processing',
      icon: <MessageSquare size={24} />,
      content: [
        {
          title: 'Text Classification',
          description: 'Sentiment analysis with transformers',
          code: `from transformers import pipeline

# Create sentiment analysis pipeline
classifier = pipeline('sentiment-analysis')

# Analyze text
text = "I love using Python for AI development!"
result = classifier(text)

print(result)`
        },
        {
          title: 'Text Generation',
          description: 'Generating text with GPT-2',
          code: `from transformers import pipeline

# Create text generation pipeline
generator = pipeline('text-generation', model='gpt2')

# Generate text
prompt = "Once upon a time"
result = generator(prompt, max_length=50)

print(result[0]['generated_text'])`
        }
      ]
    },
    {
      title: 'Computer Vision',
      icon: <Eye size={24} />,
      content: [
        {
          title: 'Image Classification',
          description: 'Classifying images with pre-trained models',
          code: `from transformers import pipeline

# Create image classification pipeline
classifier = pipeline('image-classification')

# Classify image
result = classifier('path/to/image.jpg')

print(result)`
        },
        {
          title: 'Object Detection',
          description: 'Detecting objects in images',
          code: `from transformers import pipeline

# Create object detection pipeline
detector = pipeline('object-detection')

# Detect objects
result = detector('path/to/image.jpg')

print(result)`
        }
      ]
    },
    {
      title: 'Reinforcement Learning',
      icon: <Gamepad size={24} />,
      content: [
        {
          title: 'Q-Learning',
          description: 'Implementing Q-Learning algorithm',
          code: `import numpy as np

class QLearning:
    def __init__(self, states, actions, learning_rate=0.1, discount=0.95):
        self.q_table = np.zeros((states, actions))
        self.lr = learning_rate
        self.gamma = discount
    
    def update(self, state, action, reward, next_state):
        old_value = self.q_table[state, action]
        next_max = np.max(self.q_table[next_state])
        new_value = (1 - self.lr) * old_value + self.lr * (reward + self.gamma * next_max)
        self.q_table[state, action] = new_value

# Create Q-Learning agent
agent = QLearning(states=10, actions=4)
print(agent.q_table)`
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Heading initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <HeadingText variant="h3">
          <Brain size={36} style={{ marginRight: 16 }} /> Artificial Intelligence
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
                <CopyButton value={item.code || item.commands?.join('\n') || ''} />
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

export default ArtificialIntelligence; 