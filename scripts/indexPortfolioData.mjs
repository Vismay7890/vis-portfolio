import { buildPortfolioDocuments } from '../src/data/profileData.js';

const OPENAI_EMBEDDING_MODEL = process.env.OPENAI_EMBEDDING_MODEL || 'text-embedding-3-small';
const OPENAI_EMBEDDING_DIMENSIONS = Number(process.env.OPENAI_EMBEDDING_DIMENSIONS || 512);

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

async function embed(text) {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${requireEnv('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_EMBEDDING_MODEL,
      input: text,
      dimensions: OPENAI_EMBEDDING_DIMENSIONS,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI embedding failed: ${response.status} ${await response.text()}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

async function upsert(vectors) {
  const host = requireEnv('PINECONE_HOST').replace(/\/$/, '');
  const response = await fetch(`${host}/vectors/upsert`, {
    method: 'POST',
    headers: {
      'Api-Key': requireEnv('PINECONE_API_KEY'),
      'Content-Type': 'application/json',
      'X-Pinecone-API-Version': '2025-04',
    },
    body: JSON.stringify({ vectors }),
  });

  if (!response.ok) {
    throw new Error(`Pinecone upsert failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

async function describeStats() {
  const host = requireEnv('PINECONE_HOST').replace(/\/$/, '');
  const response = await fetch(`${host}/describe_index_stats`, {
    method: 'POST',
    headers: {
      'Api-Key': requireEnv('PINECONE_API_KEY'),
      'Content-Type': 'application/json',
      'X-Pinecone-API-Version': '2025-04',
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(`Pinecone stats failed: ${response.status} ${await response.text()}`);
  }

  return response.json();
}

const docs = buildPortfolioDocuments();
const vectors = [];

for (const doc of docs) {
  const values = await embed(doc.text);
  vectors.push({
    id: doc.id,
    values,
    metadata: {
      title: doc.title,
      text: doc.text,
      type: doc.type,
    },
  });
  console.log(`Embedded ${doc.id}`);
}

const result = await upsert(vectors);
const stats = await describeStats();

console.log(JSON.stringify({ upserted: result.upsertedCount, totalVectorCount: stats.totalVectorCount }, null, 2));
