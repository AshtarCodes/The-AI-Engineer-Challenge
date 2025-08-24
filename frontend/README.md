# SpaceX Dragon Capsule Cockpit Interface

A Next.js frontend application that simulates a first-person cockpit interface for the SpaceX Dragon capsule. Users can interact with an AI assistant to get information about the spacecraft, mission status, and technical specifications.

## Features

- **Immersive Cockpit Design**: Dark, high-contrast interface with SpaceX Dragon capsule styling
- **Animated Space Background**: Dynamic stars and celestial bodies visible through the cockpit
- **Real-time Telemetry**: Live instrument panels showing altitude, velocity, temperature, and system status
- **AI Chat Interface**: Communicate with the Dragon capsule AI assistant
- **Streaming Responses**: Real-time streaming chat responses for an authentic experience
- **Responsive Design**: Works on desktop and tablet devices

## Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key
- Backend API running on port 8000 (see parent directory)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Make sure the backend API is running:
```bash
# From the parent directory
cd ../api
pip install -r requirements.txt
python app.py
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:3000`

3. Enter your OpenAI API key in the interface

4. Start chatting with the Dragon capsule AI!

## Usage

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

## Technical Details

### Architecture
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Styling**: Custom Dragon capsule theme with CSS variables
- **Animations**: Canvas-based space background with animated stars
- **API**: Proxies requests to the backend FastAPI server

### Key Components
- `SpaceBackground`: Animated canvas with stars and celestial bodies
- `InstrumentPanel`: Real-time telemetry displays
- `ChatInterface`: AI chat with streaming responses
- `CockpitPage`: Main layout and orchestration

### Theme Colors
The interface uses a carefully designed color palette inspired by spacecraft cockpits:
- Deep space blacks and blues for surfaces
- Cyan accents for interactive elements
- Cold whites for primary text
- Warning amber and fault red for status indicators

## Development

### Project Structure
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

### Customization
- Modify `globals.css` to adjust the theme colors
- Update `tailwind.config.ts` for additional styling options
- Customize the AI prompt in `ChatInterface.tsx`

## Troubleshooting

### Common Issues

1. **API Connection Error**
   - Ensure the backend API is running on port 8000
   - Check that your OpenAI API key is valid

2. **Styling Issues**
   - Clear browser cache and restart the dev server
   - Verify that Tailwind CSS is properly configured

3. **Performance Issues**
   - The space background animation can be CPU intensive
   - Consider reducing the number of stars in `SpaceBackground.tsx`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of The AI Engineer Challenge.
