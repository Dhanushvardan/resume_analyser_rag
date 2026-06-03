# 📄 RAG-Based Resume Analyzer

> Analyze resumes intelligently and generate dynamic interviewer questions using Retrieval-Augmented Generation.

![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688?style=flat-square&logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react&logoColor=black)
![LangGraph](https://img.shields.io/badge/LangGraph-latest-4B0082?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## 🧠 Overview

The **RAG-Based Resume Analyzer** is a full-stack AI application that accepts a resume as input, extracts and indexes its content using RAG (Retrieval-Augmented Generation), and generates targeted, role-aware interview questions dynamically using LangGraph-orchestrated LLM pipelines.

Whether you're a recruiter screening candidates or a developer exploring AI-powered document intelligence, this tool transforms static resumes into structured, actionable insights.

---

## ✨ Features

- 📤 **Resume Upload** — Upload PDF or text-based resumes through a clean React UI
- 🔍 **RAG Pipeline** — Chunks and embeds resume content into a vector store for semantic retrieval
- 🤖 **LLM-Powered Analysis** — Extracts skills, experience, and key highlights using LLMs
- ❓ **Dynamic Question Generation** — Produces tailored interviewer questions based on resume context
- 🔄 **LangGraph Orchestration** — Multi-step agentic workflow for retrieval, reasoning, and generation
- ⚡ **FastAPI Backend** — Async, high-performance API endpoints
- 🌐 **React Frontend** — Responsive UI for upload, analysis display, and question review

---

## 🏗️ Architecture

```
┌─────────────────────┐
│     React Frontend  │  ← Upload resume, view analysis & questions
└────────┬────────────┘
         │ HTTP / REST
┌────────▼────────────┐
│   FastAPI Backend   │  ← Handles file ingestion, routing, API logic
└────────┬────────────┘
         │
┌────────▼────────────┐
│  LangGraph Pipeline │  ← Orchestrates multi-step agentic workflow
│  ┌───────────────┐  │
│  │  RAG Retriever│  │  ← Semantic search over embedded resume chunks
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │  LLM Analyzer │  │  ← Extracts skills, experience, highlights
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │ Question Gen  │  │  ← Generates role-relevant interview questions
│  └───────────────┘  │
└────────┬────────────┘
         │
┌────────▼────────────┐
│    Vector Store     │  ← Stores resume embeddings (FAISS / ChromaDB)
└─────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer       | Technology                         |
|-------------|-------------------------------------|
| Frontend    | React 18, Axios, TailwindCSS        |
| Backend     | FastAPI, Python 3.10+               |
| AI/LLM      | LangGraph, LangChain, OpenAI / Groq |
| Vector DB   | FAISS / ChromaDB                    |
| Embeddings  | OpenAI Embeddings / HuggingFace     |
| File Parsing| PyMuPDF / pdfplumber                |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Python 3.10+
- An OpenAI (or compatible) API key

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rag-resume-analyzer.git
cd rag-resume-analyzer
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `/backend`:

```env
OPENAI_API_KEY=your_openai_api_key
```

Start the FastAPI server:

```bash
uvicorn main:app --reload --port 8000
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📁 Project Structure

```
rag-resume-analyzer/
├── backend/
│   ├── main.py                  # FastAPI entry point
│   ├── routers/
│   │   └── resume.py            # Resume upload & analysis routes
│   ├── services/
│   │   ├── rag_pipeline.py      # RAG ingestion & retrieval logic
│   │   ├── langgraph_agent.py   # LangGraph workflow definition
│   │   └── question_generator.py
│   ├── utils/
│   │   └── pdf_parser.py        # Resume text extraction
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── UploadForm.jsx
│   │   │   ├── AnalysisResult.jsx
│   │   │   └── QuestionList.jsx
│   │   └── App.jsx
│   └── package.json
└── README.md
```

---

## 🔄 How It Works

1. **Upload** — User uploads a resume (PDF/text) via the React UI.
2. **Parse** — FastAPI extracts raw text using `pdfplumber` / `PyMuPDF`.
3. **Chunk & Embed** — Text is split into chunks and embedded into a vector store.
4. **LangGraph Workflow** kicks off:
   - **Node 1 — Retrieve**: Fetches relevant resume sections via semantic search.
   - **Node 2 — Analyze**: LLM extracts skills, experience, tech stack, and highlights.
   - **Node 3 — Generate**: LLM produces tailored interview questions per section.
5. **Display** — Results streamed back to the React UI.

---

## 📸 Screenshots

> _Add screenshots of the upload UI, analysis panel, and generated questions here._

---

## 🔮 Roadmap

- [ ] Support for multi-resume batch analysis
- [ ] Role-specific question sets (Frontend, Backend, ML, etc.)
- [ ] Export questions as PDF / DOCX
- [ ] Resume scoring and gap analysis
- [ ] Auth + history dashboard

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**D** — MERN Stack & AI Engineer  
[GitHub](https://github.com/your-username) · [LinkedIn](https://linkedin.com/in/your-profile)
