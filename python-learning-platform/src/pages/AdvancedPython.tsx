import { Container, Typography, Box, Divider, IconButton, Tooltip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Code, Layers, Cpu, Zap, GitBranch, Workflow, Copy, Check, Terminal } from 'lucide-react';
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

const AdvancedPython = () => {
  const navigate = useNavigate();
  const topics: Topic[] = [
    {
      title: 'Object-Oriented Programming',
      icon: <Layers size={24} />,
      content: [
        {
          title: 'Classes and Objects',
          description: 'Creating and using classes in Python',
          code: `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, I'm {self.name} and I'm {self.age} years old"

# Creating objects
person1 = Person("Alice", 25)
print(person1.greet())  # Hello, I'm Alice and I'm 25 years old`
        },
        {
          title: 'Inheritance',
          description: 'Creating derived classes from base classes',
          code: `class Animal:
    def __init__(self, name):
        self.name = name
    
    def speak(self):
        pass

class Dog(Animal):
    def speak(self):
        return f"{self.name} says Woof!"

class Cat(Animal):
    def speak(self):
        return f"{self.name} says Meow!"

# Using inheritance
dog = Dog("Buddy")
cat = Cat("Whiskers")
print(dog.speak())  # Buddy says Woof!
print(cat.speak())  # Whiskers says Meow!`
        },
        {
          title: 'Encapsulation',
          description: 'Private and protected attributes',
          code: `class BankAccount:
    def __init__(self, account_number, balance):
        self._account_number = account_number  # protected
        self.__balance = balance              # private
    
    def get_balance(self):
        return self.__balance
    
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            return True
        return False

account = BankAccount("12345", 1000)
print(account.get_balance())  # 1000
account.deposit(500)
print(account.get_balance())  # 1500`
        }
      ]
    },
    {
      title: 'Decorators',
      icon: <Zap size={24} />,
      content: [
        {
          title: 'Function Decorators',
          description: 'Modifying function behavior with decorators',
          code: `def timer_decorator(func):
    import time
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = func(*args, **kwargs)
        end_time = time.time()
        print(f"Function {func.__name__} took {end_time - start_time:.2f} seconds")
        return result
    return wrapper

@timer_decorator
def slow_function():
    import time
    time.sleep(1)
    return "Done!"

# Using the decorator
result = slow_function()  # Function slow_function took 1.00 seconds`
        },
        {
          title: 'Class Decorators',
          description: 'Modifying class behavior with decorators',
          code: `def singleton(cls):
    instances = {}
    def get_instance(*args, **kwargs):
        if cls not in instances:
            instances[cls] = cls(*args, **kwargs)
        return instances[cls]
    return get_instance

@singleton
class Database:
    def __init__(self):
        print("Initializing database...")

# Both instances will be the same
db1 = Database()
db2 = Database()  # No new initialization`
        }
      ]
    },
    {
      title: 'Generators and Iterators',
      icon: <GitBranch size={24} />,
      content: [
        {
          title: 'Generator Functions',
          description: 'Creating memory-efficient iterators',
          code: `def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

# Using the generator
for num in fibonacci(10):
    print(num, end=' ')  # 0 1 1 2 3 5 8 13 21 34`
        },
        {
          title: 'Generator Expressions',
          description: 'Creating generators with expressions',
          code: `# List comprehension (creates full list in memory)
squares_list = [x**2 for x in range(1000000)]

# Generator expression (creates values on demand)
squares_gen = (x**2 for x in range(1000000))

# Memory efficient iteration
for square in squares_gen:
    if square > 100:
        break
    print(square)`
        }
      ]
    },
    {
      title: 'Context Managers',
      icon: <Code size={24} />,
      content: [
        {
          title: 'Using with Statement',
          description: 'Managing resources with context managers',
          code: `# File handling with context manager
with open('example.txt', 'w') as file:
    file.write('Hello, World!')
# File is automatically closed

# Custom context manager
class DatabaseConnection:
    def __init__(self, host):
        self.host = host
    
    def __enter__(self):
        print(f"Connecting to {self.host}")
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Closing connection")

# Using custom context manager
with DatabaseConnection("localhost") as db:
    print("Performing database operations")`
        }
      ]
    },
    {
      title: 'Functional Programming',
      icon: <Workflow size={24} />,
      content: [
        {
          title: 'Lambda Functions',
          description: 'Creating anonymous functions',
          code: `# Simple lambda function
square = lambda x: x**2
print(square(5))  # 25

# Using lambda with map
numbers = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, numbers))
print(squared)  # [1, 4, 9, 16, 25]

# Using lambda with filter
even_numbers = list(filter(lambda x: x % 2 == 0, numbers))
print(even_numbers)  # [2, 4]`
        },
        {
          title: 'List Comprehensions',
          description: 'Creating lists with comprehensions',
          code: `# Basic list comprehension
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# List comprehension with condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# Nested list comprehension
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flattened = [num for row in matrix for num in row]
print(flattened)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]`
        }
      ]
    },
    {
      title: 'Concurrency',
      icon: <Cpu size={24} />,
      content: [
        {
          title: 'Threading',
          description: 'Running multiple threads',
          code: `import threading
import time

def worker(name):
    print(f"Worker {name} started")
    time.sleep(2)
    print(f"Worker {name} finished")

# Creating and starting threads
threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(f"Thread-{i}",))
    threads.append(t)
    t.start()

# Waiting for all threads to complete
for t in threads:
    t.join()`
        },
        {
          title: 'asyncio',
          description: 'Asynchronous programming',
          code: `import asyncio

async def say_after(delay, what):
    await asyncio.sleep(delay)
    print(what)

async def main():
    # Run tasks concurrently
    task1 = asyncio.create_task(say_after(1, 'hello'))
    task2 = asyncio.create_task(say_after(2, 'world'))
    
    print('started')
    await task1
    await task2
    print('finished')

# Run the async function
asyncio.run(main())`
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Heading initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <HeadingText variant="h3">
          <Layers size={36} style={{ marginRight: 16 }} /> Advanced Python
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

export default AdvancedPython; 