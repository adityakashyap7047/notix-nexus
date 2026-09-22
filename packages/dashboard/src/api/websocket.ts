import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket, RawData } from 'ws';
import jwt from 'jsonwebtoken';

interface WSClient {
  ws: WebSocket;
  userId: string | null;
  guildIds: string[];
  lastPing: number;
}

interface WSEvent {
  type: 'member_join' | 'member_leave' | 'message' | 'moderation' | 'security' | 'ticket' | 'system';
  guildId: string;
  data: Record<string, any>;
  timestamp: string;
}

const clients: Map<string, WSClient> = new Map();
let wss: WebSocketServer | null = null;

function generateClientId(): string {
  return `ws_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function authenticateToken(token: string): string | null {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'jwt-fallback-secret'
    ) as { id: string };
    return decoded.id;
  } catch {
    return null;
  }
}

function broadcast(event: WSEvent, guildFilter?: string): void {
  if (!wss) return;

  const message = JSON.stringify({
    event,
    serverTimestamp: new Date().toISOString(),
  });

  clients.forEach((client) => {
    if (client.ws.readyState !== WebSocket.OPEN) return;

    if (guildFilter && client.guildIds.length > 0 && !client.guildIds.includes(guildFilter)) {
      return;
    }

    try {
      client.ws.send(message);
    } catch (error) {
      console.error('[WS] Broadcast error:', error);
    }
  });
}

function handleMessage(clientId: string, raw: RawData): void {
  const client = clients.get(clientId);
  if (!client) return;

  try {
    const message = JSON.parse(raw.toString());

    switch (message.type) {
      case 'auth': {
        const userId = authenticateToken(message.token);
        if (userId) {
          client.userId = userId;
          client.ws.send(
            JSON.stringify({
              type: 'auth_success',
              userId,
              timestamp: new Date().toISOString(),
            })
          );
        } else {
          client.ws.send(
            JSON.stringify({
              type: 'auth_failed',
              error: 'Invalid token',
              timestamp: new Date().toISOString(),
            })
          );
        }
        break;
      }

      case 'subscribe': {
        if (message.guildIds && Array.isArray(message.guildIds)) {
          client.guildIds = message.guildIds.slice(0, 25);
        }
        client.ws.send(
          JSON.stringify({
            type: 'subscribed',
            guildIds: client.guildIds,
            timestamp: new Date().toISOString(),
          })
        );
        break;
      }

      case 'ping': {
        client.lastPing = Date.now();
        client.ws.send(
          JSON.stringify({
            type: 'pong',
            timestamp: new Date().toISOString(),
          })
        );
        break;
      }

      default:
        client.ws.send(
          JSON.stringify({
            type: 'error',
            error: `Unknown message type: ${message.type}`,
            timestamp: new Date().toISOString(),
          })
        );
    }
  } catch (error) {
    client.ws.send(
      JSON.stringify({
        type: 'error',
        error: 'Invalid message format',
        timestamp: new Date().toISOString(),
      })
    );
  }
}

export function setupWebSocket(server: HttpServer): void {
  wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws: WebSocket) => {
    const clientId = generateClientId();

    const client: WSClient = {
      ws,
      userId: null,
      guildIds: [],
      lastPing: Date.now(),
    };

    clients.set(clientId, client);

    ws.send(
      JSON.stringify({
        type: 'connected',
        clientId,
        timestamp: new Date().toISOString(),
      })
    );

    ws.on('message', (raw: RawData) => {
      handleMessage(clientId, raw);
    });

    ws.on('close', () => {
      clients.delete(clientId);
    });

    ws.on('error', (error: Error) => {
      console.error(`[WS] Client ${clientId} error:`, error.message);
      clients.delete(clientId);
    });

    console.log(`[WS] Client connected: ${clientId} (total: ${clients.size})`);
  });

  setInterval(() => {
    const now = Date.now();
    clients.forEach((client, clientId) => {
      if (now - client.lastPing > 60000) {
        if (client.ws.readyState === WebSocket.OPEN) {
          client.ws.terminate();
        }
        clients.delete(clientId);
      }
    });
  }, 30000);

  console.log('[WebSocket] Server initialized on /ws');
}

export function emitEvent(event: WSEvent): void {
  broadcast(event, event.guildId);
}

export function emitToGuild(guildId: string, event: Omit<WSEvent, 'guildId'>): void {
  broadcast({ ...event, guildId }, guildId);
}

export function getConnectedClients(): number {
  return clients.size;
}

export function getAuthenticatedClients(): number {
  return Array.from(clients.values()).filter((c) => c.userId !== null).length;
}
