# Microsoft Chat - Anonymous Messaging App Prototype

A React Native/Expo mobile app prototype that mimics Sidechat's anonymous messaging functionality, specifically designed with Microsoft branding and theming.

## 🚀 Features

### Core Functionality
- **Anonymous Message Feed**: Scrollable feed of anonymous messages with Microsoft-themed content
- **Channel System**: Multiple channels for different Microsoft product discussions
- **Interactive Posts**: Like and reply functionality for each message
- **Compose Messages**: Modal interface for creating new anonymous posts
- **Pull-to-Refresh**: Refresh the message feed
- **Microsoft Branding**: Custom color scheme inspired by Microsoft's design system

### Channels Included
- **Microsoft General**: General Microsoft discussions
- **Teams Discussion**: Microsoft Teams related content
- **.NET Development**: C#, .NET Framework discussions
- **Windows Updates**: Windows patches and security news
- **Power Platform**: Power Apps, Power Automate, Power BI
- **DevOps Chat**: Azure DevOps and CI/CD discussions
- **Copilot Users**: Microsoft Copilot experiences and tips
- **Office Support**: Office 365 and Office apps help

### Key Components

#### 1. MessagePost Component
- Displays anonymous messages with channel tags
- Shows timestamp, likes, and reply counts
- Interactive like/reply buttons
- Anonymous indicator styling

#### 2. ChannelCard Component
- Channel listing with member counts
- Channel descriptions and icons
- Tap-to-navigate functionality

#### 3. FloatingActionButton
- Persistent compose button
- Microsoft blue primary color
- Bottom-right positioning

#### 4. ComposeModal
- Full-screen modal for creating posts
- Character limit (500 chars)
- Channel selection
- Anonymous posting notice

## 🎨 Design System

### Microsoft Color Palette
- **Primary Blue**: `#0078D4` (Microsoft brand blue)
- **Secondary Blue**: `#106EBE`
- **Accent Yellow**: `#FFB900`
- **Success Green**: `#107C10`
- **Warning Orange**: `#FF8C00`
- **Error Red**: `#D13438`

### Typography
- Microsoft-inspired typography using system fonts
- Clear hierarchy with title, subtitle, and body text styles
- Consistent spacing and padding

## 📱 App Structure

```
/app
├── (tabs)/
│   ├── index.tsx          # Main feed screen
│   ├── explore.tsx        # Channels listing
│   └── _layout.tsx        # Tab navigation
├── +not-found.tsx         # 404 page
└── _layout.tsx            # Root layout

/components
├── MessagePost.tsx        # Individual message component
├── ChannelCard.tsx        # Channel listing item
├── FloatingActionButton.tsx # Compose FAB
├── ComposeModal.tsx       # Message composition modal
└── [other components]     # Themed components from Expo

/data
└── mockData.ts           # Mock messages and channels

/constants
└── Colors.ts             # Microsoft color scheme
```

## 🔧 Technical Implementation

### Built With
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tooling
- **TypeScript**: Type-safe JavaScript
- **Expo Router**: File-based navigation
- **React Navigation**: Tab navigation

### Key Features
1. **Anonymous Messaging**: No user authentication or identification
2. **Real-time UI Updates**: Optimistic updates for likes/interactions
3. **Pull-to-Refresh**: Standard mobile app refresh pattern
4. **Modal Navigation**: Compose modal with proper animations
5. **Microsoft Theming**: Consistent brand colors and styling

## 🚀 Getting Started

### Prerequisites
- Node.js (16+ recommended)
- npm or yarn
- Expo CLI
- iOS Simulator / Android Emulator / Expo Go app

### Installation
```bash
# Install dependencies
npm install

# Start the development server
npm start

# Run on specific platforms
npm run ios     # iOS Simulator
npm run android # Android Emulator
npm run web     # Web browser
```

### Development
```bash
# Scan QR code with Expo Go app for mobile testing
# Or press 'w' in terminal to open web version
# Press 'r' to reload the app during development
```

## 📋 Sample Data

The app includes realistic Microsoft-focused anonymous messages covering:
- Product announcements and discussions
- Technical development topics
- User experience feedback
- Support and troubleshooting
- Community discussions

## 🎯 Prototype Scope

This is a **prototype/proof-of-concept** that demonstrates:
✅ Anonymous messaging UI/UX  
✅ Microsoft branding and theming  
✅ Multi-channel organization  
✅ Mobile-first design  
✅ Interactive post features  
✅ Compose functionality  

**Not included in this prototype:**
- Real backend/database
- User authentication
- Real-time messaging
- Push notifications
- Content moderation
- Network connectivity

## 🔮 Future Enhancements

For a production version, consider adding:
- **Backend Integration**: Firebase, Supabase, or custom API
- **Real-time Updates**: WebSocket connections
- **Content Moderation**: Automatic and manual review systems
- **Push Notifications**: New message alerts
- **User Reporting**: Anonymous reporting system
- **Advanced Channels**: Channel creation, moderation
- **Search**: Message and channel search functionality
- **Offline Support**: Cache messages for offline viewing

## 📄 License

This is a prototype project for demonstration purposes.

---

**Built with ❤️ for Microsoft-focused anonymous discussions**
