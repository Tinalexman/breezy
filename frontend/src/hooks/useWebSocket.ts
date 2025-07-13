import { useState, useEffect, useRef, useCallback } from "react";

interface WebSocketMessage {
  type: string;
  data?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  timestamp?: number;
}

interface UseWebSocketReturn {
  messages: WebSocketMessage[];
  sendMessage: (message: string) => void;
  isConnected: boolean;
  connectionError: string | null;
  connect: () => void;
  disconnect: () => void;
}

export const useWebSocket = (url: string): UseWebSocketReturn => {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  const getAuthToken = () => {
    if (typeof window !== "undefined") {
      const authStorage = localStorage.getItem("auth-storage");
      if (authStorage) {
        try {
          const parsed = JSON.parse(authStorage);
          return parsed.state?.session?.accessToken || null;
        } catch (error) {
          console.error("Error parsing auth storage:", error);
          return null;
        }
      }
    }
    return null;
  };

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log("WebSocket already connected");
      return;
    }

    try {
      const token = getAuthToken();
      if (!token) {
        console.error("No auth token found for WebSocket connection");
        setConnectionError("No authentication token available");
        return;
      }

      console.log("Attempting to connect to WebSocket:", url);
      const ws = new WebSocket(`${url}?token=${token}`);
      wsRef.current = ws;

      ws.onopen = () => {
        setIsConnected(true);
        setConnectionError(null);
        reconnectAttemptsRef.current = 0;
        console.log("WebSocket connected successfully");
      };

      ws.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data);
          console.log("WebSocket message received:", message);
          setMessages((prev) => [...prev, message]);
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      ws.onclose = (event) => {
        setIsConnected(false);
        console.log("WebSocket disconnected:", event.code, event.reason);

        // Only attempt to reconnect if it's not a normal closure and we haven't exceeded max attempts
        if (
          event.code !== 1000 &&
          reconnectAttemptsRef.current < maxReconnectAttempts
        ) {
          reconnectAttemptsRef.current++;
          const timeout = Math.min(
            1000 * Math.pow(2, reconnectAttemptsRef.current),
            10000
          );
          console.log(
            `WebSocket reconnection attempt ${reconnectAttemptsRef.current} in ${timeout}ms`
          );

          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, timeout);
        } else if (reconnectAttemptsRef.current >= maxReconnectAttempts) {
          setConnectionError("Failed to connect after multiple attempts");
          console.error("WebSocket connection failed after maximum attempts");
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
        setIsConnected(false);
        setConnectionError("WebSocket connection error");
      };
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
      setIsConnected(false);
      setConnectionError("Failed to create WebSocket connection");
    }
  }, [url]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (wsRef.current) {
      wsRef.current.close(1000, "Manual disconnect");
      wsRef.current = null;
    }
    setIsConnected(false);
  }, []);

  const sendMessage = useCallback((message: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.warn("WebSocket is not connected");
    }
  }, []);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    messages,
    sendMessage,
    isConnected,
    connectionError,
    connect,
    disconnect,
  };
};
