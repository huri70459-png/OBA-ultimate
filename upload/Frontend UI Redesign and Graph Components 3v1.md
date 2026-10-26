Excellent! With the design system cemented and the development environment hardened, we are now poised to infuse "Project Brain OS" with its core functionalities. The next phase, "Core Feature Enablement and Infrastructure," will focus on integrating real-world data and real-time capabilities into our meticulously crafted UI components, laying the groundwork for a truly dynamic and intelligent application.

This phase directly addresses:
*   **Integration of a real enterprise-grade graph visualization library.**
*   **Enabling real-time communication within the chat component.**
*   **Establishing a robust state management layer.**
*   **Outlining the critical path for authentication and API integration.**

### Next Phase: Core Feature Enablement and Infrastructure

#### **1. Real-time Graph Visualization Integration**

The `GraphViewer` component currently uses a mock implementation. The next critical step is to integrate a production-ready, high-performance graph visualization library. While `ReGraph` was mentioned, alternatives like `vis.js` (with its network module), `Cytoscape.js` (for highly customizable and performant rendering), or even commercial libraries like `yFiles` (for enterprise-level features and support) are strong contenders. The choice will depend on specific performance requirements, data volume, and customization needs. For this step, we will assume `Cytoscape.js` due to its excellent balance of performance, features, and open-source nature, coupled with its React integration capabilities.

**Implementation Steps:**

1.  **Select and Integrate Graph Library:** Install `Cytoscape.js` and its React wrapper (`react-cytoscapejs`).
2.  **Data Transformation Layer:** Create a utility to transform raw backend data into the format expected by `Cytoscape.js` (nodes and edges with specific properties).
3.  **Dynamic Data Loading:** Implement data fetching using `TanStack Query` (or similar) to load graph data from a backend API. This includes caching, invalidation, and background refetching.
4.  **Interactive Features:**
    *   **Layout Algorithms:** Dynamically apply various layout algorithms (e.g., `cose`, `dagre`, `grid`) based on user selection.
    *   **Node/Edge Customization:** Map our design system's colors and typography to node and edge styles within Cytoscape.js.
    *   **Event Handling:** Implement handlers for node/edge clicks, hovers, and selections to trigger application-level actions (e.g., opening a detail panel, filtering related nodes).
    *   **Zoom & Pan Controls:** Integrate the custom zoom/pan controls from our `GraphViewer` with the Cytoscape.js API.
5.  **Performance Optimization:** Implement strategies for large graphs, such as:
    *   **Virtualization:** If the chosen library supports it for extremely large graphs.
    *   **Debouncing/Throttling:** For user interactions that trigger re-renders.
    *   **Selective Rendering:** Only render visible parts of the graph.

**Revised `GraphViewer` (Conceptual with `Cytoscape.js` Integration):**

```tsx
// components/features/graph-viewer.tsx (Conceptual update)
import React, { useRef, useEffect, useState, useCallback } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import coseBilkent from 'cytoscape-cose-bilkent'; // Example layout
import dagre from 'cytoscape-dagre'; // Example layout
// Register layouts
cytoscape.use(coseBilkent);
cytoscape.use(dagre);

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Loader2, ZoomIn, ZoomOut, LayoutIcon, GitGraph } from 'lucide-react';
import { useQuery } from '@tanstack/react-query'; // For data fetching

// Define actual data models for nodes and edges from API
interface ApiNode {
  id: string;
  name: string;
  category: string;
  metadata?: Record<string, unknown>;
}

interface ApiEdge {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: string;
}

// Transformed data for Cytoscape
interface CytoNode {
  data: { id: string; label: string; type: string; };
  position?: { x: number; y: number; }; // Optional, for fixed layouts
}

interface CytoEdge {
  data: { id: string; source: string; target: string; label: string; };
}

interface GraphViewerProps {
  graphId: string; // Identifier to fetch specific graph data
  onNodeClick?: (nodeId: string) => void;
  onEdgeClick?: (edgeId: string) => void;
}

const GraphViewer: React.FC<GraphViewerProps> = ({ graphId, onNodeClick, onEdgeClick }) => {
  const cyRef = useRef<cytoscape.Core | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number[]>([50]);
  const [currentLayout, setCurrentLayout] = useState('cose-bilkent'); // Default layout

  // Fetch graph data using TanStack Query
  const { data, isLoading, error } = useQuery<GraphData, Error>({
    queryKey: ['graphData', graphId],
    queryFn: async () => {
      // Simulate API call
      return new Promise((resolve) => setTimeout(() => {
        const apiNodes: ApiNode[] = [
          { id: '1', name: 'Idea Generation', category: 'Project' },
          { id: '2', name: 'Market Research', category: 'Task' },
          { id: '3', name: 'Competitor Analysis', category: 'Task' },
          { id: '4', name: 'Product Design', category: 'Project' },
          { id: '5', name: 'User Feedback', category: 'Data' },
        ];
        const apiEdges: ApiEdge[] = [
          { id: 'e1', sourceId: '1', targetId: '2', relationship: 'depends_on' },
          { id: 'e2', sourceId: '2', targetId: '3', relationship: 'requires' },
          { id: 'e3', sourceId: '1', targetId: '4', relationship: 'leads_to' },
          { id: 'e4', sourceId: '4', targetId: '5', relationship: 'informed_by' },
        ];

        const cytoNodes: CytoNode[] = apiNodes.map(n => ({ data: { id: n.id, label: n.name, type: n.category } }));
        const cytoEdges: CytoEdge[] = apiEdges.map(e => ({ data: { id: e.id, source: e.sourceId, target: e.targetId, label: e.relationship } }));

        resolve({ nodes: cytoNodes, edges: cytoEdges });
      }, 1500));
    },
  });

  const elements = data ? [...data.nodes, ...data.edges] : [];

  const layoutOptions = {
    name: currentLayout,
    animate: true,
    animationDuration: 500,
    // Specific options for each layout type
    'cose-bilkent': {
      nodeDimensionsIncludeLabels: true,
      quality: 'draft',
      fit: true,
      padding: 20,
      idealEdgeLength: 100,
      gravityRangeCompound: 1.0,
      gravityCompound: 1.0,
      gravityRange: 3.8,
      gravity: 1,
      nestingFactor: 0.1,
      initialEnergyOnIncremental: 0.3,
      numIter: 2500,
      tile: true,
    },
    'dagre': {
      rankDir: 'TB', // Top-to-bottom
      rankSep: 60,
      nodeSep: 20,
    },
    // ... other layouts
  };

  const styleSheet = [
    {
      selector: 'node',
      style: {
        'background-color': 'var(--color-primary-500)',
        'label': 'data(label)',
        'color': 'var(--foreground)',
        'font-size': '10px',
        'text-valign': 'center',
        'text-halign': 'center',
        'shape': 'round-rectangle',
        'width': 'label',
        'height': 'label',
        'padding': '10px',
        'text-wrap': 'wrap',
        'text-max-width': '80px',
      },
    },
    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': 'var(--color-neutral-600)',
        'target-arrow-color': 'var(--color-neutral-600)',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'label': 'data(label)',
        'font-size': '8px',
        'color': 'var(--muted-foreground)',
        'text-background-opacity': 1,
        'text-background-color': 'var(--background)',
        'text-background-padding': '3px',
      },
    },
    {
      selector: 'node[type="Project"]',
      style: { 'background-color': 'var(--color-primary-600)', 'shape': 'hexagon' },
    },
    {
      selector: 'node[type="Task"]',
      style: { 'background-color': 'var(--color-accent-info)', 'shape': 'ellipse' },
    },
    {
      selector: 'node[type="Data"]',
      style: { 'background-color': 'var(--color-accent-warning)', 'shape': 'diamond' },
    },
    {
      selector: 'node:selected',
      style: {
        'border-width': 3,
        'border-color': 'var(--ring)',
        'border-opacity': 0.8,
      },
    },
    {
      selector: 'edge:selected',
      style: {
        'line-color': 'var(--color-accent-success)',
        'target-arrow-color': 'var(--color-accent-success)',
      },
    },
  ];

  const handleCy = useCallback((cy: cytoscape.Core) => {
    cyRef.current = cy;
    cy.on('tap', 'node', (evt) => onNodeClick?.(evt.target.id()));
    cy.on('tap', 'edge', (evt) => onEdgeClick?.(evt.target.id()));
    // Initial fit
    cy.fit(cy.elements(), 20);
  }, [onNodeClick, onEdgeClick]);

  useEffect(() => {
    if (cyRef.current && data) {
      cyRef.current.layout(layoutOptions).run();
      cyRef.current.fit(cyRef.current.elements(), 20); // Refit after layout
    }
  }, [data, currentLayout]); // Re-run layout when data or layout changes

  const handleZoomChange = useCallback((value: number[]) => {
    setZoomLevel(value);
    if (cyRef.current) {
      const currentZoom = cyRef.current.zoom();
      // Map slider value (0-100) to a reasonable zoom range (e.g., 0.1 to 3)
      const newZoom = 0.1 + (value[0] / 100) * 2.9; // Adjust range as needed
      cyRef.current.zoom({ level: newZoom, renderedPosition: { x: cyRef.current.width() / 2, y: cyRef.current.height() / 2 } });
    }
  }, []);

  const zoomIn = () => { if (cyRef.current) cyRef.current.zoom(cyRef.current.zoom() * 1.2); };
  const zoomOut = () => { if (cyRef.current) cyRef.current.zoom(cyRef.current.zoom() * 0.8); };

  if (error) return <Card className="h-full flex items-center justify-center"><p className="text-destructive">Error loading graph: {error.message}</p></Card>;

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
          <Button variant="outline" size="sm" onClick={zoomOut}><ZoomOut className="h-4 w-4" /></Button>
          <Slider
            value={zoomLevel}
            onValueChange={handleZoomChange}
            max={100}
            step={1}
            className="w-[100px]"
          />
          <Button variant="outline" size="sm" onClick={zoomIn}><ZoomIn className="h-4 w-4" /></Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <LayoutIcon className="h-4 w-4 mr-2" /> {currentLayout.replace('-', ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setCurrentLayout('cose-bilkent')}>Force-Directed (Cose Bilkent)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrentLayout('dagre')}>Hierarchical (Dagre)</DropdownMenuItem>
              {/* Add more layout options */}
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
        <CytoscapeComponent
          elements={elements}
          stylesheet={styleSheet}
          cy={handleCy}
          layout={layoutOptions}
          className="w-full h-full"
          wheelSensitivity={0.5} // Adjust scroll wheel zoom sensitivity
          boxSelectionEnabled={false} // Disable box selection for cleaner interaction
          autounselectify={true} // Unselect elements when clicking empty space
        />
      </CardContent>
    </Card>
  );
};

export default GraphViewer;
```

#### **2. Real-time Chat Integration**

The `ChatWidget` requires a real-time communication backbone. This involves setting up a WebSocket client to connect to a backend chat service.

**Implementation Steps:**

1.  **WebSocket Client Integration:** Install and configure a WebSocket client library (e.g., `socket.io-client`).
2.  **Backend Service Integration:** Establish connection to a backend WebSocket server. This server will handle message persistence, user authentication, and broadcasting messages to relevant clients.
3.  **Event Handling:**
    *   **`onConnect` / `onDisconnect`:** Manage connection status and UI feedback.
    *   **`onMessage`:** Listen for incoming messages and update the UI state.
    *   **`onTyping` / `onPresence`:** Implement real-time typing indicators and user online/offline status.
4.  **Message Persistence & History:** Implement fetching of chat history from a REST API or initial WebSocket payload.
5.  **Contextual Linking:** Develop logic to parse message content for `contextRef` patterns and render them as interactive links.

**Revised `ChatWidget` (Conceptual with `socket.io-client` Integration):**

```tsx
// components/features/chat-widget.tsx (Conceptual update)
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquare, SendIcon, Paperclip, Smile, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import io, { Socket } from 'socket.io-client'; // Import socket.io-client
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // For history and sending

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
  currentUserId: string; // Passed from auth context
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ channelId, currentUserId }) => {
  const queryClient = useQueryClient();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [newMessageContent, setNewMessageContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch chat history
  const { data: messages, isLoading: isLoadingHistory, error: historyError } = useQuery<Message[], Error>({
    queryKey: ['chatHistory', channelId],
    queryFn: async () => {
      // Simulate API call to fetch message history
      return new Promise((resolve) => setTimeout(() => {
        resolve([
          { id: '1', sender: { id: 'bot', name: 'Brain OS Assistant', avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=BrainOS' }, content: 'Welcome to the Brain OS chat! How can I assist you?', timestamp: new Date(Date.now() - 3600000).toISOString() },
          { id: '2', sender: { id: 'user-123', name: 'Alice', avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=Alice' }, content: 'Hi, I need help with the new graph feature.', timestamp: new Date(Date.now() - 1800000).toISOString() },
        ]);
      }, 1000));
    },
    initialData: [], // Provide initial empty array to avoid undefined
  });

  // Mutation for sending messages
  const sendMessageMutation = useMutation<Message, Error, { content: string }>({
    mutationFn: async ({ content }) => {
      // Optimistically update the UI
      const optimisticMessage: Message = {
        id: `temp-${Date.now()}`,
        sender: { id: currentUserId, name: 'You', avatarUrl: 'https://github.com/shadcn.png' },
        content,
        timestamp: new Date().toISOString(),
      };
      queryClient.setQueryData(['chatHistory', channelId], (old: Message[] | undefined) => [...(old || []), optimisticMessage]);

      // Simulate API call to send message
      return new Promise((resolve) => setTimeout(() => {
        console.log('Sending message to backend:', content);
        // In a real app, socket.emit('sendMessage', { channelId, content, currentUserId })
        // The backend would then broadcast the confirmed message.
        resolve({ ...optimisticMessage, id: `real-${Date.now()}` }); // Replace temp ID with real one
      }, 500));
    },
    onSuccess: (newMessage) => {
      // On success, the backend would typically broadcast the new message,
      // which our socket listener would pick up. For optimistic updates,
      // we might need to reconcile here if the backend returns the same message.
      // queryClient.invalidateQueries(['chatHistory', channelId]); // Or update specific message if ID changed
    },
    onError: (error) => {
      console.error("Failed to send message:", error);
      // Revert optimistic update or show error to user
      queryClient.setQueryData(['chatHistory', channelId], (old: Message[] | undefined) => (old || []).filter(msg => !msg.id.startsWith('temp-')));
    }
  });

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:3001', {
      query: { channelId, userId: currentUserId }, // Pass context to server
      transports: ['websocket'],
    });

    newSocket.on('connect', () => console.log('Socket connected!'));
    newSocket.on('disconnect', () => console.log('Socket disconnected!'));
    newSocket.on('message', (msg: Message) => {
      // Add new message to cache
      queryClient.setQueryData(['chatHistory', channelId], (old: Message[] | undefined) => {
        // Prevent duplicates if optimistic update already added it
        if (old?.some(m => m.id === msg.id)) return old;
        return [...(old || []), msg];
      });
    });
    newSocket.on('typing', (data: { userId: string, isTyping: boolean }) => {
      if (data.userId !== currentUserId) {
        setIsTyping(data.isTyping);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [channelId, currentUserId, queryClient]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = useCallback(() => {
    if (newMessageContent.trim()) {
      sendMessageMutation.mutate({ content: newMessageContent });
      setNewMessageContent('');
      if (socket) {
        socket.emit('typing', { channelId, userId: currentUserId, isTyping: false }); // Stop typing indicator
      }
    }
  }, [newMessageContent, sendMessageMutation, socket, currentUserId]);

  const handleTyping = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMessageContent(e.target.value);
    if (socket) {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      socket.emit('typing', { channelId, userId: currentUserId, isTyping: true });
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('typing', { channelId, userId: currentUserId, isTyping: false });
      }, 3000); // Stop typing after 3 seconds of inactivity
    }
  }, [channelId, currentUserId, socket]);

  if (historyError) return <Card className="h-full flex items-center justify-center"><p className="text-destructive">Error loading chat: {historyError.message}</p></Card>;

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
          {isLoadingHistory && (
            <div className="flex justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          )}
          {messages?.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-end gap-3 mb-4",
                msg.sender.id === currentUserId ? "justify-end" : "justify-start"
              )}
            >
              {msg.sender.id !== currentUserId && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.sender.avatarUrl} alt={msg.sender.name} />
                  <AvatarFallback className="bg-muted text-muted-foreground text-sm">{msg.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "flex flex-col p-3 rounded-lg max-w-[70%]",
                  msg.sender.id === currentUserId
                    ? "bg-primary text-primary-foreground rounded-br-none"
                    : "bg-muted text-muted-foreground rounded-bl-none"
                )}
              >
                {msg.sender.id !== currentUserId && (
                  <span className="font-semibold text-xs mb-1">{msg.sender.name}</span>
                )}
                <p className="text-sm break-words">{msg.content}</p>
                {msg.contextRef && (
                  <a href={`/${msg.contextRef.type}/${msg.contextRef.id}`} className="text-xs text-primary-200 hover:underline mt-1">
                    View {msg.contextRef.label}
                  </a>
                )}
                <span className={cn("text-[0.65rem] mt-1", msg.sender.id === currentUserId ? "text-primary-foreground/70" : "text-muted-foreground/70")}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              {msg.sender.id === currentUserId && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.sender.avatarUrl} alt={msg.sender.name} />
                  <AvatarFallback className="bg-primary-600 text-primary-foreground text-sm">{msg.sender.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-2 text-muted-foreground text-sm animate-pulse">
              <Loader2 className="h-4 w-4 animate-spin" /> Someone is typing...
            </div>
          )}
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
            onChange={handleTyping}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-input text-foreground border-border focus-visible:ring-primary"
            disabled={sendMessageMutation.isPending}
          />
          <Button
            onClick={handleSendMessage}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            disabled={sendMessageMutation.isPending || !newMessageContent.trim()}
          >
            {sendMessageMutation.isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendIcon className="h-5 w-5" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatWidget;
```

#### **3. Centralized State Management with Zustand and TanStack Query**

As demonstrated in the updated `GraphViewer` and `ChatWidget`, `TanStack Query` is ideal for managing server-side state (data fetching, caching, synchronization, mutations). For client-side state (e.g., UI preferences, temporary form data, authentication status), we will fully implement `Zustand`.

**Implementation Steps:**

1.  **Zustand Store Creation:** Define global stores for different domains (e.g., `authStore`, `uiStore`).
2.  **Authentication State:** Store user authentication status, user profile, and tokens in `authStore`.
3.  **UI Preferences:** Manage theme settings, layout configurations, and other user-specific UI preferences in `uiStore`.
4.  **Integration:** Connect components to these stores using Zustand's hooks.

**Example `authStore.ts`:**

```typescript
// stores/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  roles: string[];
}

interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: UserProfile, token: string) => void;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: (user, token) => set({ user, token, isAuthenticated: true }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
      setToken: (token) => set({ token }),
    }),
    {
      name: 'brain-os-auth-storage', // unique name
      storage: createJSONStorage(() => localStorage), // Use localStorage
    }
  )
);
```

#### **4. Authentication and Authorization Strategy**

Enterprise applications demand robust security.

**Implementation