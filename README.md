
<div align="center">
  <img src="./public/assets/favicon.svg" alt="AiNexus Logo" width="100"/>

  <h1>AiNexus</h1>
  <p><strong>The Intelligence Layer for Modern Workflows</strong></p>

  <p>
    <a href="#-core-innovations">Core Innovations</a> •
    <a href="#-key-features">Key Features</a> •
    <a href="#-the-ai-tech-stack">The AI Engine</a> •
    <a href="#-installation--setup">Setup</a> •
    <a href="#-environment-variables">Env Vars</a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/AI--Powered-Vector%20Search-blueviolet?style=for-the-badge" alt="Vector Search" />
    <img src="https://img.shields.io/badge/Gemini-AI%20Embeddings-blue?style=for-the-badge" alt="Gemini" />
    <img src="https://img.shields.io/badge/MongoDB-Atlas%20Vector-green?style=for-the-badge" alt="MongoDB" />
  </p>
</div>

---

## 🌟 Core Innovations

Unlike traditional directories, **AiNexus** is built on a modern AI architecture that understands user intent through semantic relationships.

### 🧠 Semantic "Smart Search" (RAG Architecture)
Our search engine doesn't just match keywords; it understands meaning. Powered by **Google Gemini Embeddings** and **MongoDB Atlas Vector Search**, users can find tools using natural language.
* *Example:* Searching for *"I need help writing a book"* will intelligently rank tools like Jasper and ChatGPT, even if the word "book" isn't in their title.

### ⚖️ AI-Powered "Versus Engine" (Dynamic RAG Analysis)
Our comparison module acts as a live consultant rather than a static table. By piping real-time MongoDB document data into the **Gemini 2.5 Flash API**, the system synthesizes raw features into actionable insights.
* **Smart Verdicts:** The AI reasons through pricing and capability density to declare a "Professional Winner" and a "Beginner's Best Value" instantly.
* **Winner Glow UI:** A dynamic CSS engine that visually pulses and highlights the superior tool based on AI-driven data synthesis.

### 🤖 Fully Functional AI Nexus-Bot
A completely integrated, **live conversational assistant**. The AiNexus chatbot helps users navigate the landscape of AI, provides real-time recommendations, and explains tool capabilities within a sleek, glassmorphic interface.

### 💖 "My Tech Stack" & Personal Dashboard
A high-retention feature allowing members to curate their ultimate AI toolkit. 
* **AJAX Heart Toggle:** Save tools to your profile instantly without page reloads.
* **Dynamic Dashboard:** A professional space to manage and view your saved assets.

---

## ✨ Key Features

- **🔍 Intent-Based Discovery:** Semantic search that maps natural language to 3072-dimensional vector math.
- **💎 Premium Glassmorphic UI:** Dark theme featuring spotlight hover effects, aurora-glow buttons, and responsive layouts.
- **🔐 Passport.js Security:** Industrial-grade authentication and authorization for managing listings.
- **☁️ Cloudinary Media Hub:** Secure, cloud-based image management for high-resolution tool logos.
- **🎙️ AI Voice Assistant:** Integrated with the **Web Speech API** for hands-free, voice-to-vector search.

---

## 🛠️ The AI Tech Stack

**The Brain:**
- **Google Generative AI:** Gemini Embedding models for semantic processing and Gemini 2.5 Flash for comparison logic.
- **MongoDB Atlas Vector Search:** High-performance vector database for RAG implementation.

**The Foundation:**
- **Backend:** Node.js & Express.js
- **Frontend:** EJS, CSS3 (Custom Glassmorphism), Vanilla JS (DOM/AJAX)
- **Security:** Passport.js (Local Strategy), Joi (Schema Validation)
- **Cloud:** Cloudinary (Storage), MongoDB Atlas (Hosting)

---

## 💻 Installation & Setup

**1. Clone the repository**
```bash
git clone [https://github.com/yashodhangurav/AiToolHub.git](https://github.com/yashodhangurav/AiToolHub.git)
cd AiToolHub
````

**2. Install dependencies**

```bash
npm install
```

**3. Configure Environment Variables**
Create a `.env` file in the root directory (see the section below).

**4. Run the application**

```bash
# Development mode
npm run dev

# Production mode
npm start
```

-----

## 🔑 Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:

```env
# Cloudinary (Media Storage)
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

# MongoDB (Database)
ATLASDB_URL=your_mongodb_atlas_connection_string

# AI (Google Gemini)
GEMINI_API_KEY=your_google_ai_studio_api_key

# Authentication
SECRET=your_passport_secret_string
```

-----

<div align="center">
<p>Built with 💜 by <a href="https://www.google.com/search?q=https://github.com/yashodhangurav">Yashodhan Gurav</a></p>
</div>


