# Environment Variables Setup

## Required Environment Variables

To use this application, you need to set up the following environment variables:

### 1. Create `.env.local` file

Create a `.env.local` file in the `frontend` directory with the following content:

```bash
# OpenAI API Key - Replace with your actual API key
OPENAI_API_KEY=your_openai_api_key_here
```

### 2. Get your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign in or create an account
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key and replace `your_openai_api_key_here` in the `.env.local` file

### 3. Security Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already included in `.gitignore`
- The API key is now handled server-side and never exposed to the client

### 4. Restart the Development Server

After creating the `.env.local` file, restart your Next.js development server:

```bash
npm run dev
```

## How it works

1. The frontend no longer handles API keys directly
2. The Next.js API route (`/api/chat`) reads the API key from environment variables
3. The API key is securely passed to the Python backend
4. Users no longer need to enter their API key in the UI
