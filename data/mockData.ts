export interface Message {
  id: string;
  content: string;
  timestamp: string;
  createdAt: Date; // Add actual date for proper sorting
  likes: number;
  replies: number;
  channel: string;
  isLiked?: boolean;
}

export interface Channel {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  icon: string;
}

export const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Anyone else excited about the Microsoft Build conference next week? Really hoping to see some cool Azure updates! 🚀',
    timestamp: '5m ago',
    createdAt: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    likes: 24,
    replies: 8,
    channel: 'microsoft-general',
    isLiked: false,
  },
  {
    id: '2',
    content: 'Hot take: Teams is actually getting really good. The new meeting features are a game changer for remote work.',
    timestamp: '12m ago',
    createdAt: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
    likes: 67,
    replies: 23,
    channel: 'teams-discussion',
    isLiked: true,
  },
  {
    id: '3',
    content: 'Just shipped my first app using .NET MAUI and I\'m honestly impressed. Cross-platform development has never been smoother.',
    timestamp: '18m ago',
    createdAt: new Date(Date.now() - 18 * 60 * 1000), // 18 minutes ago
    likes: 45,
    replies: 12,
    channel: 'dotnet-dev',
    isLiked: false,
  },
  {
    id: '4',
    content: 'PSA: Don\'t forget to update your Windows machines tonight. Patch Tuesday is here again! 💻',
    timestamp: '25m ago',
    createdAt: new Date(Date.now() - 25 * 60 * 1000), // 25 minutes ago
    likes: 89,
    replies: 34,
    channel: 'windows-updates',
    isLiked: false,
  },
  {
    id: '5',
    content: 'Working on a Power Platform solution and I can\'t believe how much you can accomplish without writing a single line of code. Microsoft really nailed this one.',
    timestamp: '32m ago',
    createdAt: new Date(Date.now() - 32 * 60 * 1000), // 32 minutes ago
    likes: 156,
    replies: 67,
    channel: 'power-platform',
    isLiked: true,
  },
  {
    id: '6',
    content: 'Azure DevOps vs GitHub - which one do you prefer for enterprise projects? Looking for some honest opinions here.',
    timestamp: '45m ago',
    createdAt: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
    likes: 78,
    replies: 45,
    channel: 'devops-chat',
    isLiked: false,
  },
  {
    id: '7',
    content: 'Microsoft Copilot in VS Code has literally changed my life. I feel like I have a coding buddy who never gets tired of helping. 🤖',
    timestamp: '1h ago',
    createdAt: new Date(Date.now() - 60 * 60 * 1000), // 1 hour ago
    likes: 234,
    replies: 89,
    channel: 'copilot-users',
    isLiked: true,
  },
  {
    id: '8',
    content: 'Office 365 is down again... Anyone else experiencing issues with Outlook today? This is getting frustrating.',
    timestamp: '1h ago',
    createdAt: new Date(Date.now() - 65 * 60 * 1000), // 1 hour 5 minutes ago
    likes: 23,
    replies: 56,
    channel: 'office-support',
    isLiked: false,
  },
];

export const mockChannels: Channel[] = [
  {
    id: 'microsoft-general',
    name: 'Microsoft General',
    description: 'General discussion about Microsoft products and services',
    memberCount: 15420,
    icon: 'building.2.fill',
  },
  {
    id: 'teams-discussion',
    name: 'Teams Discussion',
    description: 'Everything Microsoft Teams related',
    memberCount: 8934,
    icon: 'video.fill',
  },
  {
    id: 'dotnet-dev',
    name: '.NET Development',
    description: 'C#, .NET Framework, .NET Core, and more',
    memberCount: 12567,
    icon: 'hammer.fill',
  },
  {
    id: 'windows-updates',
    name: 'Windows Updates',
    description: 'Windows updates, patches, and security news',
    memberCount: 6789,
    icon: 'arrow.clockwise.circle.fill',
  },
  {
    id: 'power-platform',
    name: 'Power Platform',
    description: 'Power Apps, Power Automate, Power BI discussions',
    memberCount: 4521,
    icon: 'bolt.fill',
  },
  {
    id: 'devops-chat',
    name: 'DevOps Chat',
    description: 'Azure DevOps, CI/CD, and deployment discussions',
    memberCount: 9876,
    icon: 'gearshape.fill',
  },
  {
    id: 'copilot-users',
    name: 'Copilot Users',
    description: 'Microsoft Copilot tips, tricks, and experiences',
    memberCount: 18345,
    icon: 'brain.head.profile',
  },
  {
    id: 'office-support',
    name: 'Office Support',
    description: 'Help and support for Office 365 and Office apps',
    memberCount: 7234,
    icon: 'questionmark.circle.fill',
  },
];
