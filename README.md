# 🐍 Python Learning Platform

A modern, interactive web application designed to make Python learning accessible, engaging, and hands-on. From absolute beginners to advanced AI practitioners, this platform provides a comprehensive learning experience with real-time code execution, interactive quizzes, and progressive learning paths.

![Python Learning Platform](https://img.shields.io/badge/Python-3.10+-blue.svg)
![React](https://img.shields.io/badge/React-19.1.0-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178c6.svg)
![Flask](https://img.shields.io/badge/Flask-2.0+-000000.svg)

## ✨ Features

### 🎯 Learning Modules
- **Python Basics**: Variables, data types, control structures, functions
- **Advanced Python**: OOP, decorators, generators, context managers
- **Libraries**: Essential Python libraries (NumPy, Pandas, Matplotlib, etc.)
- **Machine Learning**: ML concepts, algorithms, and practical examples
- **Artificial Intelligence**: Neural networks, NLP, computer vision
- **LangChain + LLM**: Integration with Large Language Models

### 💻 Interactive Code Editor
- Real-time Python code execution
- Syntax highlighting and error detection
- Live output display with stdout/stderr handling
- Code sandboxing for safe execution

### 🧠 Assessment System
- Multiple-choice questions with instant feedback
- Coding challenges with automated testing
- Progressive difficulty levels
- Score tracking and performance analytics

### 🎨 Modern UI/UX
- Responsive design with Material-UI components
- Smooth animations powered by Framer Motion
- Dark/light theme support
- Mobile-friendly interface

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Material-UI** - Beautiful, accessible components
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **Prism.js** - Syntax highlighting

### Backend
- **Flask** - Lightweight Python web framework
- **Piston API** - Secure code execution engine
- **CORS** - Cross-origin resource sharing

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- Python 3.10+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AlyaanKhan/Learning_Platform.git
   cd Learning_Platform
   ```

2. **Install frontend dependencies**
   ```bash
   cd python-learning-platform
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   pip install flask flask-cors requests
   ```

4. **Start the backend server**
   ```bash
   python app.py
   ```
   The backend will run on `http://localhost:5000`

5. **Start the frontend development server**
   ```bash
   cd ../python-learning-platform
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

6. **Open your browser**
   Navigate to `http://localhost:5173` to start learning!

## 📖 Usage Guide

### Getting Started
1. **Choose Your Path**: Start with Python Basics or jump to any module that interests you
2. **Interactive Learning**: Read through the content and try the code examples
3. **Practice Coding**: Use the built-in code editor to experiment with concepts
4. **Take Quizzes**: Test your knowledge with interactive assessments
5. **Track Progress**: Monitor your learning journey through the platform

### Code Editor Features
- **Real-time Execution**: Write Python code and see results instantly
- **Error Handling**: Get detailed error messages and suggestions
- **Code Examples**: Pre-loaded examples for each concept
- **Safe Environment**: Sandboxed execution prevents system access

### Quiz System
- **Multiple Choice**: Test theoretical knowledge
- **Coding Challenges**: Practice with real programming problems
- **Time Limits**: Challenge yourself with timed assessments
- **Instant Feedback**: Get immediate results and explanations

## 🏗️ Project Structure

```
Learning_Platform/
├── backend/
│   └── app.py                 # Flask backend with code execution API
├── python-learning-platform/
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   ├── pages/            # Main application pages
│   │   ├── data/             # Quiz data and content
│   │   ├── types/            # TypeScript type definitions
│   │   └── assets/           # Static assets
│   ├── public/               # Public assets
│   └── package.json          # Frontend dependencies
└── README.md                 # This file
```

## 🔧 Development

### Available Scripts

```bash
# Frontend (in python-learning-platform directory)
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend (in backend directory)
python app.py        # Start Flask development server
```

### Code Execution API

The backend provides a `/run-code` endpoint that:
- Accepts Python code via POST request
- Executes code in a sandboxed environment
- Returns stdout and stderr
- Handles errors gracefully

**Example API Usage:**
```bash
curl -X POST http://localhost:5000/run-code \
  -H "Content-Type: application/json" \
  -d '{"code": "print(\"Hello, World!\")"}'
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** (if applicable)
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Contribution Guidelines
- Follow the existing code style and conventions
- Add TypeScript types for new features
- Update documentation for API changes
- Test your changes thoroughly
- Write clear commit messages

## 🐛 Known Issues

- Code execution timeout for complex algorithms
- Limited support for file I/O operations
- Some advanced Python libraries may not be available in the sandbox

## 🔮 Roadmap

- [ ] Support for multiple programming languages
- [ ] Collaborative coding features
- [ ] Advanced AI-powered learning paths
- [ ] User authentication and progress tracking
- [ ] Mobile app version
- [ ] Integration with external learning resources
- [ ] Real-time collaboration tools
- [ ] Advanced analytics and insights

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Piston API](https://emkc.org/) for secure code execution
- [Material-UI](https://mui.com/) for beautiful components
- [Framer Motion](https://www.framer.com/motion/) for animations
- The Python community for inspiration and resources

## 📞 Contact

- **GitHub**: [@AlyaanKhan](https://github.com/AlyaanKhan)
- **Project Link**: [https://github.com/AlyaanKhan/Learning_Platform](https://github.com/AlyaanKhan/Learning_Platform)

---

⭐ **Star this repository if you found it helpful!**

Made with ❤️ for the Python community