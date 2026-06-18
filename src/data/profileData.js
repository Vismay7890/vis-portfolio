export const PROFILE = {
  name: 'Vismay Jain',
  title: 'GenAI Engineer',
  employer: 'Ideyalabs',
  email: 'ai20.vismay.jain@gmail.com',
  resumePath: '/src/public/jain_vismay.pdf',
  summary:
    'GenAI Engineer specializing in enterprise-grade agentic frameworks, large language model fine-tuning, production-ready RAG architectures, observability, and cost optimization.',
};

export const PROJECTS = [
  {
    id: 1,
    title: 'Vyxion',
    category: 'Knowledge Graph Platform (2024 - Present)',
    desc: 'Decision intelligence platform utilizing FastAPI, Next.js, and Claude AI. Built custom graph representation engine using NetworkX for complex relationship modeling and probabilistic simulations supporting 500+ nodes at 60fps.',
    color: 'var(--bg-accent-green)',
    textColor: 'var(--text-dark)',
    link: '#',
  },
  {
    id: 2,
    title: 'Code Documentation LLM Agent',
    category: 'RAG Agent System (2024)',
    desc: 'Designed microservice adapting developer documentation websites into intelligent LLM RAG agents. Processes 10,000+ pages via Pinecone vector stores and hybrid metadata searches to achieve sub-second 95% accurate queries.',
    color: 'var(--bg-accent-purple)',
    textColor: 'var(--text-dark)',
    link: '#',
  },
  {
    id: 3,
    title: 'Sierra',
    category: 'Voice-Activated GenAI Assistant (2024)',
    desc: 'Voice interface using Python, Groq API, and LLaMA for intent parsing and natural language generation. Integrated custom API triggers for Spotify, WhatsApp, and DALL-E APIs.',
    color: 'var(--bg-accent-pink)',
    textColor: 'var(--text-dark)',
    link: '#',
  },
];

export const SKILL_CARDS = [
  {
    title: 'Generative AI',
    items: ['LangGraph Agents', 'LangChain Workflows', 'Prompt Engineering', 'Model Context Protocol (MCP)'],
  },
  {
    title: 'Model Tuning',
    items: ['vLLM Inference', 'Ollama Environments', 'PEFT Fine-tuning', 'QLoRA Optimization'],
  },
  {
    title: 'Vector Databases',
    items: ['Pinecone Indexing', 'ChromaDB Setup', 'Hybrid Lexical/Semantic Search', 'Knowledge Graph RAG'],
  },
  {
    title: 'Observability',
    items: ['Langfuse Tracing', 'Prometheus Monitoring', 'Token Usage tracking', 'SLA Latency analysis'],
  },
  {
    title: 'Backend Engineering',
    items: ['FastAPI (Python)', 'Flask Applications', 'REST API Architectures', 'SSE Data Streaming'],
  },
  {
    title: 'Cloud & DevOps',
    items: ['Docker Containers', 'AWS S3 & EC2', 'Terraform Templates', 'GitHub Actions CI/CD'],
  },
];

export const EXPERIENCES = [
  {
    role: 'GenAI Engineer',
    company: 'Ideyalabs',
    duration: 'June 2025 - Present',
    desc: [
      'Architected Dev Agent - multi-agent code generation platform with 5 specialized agents (Architecture, Screen Planner, Frontend, Backend, Database) using LangGraph.',
      'Built QA Agent - AI-powered test automation platform utilizing hybrid vector search with Pinecone and semantic understanding, achieving 95%+ coverage.',
      'Designed CSX AI Customer Support Agent serving 10,000+ monthly chats, reducing latency by 90% (110s to 11s) with caching, async streams, and SSE.',
      'Created custom Model Context Protocol (MCP) client achieving 98% faster tool execution using JSON-RPC 2.0 with autonomous loops.',
      'Built DocAgent - codebase documentation platform traversing knowledge graphs and Pinecone RAG with React Flow.',
    ],
  },
  {
    role: 'AI Engineer',
    company: 'Commercient LLC',
    duration: 'June 2024 - June 2025',
    desc: [
      'Architected and deployed in-house LLM-powered sales assistant replacing third-party chatbot, saving $12,000 annually and improving accuracy by 35%.',
      'Engineered multi-modal chatbot processing video/documents/images using Whisper, LLaMA Vision, and GPT Vision APIs with Pinecone RAG.',
      'Deployed fine-tuned models over multi-GPU A100 nodes using vLLM inference engine, reducing latency by 40%.',
    ],
  },
  {
    role: 'AI/ML Intern',
    company: 'Commercient LLC',
    duration: 'Dec 2023 - June 2024',
    desc: [
      'Built production RAG system using Pinecone vector databases and OpenAI embeddings, reducing response times from 20s to 5s using semantic caching.',
    ],
  },
  {
    role: 'AI/ML Intern',
    company: 'Logictrix Infotech',
    duration: 'May 2023 - July 2023',
    desc: [
      'Fine-tuned ALBERT model for enterprise email classification, achieving 92% classification accuracy deployed on AWS Lambda with auto-scaling.',
    ],
  },
];

export const CERTIFICATIONS = [
  {
    title: 'AWS Machine Learning Specialty (MLS-C01)',
    issuer: 'AWS',
    image: '/src/assets/certifications/aws.png',
    description:
      'Demonstrates expertise in building, training, deploying, and tuning machine learning models on the AWS platform. Verification Code: 0156d1f6a8d544829a242df10f2fc3bd.',
    certLink: 'https://aws.amazon.com/verification',
  },
  {
    title: 'AWS Partner: Accreditation (Technical)',
    issuer: 'AWS',
    image: '/src/assets/certifications/aws.png',
    description:
      'Validates technical proficiency in AWS solutions and services, aligned with best practices for design and implementation.',
    certLink: 'https://www.credly.com/badges/365bb1b4-f5b6-461c-b59a-b564f8b2aea5/public_url',
  },
  {
    title: 'Introduction to Generative AI',
    issuer: 'Google Cloud',
    image: '/src/assets/certifications/google.png',
    description:
      'Covers the fundamentals of generative AI, including models, applications, and ethical considerations.',
    certLink: 'https://www.cloudskillsboost.google/public_profiles/21e377f3-213e-4486-bd68-91e4d62ddc4c/badges/4076882',
  },
  {
    title: 'IBM Data Analysis',
    issuer: 'IBM',
    image: '/src/assets/certifications/ibm.png',
    description:
      'Focuses on data analysis skills including data collection, cleaning, visualization, and interpretation.',
    certLink: 'https://www.credly.com/badges/bed23345-b673-4e92-a272-9f15d6c3e44b/public_url',
  },
  {
    title: 'Data Analysis with Python',
    issuer: 'Coursera',
    image: '/src/assets/certifications/coursera.png',
    description:
      'Demonstrates proficiency using Python for data analysis tasks, including libraries like Pandas and NumPy.',
    certLink: 'https://www.coursera.org/account/accomplishments/certificate/ZA9VLKZF583W',
  },
];

export const CHATBOT_SEED_QUESTIONS = [
  'What does Vismay specialize in?',
  'Summarize his GenAI experience.',
  'Which certifications does he have?',
  'What RAG and vector database work has he done?',
];

export function buildPortfolioDocuments() {
  const docs = [
    {
      id: 'profile-summary',
      title: 'Profile Summary',
      text: `${PROFILE.name} is a ${PROFILE.title} at ${PROFILE.employer}. ${PROFILE.summary} Contact email: ${PROFILE.email}. Resume: ${PROFILE.resumePath}.`,
      type: 'profile',
    },
    ...PROJECTS.map((project) => ({
      id: `project-${project.id}`,
      title: project.title,
      text: `${project.title}. ${project.category}. ${project.desc}`,
      type: 'project',
    })),
    ...SKILL_CARDS.map((skill) => ({
      id: `skill-${skill.title.toLowerCase().replaceAll(' ', '-')}`,
      title: skill.title,
      text: `${skill.title}: ${skill.items.join(', ')}.`,
      type: 'skill',
    })),
    ...EXPERIENCES.map((exp, index) => ({
      id: `experience-${index + 1}`,
      title: `${exp.role} at ${exp.company}`,
      text: `${exp.role} at ${exp.company}, ${exp.duration}. ${exp.desc.join(' ')}`,
      type: 'experience',
    })),
    ...CERTIFICATIONS.map((cert, index) => ({
      id: `certification-${index + 1}`,
      title: cert.title,
      text: `${cert.title}, issued by ${cert.issuer}. ${cert.description} Certificate link: ${cert.certLink}.`,
      type: 'certification',
    })),
  ];

  return docs;
}
