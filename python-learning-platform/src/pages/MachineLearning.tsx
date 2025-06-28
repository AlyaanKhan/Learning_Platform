import { Container, Typography, Box, Divider, IconButton, Tooltip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  Brain, 
  LineChart, 
  PieChart, 
  BarChart, 
  Settings, 
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

const MachineLearning = () => {
  const navigate = useNavigate();
  const topics: Topic[] = [
    {
      title: 'Supervised Learning',
      icon: <Brain size={24} />,
      content: [
        {
          title: 'Linear Regression',
          description: 'Predicting continuous values with linear regression',
          code: `from sklearn.linear_model import LinearRegression
import numpy as np

# Create sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 5, 4, 5])

# Create and train model
model = LinearRegression()
model.fit(X, y)

# Make predictions
predictions = model.predict([[6], [7]])
print(predictions)`
        },
        {
          title: 'Classification',
          description: 'Classifying data with logistic regression',
          code: `from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification

# Generate sample data
X, y = make_classification(n_samples=100, n_features=2, n_classes=2)

# Create and train model
model = LogisticRegression()
model.fit(X, y)

# Make predictions
predictions = model.predict(X)
print(predictions)`
        }
      ]
    },
    {
      title: 'Unsupervised Learning',
      icon: <PieChart size={24} />,
      content: [
        {
          title: 'K-Means Clustering',
          description: 'Grouping data with K-means clustering',
          code: `from sklearn.cluster import KMeans
import numpy as np

# Create sample data
X = np.array([[1, 2], [1, 4], [1, 0],
              [4, 2], [4, 4], [4, 0]])

# Create and fit model
kmeans = KMeans(n_clusters=2)
kmeans.fit(X)

# Get cluster labels
labels = kmeans.labels_
print(labels)`
        },
        {
          title: 'Principal Component Analysis',
          description: 'Dimensionality reduction with PCA',
          code: `from sklearn.decomposition import PCA
import numpy as np

# Create sample data
X = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])

# Create and fit PCA
pca = PCA(n_components=2)
X_reduced = pca.fit_transform(X)

print(X_reduced)`
        }
      ]
    },
    {
      title: 'Model Evaluation',
      icon: <LineChart size={24} />,
      content: [
        {
          title: 'Cross-Validation',
          description: 'Evaluating models with cross-validation',
          code: `from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification

# Generate sample data
X, y = make_classification(n_samples=100, n_features=2)

# Create model
model = LogisticRegression()

# Perform cross-validation
scores = cross_val_score(model, X, y, cv=5)
print(f"Cross-validation scores: {scores}")
print(f"Average score: {scores.mean():.3f}")`
        },
        {
          title: 'Confusion Matrix',
          description: 'Evaluating classification performance',
          code: `from sklearn.metrics import confusion_matrix
import numpy as np

# Sample predictions and true labels
y_true = np.array([0, 1, 0, 1, 1, 0])
y_pred = np.array([0, 1, 0, 0, 1, 1])

# Calculate confusion matrix
cm = confusion_matrix(y_true, y_pred)
print(cm)`
        }
      ]
    },
    {
      title: 'Feature Engineering',
      icon: <BarChart size={24} />,
      content: [
        {
          title: 'Feature Scaling',
          description: 'Normalizing features for better performance',
          code: `from sklearn.preprocessing import StandardScaler
import numpy as np

# Create sample data
X = np.array([[1, 2], [3, 4], [5, 6]])

# Create and fit scaler
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

print(X_scaled)`
        },
        {
          title: 'Feature Selection',
          description: 'Selecting important features',
          code: `from sklearn.feature_selection import SelectKBest, f_classif
import numpy as np

# Create sample data
X = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
y = np.array([0, 1, 0])

# Select top 2 features
selector = SelectKBest(f_classif, k=2)
X_selected = selector.fit_transform(X, y)

print(X_selected)`
        }
      ]
    },
    {
      title: 'Model Tuning',
      icon: <Settings size={24} />,
      content: [
        {
          title: 'Grid Search',
          description: 'Finding optimal hyperparameters',
          code: `from sklearn.model_selection import GridSearchCV
from sklearn.svm import SVC
import numpy as np

# Create sample data
X = np.array([[1, 2], [3, 4], [5, 6]])
y = np.array([0, 1, 0])

# Define parameter grid
param_grid = {
    'C': [0.1, 1, 10],
    'kernel': ['linear', 'rbf']
}

# Create and fit grid search
grid_search = GridSearchCV(SVC(), param_grid, cv=3)
grid_search.fit(X, y)

print(f"Best parameters: {grid_search.best_params_}")`
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Heading initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <HeadingText variant="h3">
          <Brain size={36} style={{ marginRight: 16 }} /> Machine Learning
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

export default MachineLearning; 