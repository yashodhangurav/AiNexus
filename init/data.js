const sampleTools = [
  {
    name: "ChatGPT",
    category: "Text Generation",
    description: "Advanced language model by OpenAI capable of coding, writing, and complex problem solving. Features voice mode, vision capabilities, and custom GPT creation.",
    pricingModel: "Freemium",
    websiteUrl: "https://chat.openai.com",
    logo: { 
      url: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg", 
      filename: "ainexus/chatgpt" 
    },
    tags: ["writing", "coding", "assistant", "openai"],
    features: ["Voice Mode", "Web Browsing", "Data Analysis", "Custom GPTs"]
  },
  {
    name: "Midjourney",
    category: "Image Generation",
    description: "Create highly detailed, artistic, and photorealistic images from text prompts using Discord. Currently the industry leader in AI aesthetics.",
    pricingModel: "Subscription",
    websiteUrl: "https://midjourney.com",
    logo: { 
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Midjourney_Emblem.png", 
      filename: "ainexus/midjourney" 
    },
    tags: ["art", "design", "graphics", "discord"],
    features: ["High Resolution", "Style Tuning", "Image Upscaling", "Pan & Zoom"]
  },
  {
    name: "GitHub Copilot",
    category: "Code Assistant",
    description: "Your AI pair programmer that suggests code and entire functions in real-time right inside your favorite IDE (VS Code, Visual Studio, etc).",
    pricingModel: "Paid",
    websiteUrl: "https://github.com/features/copilot",
    logo: { 
      url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg", 
      filename: "ainexus/copilot" 
    },
    tags: ["coding", "development", "programming", "github"],
    features: ["IDE Integration", "Multi-language Support", "Code Explanation", "Test Generation"]
  },
  {
    name: "Claude 3",
    category: "Text Generation",
    description: "Anthropic's latest AI model family featuring massive context windows, exceptional reasoning, and highly nuanced writing capabilities without corporate jargon.",
    pricingModel: "Freemium",
    websiteUrl: "https://claude.ai",
    logo: { 
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Anthropic_logo.svg/512px-Anthropic_logo.svg.png", 
      filename: "ainexus/claude" 
    },
    tags: ["analysis", "writing", "research", "anthropic"],
    features: ["200k Context Window", "File Uploads", "Vision Analysis", "Artifacts"]
  },
  {
    name: "Runway Gen-2",
    category: "Video Editing",
    description: "A multi-modal AI system that can generate novel videos with text, images, or video clips. The gold standard for AI film generation.",
    pricingModel: "Freemium",
    websiteUrl: "https://runwayml.com",
    logo: { 
      url: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/y9w1eqy1w1t3pms6y11e", 
      filename: "ainexus/runway" 
    },
    tags: ["video", "animation", "filmmaking", "creative"],
    features: ["Text to Video", "Image to Video", "Motion Brush", "Video Inpainting"]
  },
  {
    name: "ElevenLabs",
    category: "Voice AI",
    description: "The most realistic AI speech software available. Create incredibly lifelike voiceovers for videos, audiobooks, and games.",
    pricingModel: "Freemium",
    websiteUrl: "https://elevenlabs.io",
    logo: { 
      url: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/jnbzh5qj1k58dwhrtuox", 
      filename: "ainexus/elevenlabs" 
    },
    tags: ["audio", "speech", "voiceover", "cloning"],
    features: ["Voice Cloning", "Text to Speech", "Emotion Control", "Multi-lingual"]
  },
  {
    name: "Notion AI",
    category: "Productivity",
    description: "Access the limitless power of AI, right inside your Notion workspace. Write better, think bigger, and automate tedious tasks.",
    pricingModel: "Subscription",
    websiteUrl: "https://notion.so/product/ai",
    logo: { 
      url: "https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png", 
      filename: "ainexus/notionai" 
    },
    tags: ["workspace", "notes", "planning", "automation"],
    features: ["Document Summarization", "Task Extraction", "Tone Adjustment", "Translation"]
  },
  {
    name: "Stable Diffusion",
    category: "Image Generation",
    description: "A latent text-to-image diffusion model capable of generating photo-realistic images. Entirely open-source and free to run locally.",
    pricingModel: "Free",
    websiteUrl: "https://stability.ai",
    logo: { 
      url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Stable_Diffusion_logo.png", 
      filename: "ainexus/stablediffusion" 
    },
    tags: ["opensource", "art", "local", "uncensored"],
    features: ["Open Source", "Local Hosting", "ControlNet", "Unlimited Generation"]
  },
  {
    name: "Perplexity AI",
    category: "Chatbot",
    description: "An AI-powered search engine that provides direct answers to your questions with cited sources in real-time.",
    pricingModel: "Freemium",
    websiteUrl: "https://perplexity.ai",
    logo: { 
      url: "https://images.crunchbase.com/image/upload/c_pad,h_256,w_256,f_auto,q_auto:eco,dpr_1/vpx2h3oog33yowc8h0o4", 
      filename: "ainexus/perplexity" 
    },
    tags: ["search", "research", "citations", "web"],
    features: ["Real-time Web Search", "Source Citations", "Pro Search Mode", "Focus Modes"]
  },
  {
    name: "Gemini",
    category: "Chatbot",
    description: "Google's highly capable multimodal AI model. It can seamlessly understand, operate across, and combine different types of information including text, code, audio, image, and video.",
    pricingModel: "Freemium",
    websiteUrl: "https://gemini.google.com",
    logo: { 
      url: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Google_Gemini_logo.svg", 
      filename: "ainexus/gemini" 
    },
    tags: ["google", "multimodal", "research", "assistant"],
    features: ["Deep Google Workspace Integration", "Multimodal Reasoning", "Real-time Web Access"]
  },
  {
    name: "Cursor",
    category: "Code Assistant",
    description: "The AI-first code editor built to make you extraordinarily productive. It's a fork of VS Code, so all your extensions work, but with deep AI integration.",
    pricingModel: "Freemium",
    websiteUrl: "https://cursor.sh",
    logo: { 
      url: "https://placehold.co/200x200/050505/ffffff?text=Cursor", 
      filename: "ainexus/cursor" 
    },
    tags: ["coding", "ide", "development", "productivity"],
    features: ["Codebase Indexing", "Inline AI Editing", "Terminal Chat", "VS Code Compatible"]
  },
  {
    name: "Synthesia",
    category: "Video Editing",
    description: "Create professional AI videos from text in over 120 languages. No equipment or video editing skills required. Perfect for training and marketing.",
    pricingModel: "Subscription",
    websiteUrl: "https://www.synthesia.io",
    logo: { 
      url: "https://placehold.co/200x200/1e1b4b/a855f7?text=Synthesia", 
      filename: "ainexus/synthesia" 
    },
    tags: ["video", "avatars", "marketing", "presentation"],
    features: ["140+ AI Avatars", "120+ Languages", "Custom Avatars", "Text-to-Video"]
  },
  {
    name: "Descript",
    category: "Productivity",
    description: "A radically new approach to video and audio editing. Edit your podcasts and videos by editing a text transcript.",
    pricingModel: "Freemium",
    websiteUrl: "https://www.descript.com",
    logo: { 
      url: "https://placehold.co/200x200/0ea5e9/ffffff?text=Descript", 
      filename: "ainexus/descript" 
    },
    tags: ["audio", "video", "transcription", "podcasting"],
    features: ["Text-based Video Editing", "Overdub (Voice Cloning)", "Studio Sound", "Auto-Transcription"]
  },
  {
    name: "Suno AI",
    category: "Voice AI",
    description: "A groundbreaking AI music generation platform that creates full, radio-quality songs complete with vocals, instrumentation, and lyrics from a simple text prompt.",
    pricingModel: "Freemium",
    websiteUrl: "https://suno.com",
    logo: { 
      url: "https://placehold.co/200x200/000000/ffffff?text=Suno", 
      filename: "ainexus/suno" 
    },
    tags: ["music", "audio", "creative", "generation"],
    features: ["Full Song Generation", "Custom Lyrics", "Multiple Genres", "Vocal Synthesis"]
  },
  {
    name: "Jasper",
    category: "Text Generation",
    description: "The AI copilot for enterprise marketing teams. Create on-brand blog posts, ad copy, and social media campaigns 10x faster.",
    pricingModel: "Paid",
    websiteUrl: "https://www.jasper.ai",
    logo: { 
      url: "https://placehold.co/200x200/4f46e5/ffffff?text=Jasper", 
      filename: "ainexus/jasper" 
    },
    tags: ["marketing", "copywriting", "seo", "enterprise"],
    features: ["Brand Voice Control", "SEO Optimization", "Campaign Management", "Browser Extension"]
  },
  {
    name: "Phind",
    category: "Code Assistant",
    description: "The AI search engine tailored specifically for developers. It connects directly to the web and your codebase to give you technically accurate answers.",
    pricingModel: "Free",
    websiteUrl: "https://www.phind.com",
    logo: { 
      url: "https://placehold.co/200x200/111827/ffffff?text=Phind", 
      filename: "ainexus/phind" 
    },
    tags: ["search", "developer", "coding", "research"],
    features: ["Technical Search", "Code Extraction", "Paired Programming Mode", "No Tracking"]
  },
  {
    name: "Canva Magic Studio",
    category: "Image Generation",
    description: "All the power of AI integrated directly into the world's most popular design tool. Generate images, write copy, and animate designs effortlessly.",
    pricingModel: "Freemium",
    websiteUrl: "https://www.canva.com/magic",
    logo: { 
      url: "https://upload.wikimedia.org/wikipedia/commons/0/08/Canva_icon_2021.svg", 
      filename: "ainexus/canva" 
    },
    tags: ["design", "graphics", "presentation", "social media"],
    features: ["Magic Expand", "Text to Image", "Magic Eraser", "AI Presentations"]
  },
  {
    name: "Leonardo AI",
    category: "Image Generation",
    description: "Generate production-quality assets for your creative projects with speed and style-consistency. Highly popular among game developers and concept artists.",
    pricingModel: "Freemium",
    websiteUrl: "https://leonardo.ai",
    logo: { 
      url: "https://placehold.co/200x200/2a2a2a/ffffff?text=Leonardo", 
      filename: "ainexus/leonardo" 
    },
    tags: ["gaming", "assets", "art", "character-design"],
    features: ["Image to Image", "Realtime Canvas", "Custom Model Training", "Texture Generation"]
  },
  {
    name: "Pika",
    category: "Video Editing",
    description: "An idea-to-video platform that sets your creativity in motion. Simply type what you want to see and Pika generates a high-quality video clip instantly.",
    pricingModel: "Freemium",
    websiteUrl: "https://pika.art",
    logo: { 
      url: "https://placehold.co/200x200/ff5500/ffffff?text=Pika", 
      filename: "ainexus/pika" 
    },
    tags: ["video", "animation", "motion", "creative"],
    features: ["Lip Sync", "Expand Canvas", "Modify Region", "Text-to-Video"]
  },
  {
    name: "Codeium",
    category: "Code Assistant",
    description: "The modern coding superpower. Codeium offers industry-leading AI code completion and chat that is completely free for individual developers.",
    pricingModel: "Free",
    websiteUrl: "https://codeium.com",
    logo: { 
      url: "https://placehold.co/200x200/09b6a2/ffffff?text=Codeium", 
      filename: "ainexus/codeium" 
    },
    tags: ["coding", "opensource", "autocomplete", "free"],
    features: ["Lightning Fast Autocomplete", "In-Editor Chat", "70+ Languages", "Unlimited Usage"]
  },
  {
    name: "Gamma",
    category: "Productivity",
    description: "A new medium for presenting ideas. Powered by AI, Gamma generates beautiful, engaging presentations, webpages, and documents in seconds.",
    pricingModel: "Freemium",
    websiteUrl: "https://gamma.app",
    logo: { 
      url: "https://placehold.co/200x200/1e293b/ffffff?text=Gamma", 
      filename: "ainexus/gamma" 
    },
    tags: ["presentations", "slides", "pitch-decks", "design"],
    features: ["One-Click Themes", "Interactive Elements", "Auto-Formatting", "Analytics"]
  },
  {
    name: "Murf AI",
    category: "Voice AI",
    description: "Go from text to voice in minutes. Murf provides studio-quality AI voiceovers for podcasts, videos, and professional presentations.",
    pricingModel: "Subscription",
    websiteUrl: "https://murf.ai",
    logo: { 
      url: "https://placehold.co/200x200/2563eb/ffffff?text=Murf", 
      filename: "ainexus/murf" 
    },
    tags: ["audio", "voiceover", "studio", "podcasts"],
    features: ["120+ Text to Speech Voices", "Voice Cloning", "Video Syncing", "Pitch Control"]
  },
  {
    name: "Copy.ai",
    category: "Text Generation",
    description: "The AI platform that empowers go-to-market teams to write better, faster. Generate high-converting emails, blog posts, and social media captions.",
    pricingModel: "Freemium",
    websiteUrl: "https://www.copy.ai",
    logo: { 
      url: "https://placehold.co/200x200/10b981/ffffff?text=Copy.ai", 
      filename: "ainexus/copyai" 
    },
    tags: ["copywriting", "marketing", "sales", "social-media"],
    features: ["Brand Voice", "Multi-language", "Workflow Automation", "90+ Copywriting Tools"]
  },
  {
    name: "Zapier Central",
    category: "Productivity",
    description: "Teach AI bots to work across 6,000+ apps. Central allows you to build AI assistants that actually take action and automate your workflows.",
    pricingModel: "Subscription",
    websiteUrl: "https://zapier.com/central",
    logo: { 
      url: "https://placehold.co/200x200/ff4f00/ffffff?text=Zapier", 
      filename: "ainexus/zapier" 
    },
    tags: ["automation", "workflows", "integration", "bots"],
    features: ["6000+ Integrations", "Live Data Access", "Automated Actions", "Custom Instructions"]
  },
  {
    name: "HeyGen",
    category: "Video Editing",
    description: "Produce engaging business videos with generative AI. Turn text into professional spokesperson videos without needing a camera or crew.",
    pricingModel: "Paid",
    websiteUrl: "https://www.heygen.com",
    logo: { 
      url: "https://placehold.co/200x200/7c3aed/ffffff?text=HeyGen", 
      filename: "ainexus/heygen" 
    },
    tags: ["video", "avatars", "business", "training"],
    features: ["Instant Avatar Cloning", "100+ AI Avatars", "Voice Cloning", "API Integration"]
  }
];

module.exports = { data: sampleTools };