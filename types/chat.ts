export type ChatStatus = 'online' | 'offline';
export type ChatType = 'buyer' | 'venue' | 'support';

export interface Conversation {
  id: number;
  type: ChatType;
  name: string;
  avatar: string | null;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status: ChatStatus;
}
