import { Container, Typography, Box, Divider, IconButton, Tooltip, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { 
  MessageSquare, 
  Link, 
  Bot, 
  Database, 
  FileText, 
  Wrench,
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

const LangChain = () => {
  const navigate = useNavigate();
  const topics: Topic[] = [
    {
      title: 'Introduction to LangChain',
      icon: <MessageSquare size={24} />,
      content: [
        {
          title: 'Basic Setup',
          description: 'Setting up LangChain with OpenAI',
          code: `from langchain.llms import OpenAI
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

# Initialize LLM
llm = OpenAI(temperature=0.7)

# Create prompt template
template = "Tell me a joke about {topic}"
prompt = PromptTemplate(
    input_variables=["topic"],
    template=template
)

# Create chain
chain = LLMChain(llm=llm, prompt=prompt)

# Run chain
result = chain.run("programming")
print(result)`
        },
        {
          title: 'Environment Setup',
          description: 'Setting up environment variables and API keys',
          commands: [
            'pip install langchain openai python-dotenv',
            'export OPENAI_API_KEY="your-api-key-here"',
            'export LANGCHAIN_API_KEY="your-langchain-api-key"'
          ]
        }
      ]
    },
    {
      title: 'LLM Integration',
      icon: <Link size={24} />,
      content: [
        {
          title: 'OpenAI Integration',
          description: 'Using OpenAI models with LangChain',
          code: `from langchain.llms import OpenAI
from langchain.chains import SimpleSequentialChain

# Initialize OpenAI
llm = OpenAI(temperature=0.7)

# Create chains
first_chain = LLMChain(llm=llm, prompt=first_prompt)
second_chain = LLMChain(llm=llm, prompt=second_prompt)

# Combine chains
overall_chain = SimpleSequentialChain(
    chains=[first_chain, second_chain],
    verbose=True
)

# Run chain
result = overall_chain.run("Python programming")
print(result)`
        },
        {
          title: 'HuggingFace Integration',
          description: 'Using HuggingFace models with LangChain',
          code: `from langchain.llms import HuggingFacePipeline
from transformers import pipeline

# Create HuggingFace pipeline
generator = pipeline(
    'text-generation',
    model='gpt2',
    max_length=50
)

# Initialize LLM
llm = HuggingFacePipeline(pipeline=generator)

# Use LLM
result = llm("Tell me a story about")
print(result)`
        }
      ]
    },
    {
      title: 'Chains and Agents',
      icon: <Bot size={24} />,
      content: [
        {
          title: 'Simple Chain',
          description: 'Creating a simple chain for text generation',
          code: `from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

# Create prompt template
template = "Write a {length} story about {topic}"
prompt = PromptTemplate(
    input_variables=["length", "topic"],
    template=template
)

# Create chain
chain = LLMChain(llm=llm, prompt=prompt)

# Run chain
result = chain.run(length="short", topic="space travel")
print(result)`
        },
        {
          title: 'Custom Agent',
          description: 'Creating a custom agent with tools',
          code: `from langchain.agents import Tool, AgentExecutor, LLMSingleActionAgent
from langchain.prompts import StringPromptTemplate

# Define tools
tools = [
    Tool(
        name="Search",
        func=search_tool,
        description="Search for information"
    ),
    Tool(
        name="Calculator",
        func=calculator_tool,
        description="Perform calculations"
    )
]

# Create agent
agent = LLMSingleActionAgent(
    llm_chain=llm_chain,
    allowed_tools=[tool.name for tool in tools]
)

# Create executor
agent_executor = AgentExecutor.from_agent_and_tools(
    agent=agent,
    tools=tools,
    verbose=True
)`
        }
      ]
    },
    {
      title: 'Memory and Context',
      icon: <Database size={24} />,
      content: [
        {
          title: 'Conversation Memory',
          description: 'Maintaining conversation context',
          code: `from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain

# Create memory
memory = ConversationBufferMemory()

# Create conversation chain
conversation = ConversationChain(
    llm=llm,
    memory=memory,
    verbose=True
)

# Run conversation
conversation.predict(input="Hi, how are you?")
conversation.predict(input="What was my first message?")`
        },
        {
          title: 'Vector Store Memory',
          description: 'Using vector stores for memory',
          code: `from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

# Create embeddings
embeddings = OpenAIEmbeddings()

# Create vector store
vectorstore = Chroma(
    embedding_function=embeddings,
    persist_directory="./data"
)

# Add documents
vectorstore.add_texts(["This is a test document"])

# Search documents
docs = vectorstore.similarity_search("test")
print(docs)`
        }
      ]
    },
    {
      title: 'Vector Stores',
      icon: <FileText size={24} />,
      content: [
        {
          title: 'Chroma Vector Store',
          description: 'Using Chroma as a vector store',
          code: `from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings
from langchain.text_splitter import CharacterTextSplitter

# Create text splitter
text_splitter = CharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=0
)

# Split documents
texts = text_splitter.split_text(long_text)

# Create embeddings and vector store
embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_texts(
    texts,
    embeddings,
    persist_directory="./data"
)

# Query vector store
query = "What is the main topic?"
docs = vectorstore.similarity_search(query)
print(docs)`
        }
      ]
    },
    {
      title: 'Advanced Applications',
      icon: <Wrench size={24} />,
      content: [
        {
          title: 'Document QA',
          description: 'Creating a document question-answering system',
          code: `from langchain.chains import RetrievalQA
from langchain.vectorstores import Chroma

# Create vector store
vectorstore = Chroma.from_documents(
    documents,
    embeddings,
    persist_directory="./data"
)

# Create QA chain
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=vectorstore.as_retriever()
)

# Ask questions
result = qa_chain.run("What is the main topic?")
print(result)`
        },
        {
          title: 'Custom Tools',
          description: 'Creating custom tools for agents',
          code: `from langchain.tools import BaseTool
from typing import Optional, Type

class CustomTool(BaseTool):
    name = "custom_tool"
    description = "A custom tool for specific tasks"
    
    def _run(self, query: str) -> str:
        # Implement tool logic
        return f"Processed: {query}"
    
    def _arun(self, query: str) -> str:
        # Implement async logic
        raise NotImplementedError("Async not implemented")

# Use custom tool
tool = CustomTool()
result = tool.run("test query")
print(result)`
        }
      ]
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Heading initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
        <HeadingText variant="h3">
          <MessageSquare size={36} style={{ marginRight: 16 }} /> LangChain + LLM
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

export default LangChain; 