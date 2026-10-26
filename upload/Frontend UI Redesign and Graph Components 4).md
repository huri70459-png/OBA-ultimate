Having established a robust design system and tightened our development environment, we now move into the exciting phase of constructing the core UI components for "Project Brain OS." Our strategy involves leveraging the `shadcn/ui` library as a foundational layer, customizing its components with our "Deep Intelligence" theme, and building bespoke elements where necessary, particularly for the advanced Graph and Chat functionalities. This approach ensures rapid development while maintaining enterprise-grade quality and visual consistency.

### Phase 2 & 3: Core and Advanced Component Implementation

Our primary goal here is to translate the design tokens defined in **globals.css** and **tailwind.config.ts** into functional, visually cohesive React components. We will demonstrate this by implementing a custom `Card` component, and then providing more concrete implementations for the `GraphViewer` and `ChatWidget`, focusing on their structural integration within our design system.

#### **1. Customizing `shadcn/ui` Components: The Card Example**

`shadcn/ui` provides a set of unstyled, accessible components that are designed to be styled with Tailwind CSS. We will extend these components by adding our specific color variables, border radii, and typographic styles.

First, ensure `shadcn/ui` components are properly configured using `components.json` and integrated into your project. The `components.json` typically points to where your components are generated.

**`components.json` (Example, assuming default setup):**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "slate",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

Now, let's create a custom `Card` component that adheres to our "Deep Intelligence" theme. This component will serve as a primary container for information within our "Bento Grid" layouts.

**`components/ui/card.tsx` (Customized `shadcn/ui` Card):**

```tsx
import * as React from "react";
import { cn } from "@/lib/utils"; // shadcn/ui utility for class merging

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: "default" | "primary" | "secondary";
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, header, footer, variant = "default", ...props }, ref) => {
    const variantClasses = React.useMemo(() => {
      switch (variant) {
        case "primary":
          return "bg-primary text-primary-foreground border-primary";
        case "secondary":
          return "bg-secondary text-secondary-foreground border-secondary";
        case "default":
        default:
          return "bg-card text-card-foreground border-border";
      }
    }, [variant]);

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border shadow-sm",
          variantClasses,
          className,
          "p-4 transition-all duration-300 ease-in-out hover:shadow-md" // Added hover effect
        )}
        {...props}
      >
        {header && <div className="pb-4 border-b border-border mb-4">{header}</div>}
        {children}
        {footer && <div className="pt-4 border-t border-border mt-4">{footer}</div>}
      </div>
    );
  }
);
Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode;
}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight text-heading", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-0 pt-0", className)} {...props} />
  )
);
CardContent.displayName = "CardContent";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-0 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
```

This custom `Card` component now dynamically applies our theme colors (`bg-card`, `text-card-foreground`, `border-border`) and uses our defined font styles (`text-heading` for `CardTitle`). The `variant` prop allows for semantic styling based on our color palette.

#### **2. Refined Graph Viewer Component**

The `GraphViewer` component will act as a sophisticated wrapper around an enterprise-grade graph visualization library. While the full implementation of a library like `ReGraph` is beyond the scope of a single file, we can define the component structure and its integration with our design system.

**`components/features/graph-viewer.tsx`:**

```tsx
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider'; // Assuming shadcn/ui slider for zoom control
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Loader2, ZoomIn, ZoomOut, LayoutIcon, GitGraph } from 'lucide-react'; // Example icons

// Placeholder for the actual ReGraph library types and functionality
// In a real scenario, these would come from the ReGraph package.
interface Node {
  id: string;
  label: string;
  type?: string;
  properties?: Record<string, unknown>;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  label?: string;
  properties?: Record<string, unknown>;
}

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

interface GraphLibraryInstance {
  init: (container: HTMLElement, options: any) => void;
  setData: (data: GraphData) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  applyLayout: (layoutType: string) => void;
  on: (event: string, handler: (payload: any) => void) => void;
  destroy: () => void;
  // ... other methods
}

// Mock ReGraph instance for demonstration
class MockReGraphInstance implements GraphLibraryInstance {
  constructor(private container: HTMLElement, private options: any) {
    console.log('MockReGraph: Initialized in', container, 'with options', options);
    this.renderMockGraph();
  }
  init = (container: HTMLElement, options: any) => { /* ... */ };
  setData = (data: GraphData) => { console.log('MockReGraph: Setting data', data); this.renderMockGraph(); };
  zoomIn = () => console.log('MockReGraph: Zoom In');
  zoomOut = () => console.log('MockReGraph: Zoom Out');
  applyLayout = (layoutType: string) => console.log('MockReGraph: Applying layout', layoutType);
  on = (event: string, handler: (payload: any) => void) => { console.log(`MockReGraph: Event listener for ${event} added.`); };
  destroy = () => console.log('MockReGraph: Destroyed');

  private renderMockGraph() {
    this.container.innerHTML = `
      <div class="flex items-center justify-center h-full text-muted-foreground text-xl font-mono">
        <span class="animate-pulse mr-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-git-graph"><path d="M18 16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2"/><circle cx="18" cy="16" r="3"/><circle cx="6" cy="8" r="3"/><path d="M6 11v5a2 2 0 0 0 2 2h8"/><path d="M11 15h1"/></svg></span>
        Rendering Brain OS Graph...
      </div>
    `;
  }
}

interface GraphViewerProps {
  data: GraphData;
  isLoading?: boolean;
  onNodeClick?: (nodeId: string) => void;
  onEdgeClick?: (edgeId: string) => void;
  // ... other customization props for ReGraph
}

const GraphViewer: React.FC<GraphViewerProps> = ({
  data,
  isLoading = false,
  onNodeClick,
  onEdgeClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const graphInstanceRef = useRef<GraphLibraryInstance | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number[]>([50]); // 0-100 scale for slider
  const [currentLayout, setCurrentLayout] = useState('Force-Directed');

  useEffect(() => {
    if (containerRef.current && !graphInstanceRef.current) {
      // Initialize the graph library (e.g., ReGraph)
      graphInstanceRef.current = new MockReGraphInstance(containerRef.current, {
        // ReGraph specific options, tailored to our theme
        nodeColor: 'var(--color-primary-500)',
        edgeColor: 'var(--color-neutral-600)',
        backgroundColor: 'var(--card)',
        // ... more visual and behavioral options
      });

      // Attach event listeners
      graphInstanceRef.current.on('nodeClick', (payload) => onNodeClick?.(payload.nodeId));
      graphInstanceRef.current.on('edgeClick', (payload) => onEdgeClick?.(payload.edgeId));
    }

    // Update graph data when prop changes
    if (graphInstanceRef.current) {
      graphInstanceRef.current.setData(data);
    }

    // Cleanup
    return () => {
      if (graphInstanceRef.current) {
        graphInstanceRef.current.destroy();
        graphInstanceRef.current = null;
      }
    };
  }, [data, onNodeClick, onEdgeClick]);

  const handleZoomChange = useCallback((value: number[]) => {
    setZoomLevel(value);
    // In a real ReGraph instance, you'd map this slider value to actual zoom calls
    // e.g., graphInstanceRef.current?.setZoom(value[0] / 100 * (maxZoom - minZoom) + minZoom);
    if (value[0] > zoomLevel[0]) {
      graphInstanceRef.current?.zoomIn();
    } else if (value[0] < zoomLevel[0]) {
      graphInstanceRef.current?.zoomOut();
    }
  }, [zoomLevel]);

  const handleLayoutChange = useCallback((layoutType: string) => {
    setCurrentLayout(layoutType);
    graphInstanceRef.current?.applyLayout(layoutType);
  }, []);

  // Visual Description of the Graph
  // The graph will be rendered within a dark, border-rounded Card.
  // Nodes: Represented by circles or custom shapes, colored with `--color-primary-500` for active states and `--color-neutral-500` for default.
  //        Node labels will use `text-sm text-foreground`.
  // Edges: Thin lines in `--color-neutral-600`, with `--color-accent` for highlighted paths.
  // Interactivity: Hovering over nodes/edges will reveal tooltips with detailed information (using shadcn/ui Tooltip).
  // Controls: A set of elegant buttons and a slider for zoom, and a dropdown for layout selection, all styled with our theme.
  //           These controls will be positioned unobtrusively, likely in a top-right or bottom-left corner overlay.
  // Loading State: A `Loader2` icon with an `animate-spin` effect will appear centrally when `isLoading` is true.

  return (
    <Card className="h-full flex flex-col relative overflow-hidden">
      <CardHeader className="flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="flex items-center gap-2">
            <GitGraph className="h-6 w-6 text-primary" /> Brain OS Graph
          </CardTitle>
          <CardDescription>Visualize connections and relationships.</CardDescription>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => graphInstanceRef.current?.zoomOut()}><ZoomOut className="h-4 w-4" /></Button>
          <Slider
            value={zoomLevel}
            onValueChange={handleZoomChange}
            max={100}
            step={1}
            className="w-[100px]"
          />
          <Button variant="outline" size="sm" onClick={() => graphInstanceRef.current?.zoomIn()}><ZoomIn className="h-4 w-4" /></Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <LayoutIcon className="h-4 w-4 mr-2" /> {currentLayout}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleLayoutChange('Force-Directed')}>Force-Directed</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLayoutChange('Hierarchical')}>Hierarchical</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLayoutChange('Concentric')}>Concentric</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-card/80 z-10 backdrop-blur-sm">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}
        <div ref={containerRef} className="w-full h-full" />
      </CardContent>
    </Card>
  );
};

export default GraphViewer;
```

This `GraphViewer` component integrates `shadcn/ui` components for its controls (Buttons, Slider, DropdownMenu) and uses our `Card` for its container. The visual description within the code comments details how the actual graph elements would be styled using the design tokens. The `MockReGraphInstance` is a placeholder, demonstrating how a real graph library would be initialized and interact with the component.

#### **3. Refined Chat Widget Component**

The `ChatWidget` component will provide a rich, interactive communication experience, leveraging our design system for its visual appeal and `shadcn/ui` for its core interactive elements.

**`components/features/chat-widget.tsx`:**

```tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, SendIcon, Paperclip, Smile } from 'lucide-react'; // Icons

// Placeholder types for messages
interface Sender {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface Message {
  id: string;
  sender: Sender;
  content: string; // Markdown supported
  timestamp: string; // ISO string
  threadId?: string;
  contextRef?: { type: string; id: string; label: string };
}

interface ChatWidgetProps {
  channelId: string;
  initialMessages?: Message[];
  onSendMessage: (message: string, threadId?: string, context?: any) => void;
  isLoading?: boolean;
  // socket: Socket; // Injected socket client for real-time updates
}

const ChatWidget: React.FC<ChatWidgetProps> = ({
  channelId,
  initialMessages = [],
  onSendMessage,
  isLoading = false,
  // socket,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessageContent, setNewMessageContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mock message adding for demonstration
  const addMockMessage = useCallback((content: string) => {
    const sender: Sender = { id: 'user-self', name: 'You', avatarUrl: 'https://github.com/shadcn.png' };
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender,
      content,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, newMsg]);
  }, []);

  useEffect(() => {
    // Simulate real-time message reception
    // In a real app, this would be `socket.on('message', (msg) => setMessages((prev) => [...prev, msg]))`
    const timer = setTimeout(() => {
      if (messages.length === initialMessages.length && !isLoading && initialMessages.length === 0) {
        setMessages([
          { id: '1', sender: { id: 'bot', name: 'Brain OS Assistant', avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=BrainOS' }, content: 'Welcome to the Brain OS chat! How can I assist you?', timestamp: new Date().toISOString() },
        ]);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [messages.length, initialMessages.length, isLoading]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (newMessageContent.trim()) {
      addMockMessage(newMessageContent); // Add to local state immediately
      onSendMessage(newMessageContent); // Send to backend
      setNewMessageContent('');
    }
  }, [newMessageContent, onSendMessage, addMockMessage]);

  // Visual Description of the Chat
  // The chat will be contained within a dark, border-rounded Card.
  // Header: Features a title and description, potentially with channel details.
  // Message Area: A `ScrollArea` with `bg-background` for the chat history.
  //   Message Bubbles: Distinct styling for sender and receiver.
  //     Sender (You): `bg-primary` with `text-primary-foreground`, `rounded-br-none`.
  //     Others: `bg-muted` with `text-muted-foreground`, `rounded-bl-none`.
  //   Avatars: `shadcn/ui` Avatar component, using our neutral colors for fallbacks.
  //   Timestamps: Subtle `text-xs text-neutral-500`.
  // Input Area: `bg-card` with `border-t border-border`.
  //   Input Field: `shadcn/ui` Input, `bg-input text-foreground`.
  //   Action Buttons: `shadcn/ui` Buttons for send, attachments, emoji, styled with our theme.

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-6 w-6 text-primary" /> Channel: {channelId}
        </CardTitle>
        <CardDescription>Real-time collaboration and discussions.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4 bg-background">
          {isLoading && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-3 mb-4",
                msg.sender.id === 'user-self' ? "justify-end" : "justify-start"
              )}
            >
              {msg.sender.id !== 'user-self' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.sender.avatarUrl} alt={msg.sender.name} />
                  <AvatarFallback className="bg-muted text-muted-foreground text-sm">{msg.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "flex flex-col p-3 rounded-lg max-w-[70%]",
                  msg.sender.id === 'user-self'
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-muted-foreground rounded-bl-none"
                )}
              >
                {msg.sender.id !== 'user-self' && (
                  <span className="font-semibold text-xs mb-1">{msg.sender.name}</span>
                )}
                <p className="text-sm break-words">{msg.content}</p>
                {msg.contextRef && (
                  <a href={`/${msg.contextRef.type}/${msg.contextRef.id}`} className="text-xs text-primary-200 hover:underline mt-1">
                    View {msg.contextRef.label}
                  </a>
                )}
                <span className={cn("text-[0.65rem] mt-1", msg.sender.id === 'user-self' ? "text-primary-foreground/70" : "text-muted-foreground/70")}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {msg.sender.id === 'user-self' && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.sender.avatarUrl} alt={msg.sender.name} />
                  <AvatarFallback className="bg-primary-600 text-primary-foreground text-sm">{msg.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </ScrollArea>
        <div className="border-t border-border p-4 flex items-center gap-2 bg-card">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            placeholder="Type your message..."
            value={newMessageContent}
            onChange={(e) => setNewMessageContent(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-input text-foreground border-border focus-visible:ring-primary"
          />
          <Button onClick={handleSendMessage} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <SendIcon className="h-5 w-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWidget;
```

The `ChatWidget` dynamically styles messages based on the sender, utilizing our primary and muted colors. It incorporates `shadcn/ui` components like `Input`, `Button`, `ScrollArea`, and `Avatar` for a cohesive and functional user experience.

#### **4. Integrating into the Main Page (`page.tsx`) with a Bento Grid Layout**

Now, let's update **page.tsx** to demonstrate how these components come together in a "Bento Grid" inspired layout, leveraging Tailwind CSS for grid styling.

**`app/page.tsx`:**

```tsx
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Brain, Settings, Users, Lightbulb } from 'lucide-react';
import GraphViewer from '@/components/features/graph-viewer';
import ChatWidget from '@/components/features/chat-widget';

export default function Home(): JSX.Element {
  // Mock data for GraphViewer
  const mockGraphData = {
    nodes: [
      { id: '1', label: 'Idea Generation', type: 'project' },
      { id: '2', label: 'Market Research', type: 'task' },
      { id: '3', label: 'Competitor Analysis', type: 'task' },
      { id: '4', label: 'Product Design', type: 'project' },
      { id: '5', label: 'User Feedback', type: 'data' },
    ],
    edges: [
      { id: 'e1', source: '1', target: '2', label: 'depends_on' },
      { id: 'e2', source: '2', target: '3', label: 'requires' },
      { id: 'e3', source: '1', target: '4', label: 'leads_to' },
      { id: 'e4', source: '4', target: '5', label: 'informed_by' },
    ],
  };

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // In a real application, this would dispatch to a state manager or an API call
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8 grid grid-cols-12 gap-6">
      {/* Header / Welcome Card */}
      <Card className="col-span-12 lg:col-span-8 flex flex-col justify-between p-6">
        <CardHeader className="border-none p-0 pb-4">
          <CardTitle className="text-4xl flex items-center gap-3">
            <Brain className="h-10 w-10 text-primary" /> Welcome to Brain OS
          </CardTitle>
          <CardDescription className="text-lg">
            Your intelligent workspace for knowledge, projects, and insights.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow p-0">
          <p className="text-muted-foreground mb-4">
            Dive into your projects, connect ideas, and collaborate seamlessly. Brain OS helps you transform complex information into actionable intelligence.
          </p>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Get Started <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Quick Actions Card */}
      <Card className="col-span-12 lg:col-span-4 flex flex-col justify-between p-6">
        <CardHeader className="border-none p-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-accent" /> Quick Actions
          </CardTitle>
          <CardDescription>Jump right into your workflow.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 space-y-3">
          <Button variant="outline" className="w-full justify-start text-left">
            <Users className="mr-3 h-5 w-5 text-secondary" /> View Team Projects
          </Button>
          <Button variant="outline" className="w-full justify-start text-left">
            <Settings className="mr-3 h-5 w-5 text-muted-foreground" /> Configure Integrations
          </Button>
          <Button variant="outline" className="w-full justify-start text-left">
            <ArrowRight className="mr-3 h-5 w-5 text-primary" /> Explore New Features
          </Button>
        </CardContent>
      </Card>

      {/* Graph Viewer Card (Takes up more space) */}
      <div className="col-span-12 lg:col-span-8 h-[600px]"> {/* Fixed height for demo */}
        <GraphViewer data={mockGraphData} isLoading={false} />
      </div>

      {/* Chat Widget Card */}
      <div className="col-span-12 lg:col-span-4 h-[600px]"> {/* Fixed height for demo */}
        <ChatWidget channelId="General Discussions" onSendMessage={handleSendMessage} />
      </div>

      {/* Additional Content Card */}
      <Card className="col-span-12">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Keep track of what's happening across your workspace.</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="text-muted-foreground">User X updated 'Project Alpha' - <span className="text-sm text-neutral-400">5 mins ago</span></li>
            <li className="text-muted-foreground">New node 'Deep Learning Model' added to 'Brain Graph' - <span className="text-sm text-neutral-400">1 hour ago</span></li>
            <li className="text-muted-foreground">Team Discussion on 'Q4 Strategy' started in #General - <span className="text-sm text-neutral-400">3 hours ago</span></li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
```

This `page.tsx` now dynamically lays out the `Card`, `GraphViewer`, and `ChatWidget` components using a responsive grid system provided by Tailwind CSS. The `h-[600px]` is used for demonstration purposes to give the graph and chat components a visible height. In a