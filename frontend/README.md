# 🚀 Dragon Capsule AI Interface

Welcome to the cockpit of your very own SpaceX Dragon capsule! This is where you'll chat with your AI assistant while cruising through space.

## 🎯 What's This?

This is a super cool space-themed chat interface that lets you talk to an AI assistant that knows everything about the Dragon capsule. Think of it as having your own onboard AI co-pilot!

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Your Environment Variables

We need your OpenAI API key to power the AI assistant. Here's how to set it up:

#### Option A: Copy the Example File (Recommended)

```bash
cp env.example .env.local
```

Then edit `.env.local` and replace the placeholder with your actual API key:

```bash
OPENAI_API_KEY=sk-your-actual-api-key-here
```

#### Option B: Create from Scratch

Create a `.env.local` file in the frontend directory:

```bash
# OpenAI API Key - Get yours from https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-actual-api-key-here
```

### 3. Get Your OpenAI API Key 🔑

Don't have one yet? No problem!

1. 🏠 Go to [OpenAI Platform](https://platform.openai.com/)
2. 🔐 Sign in or create an account
3. 🔑 Navigate to API Keys section
4. ➕ Create a new API key
5. 📋 Copy it to your `.env.local` file

### 4. Start the Backend API 🖥️

The frontend needs the Python backend to be running. From the parent directory:

```bash
# Navigate to the API directory
cd ../api

# Install Python dependencies
pip install -r requirements.txt

# Start the backend server
python app.py
```

The backend will start on `http://localhost:8000`

### 5. Launch Your Dragon Capsule! 🚀

In a new terminal, from the frontend directory:

```bash
npm run dev
```

Open your browser to `http://localhost:3000` and prepare for liftoff! 🎉

## 🔧 How It Works

This is a Next.js application with a space-themed UI that:

- 🎨 Uses a beautiful space background with star animations
- 🎛️ Has instrument panels showing real-time telemetry data
- 💬 Features a chat interface powered by OpenAI's GPT models
- 🔐 Keeps your API key secure on the server side
- 🌟 Provides an immersive cockpit experience

## 🛠️ Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **OpenAI API** - AI chat capabilities
- **FastAPI Backend** - Python API for processing

## 🏗️ Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts    # API proxy to backend
│   ├── globals.css          # Global styles and theme
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main cockpit page
└── components/
    ├── ChatInterface.tsx    # Chat interface component
    ├── InstrumentPanel.tsx  # Telemetry displays
    └── SpaceBackground.tsx  # Animated space background
```

## 🔒 Security Notes

- 🚫 Never commit your `.env.local` file to version control
- ✅ The `.env.local` file is already included in `.gitignore`
- 🛡️ API keys are handled server-side and never exposed to the client

## 🛠️ Troubleshooting

**"OpenAI API key not configured"**

- Make sure your `.env.local` file exists and has the correct API key

**"Invalid API key"**

- Double-check that you copied the full API key correctly

**Server not starting**

- Ensure you're in the frontend directory when running `npm run dev`

**Backend connection issues**

- Make sure the Python backend is running on `http://localhost:8000`
- Check that you've installed the Python dependencies: `pip install -r requirements.txt`
- Verify the backend started without errors

**Performance issues**

- The space background animation can be CPU intensive
- Consider reducing the number of stars in `SpaceBackground.tsx` if needed

## 🎮 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌟 Features

- **Real-time Chat**: Stream responses from the AI assistant
- **Space Theme**: Immersive cockpit interface with space background
- **Telemetry Display**: Live spacecraft data and status indicators
- **Responsive Design**: Works on desktop and mobile
- **Secure**: API keys handled server-side

## 🎮 Usage

### Chat Interface

- Type your questions in the text area
- Press Enter to send, Shift+Enter for new line
- Ask about:
  - Technical specifications of the Dragon capsule
  - Current mission status and trajectory
  - Life support systems and safety protocols
  - Historical missions and achievements
  - Fun facts and easter eggs about the spacecraft

### Instrument Panels

- **Top Panel**: Altitude, velocity, temperature, and system status indicators
- **Bottom Panel**: Oxygen levels, battery status, fuel levels, and mission time
- **Side Panels**: Dragon capsule branding and status information

## 🎨 Theme & Customization

### Color Palette

The interface uses a carefully designed color palette inspired by spacecraft cockpits:

- Deep space blacks and blues for surfaces
- Cyan accents for interactive elements
- Cold whites for primary text
- Warning amber and fault red for status indicators

### Customization Options

- Modify `globals.css` to adjust the theme colors
- Update `tailwind.config.ts` for additional styling options
- Customize the AI prompt in `ChatInterface.tsx`

## 🚀 Ready to Explore?

Your Dragon capsule is ready for launch! Ask your AI assistant about:

- Technical specifications of the Dragon capsule
- Current mission status and trajectory
- Life support systems and safety protocols
- Historical missions and achievements
- Fun facts and easter eggs about the spacecraft

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of The AI Engineer Challenge.

Happy space exploring! 🌌
