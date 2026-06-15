import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/ui/Icon';

interface Message {
    id: string;
    sender: string;
    senderAvatar: string;
    timestamp: string;
    content: string;
    isOwn: boolean;
    reactions?: { emoji: string; count: number }[];
}

const Chat: React.FC = () => {
    const [activeChannel, setActiveChannel] = useState('design');
    const [newMessage, setNewMessage] = useState('');

    const channels = [
        { id: 'general', name: 'general', unread: 3 },
        { id: 'engineering', name: 'engineering', unread: 0 },
        { id: 'design', name: 'design', unread: 7 },
        { id: 'product-updates', name: 'product-updates', unread: 1 },
        { id: 'standup', name: 'standup', unread: 0 },
    ];

    const directMessages = [
        { id: 'priya', name: 'Priya', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1', status: 'online', unread: 2 },
        { id: 'james', name: 'James', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/North American/2', status: 'busy', unread: 0 },
        { id: 'aiko', name: 'Aiko', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3', status: 'online', unread: 0 },
        { id: 'carlos', name: 'Carlos', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/Hispanic/4', status: 'away', unread: 0 },
    ];

    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            sender: 'Priya Sharma',
            senderAvatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1',
            timestamp: '9:14 AM',
            content: 'Hey team! 👋 I\'ve finished the wireframes for the onboarding redesign. Can someone review before EOD?',
            isOwn: false,
            reactions: [{ emoji: '👍', count: 3 }, { emoji: '🔥', count: 2 }],
        },
        {
            id: '2',
            sender: 'James Carter',
            senderAvatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/North American/2',
            timestamp: '9:17 AM',
            content: 'Looks solid Priya! Left a few comments on the Figma file. The step 3 flow might confuse new users — maybe simplify?',
            isOwn: false,
        },
        {
            id: '3',
            sender: 'Aryan Mehta',
            senderAvatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0',
            timestamp: '9:21 AM',
            content: 'Agreed with James. Also — should we A/B test the welcome screen copy? I can set up a feature flag.',
            isOwn: true,
            reactions: [{ emoji: '💡', count: 4 }],
        },
        {
            id: '4',
            sender: 'Priya Sharma',
            senderAvatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1',
            timestamp: '9:24 AM',
            content: 'Great idea Aryan! @James — updating step 3 now. Will share the revised frames in ~30 mins.',
            isOwn: false,
        },
        {
            id: '5',
            sender: 'Aiko Tanaka',
            senderAvatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3',
            timestamp: '9:30 AM',
            content: 'Also flagging — sprint retro is at 3 PM today. Please fill in the Miro board before then 🙏',
            isOwn: false,
            reactions: [{ emoji: '✅', count: 5 }],
        },
        {
            id: '6',
            sender: 'Aryan Mehta',
            senderAvatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0',
            timestamp: '9:33 AM',
            content: 'On it! Also just shipped the floating timer fix from last week\'s bug report. Should be in staging now.',
            isOwn: true,
            reactions: [{ emoji: '🚀', count: 6 }, { emoji: '🎉', count: 2 }],
        },
        {
            id: '7',
            sender: 'James Carter',
            senderAvatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/North American/2',
            timestamp: '9:40 AM',
            content: 'Testing it now... looks great! Timer no longer resets on browser refresh 🙌',
            isOwn: false,
            reactions: [{ emoji: '🙌', count: 3 }],
        },
    ]);

    const pinnedTasks = [
        { task: 'Review onboarding wireframes', assignee: 'Priya', status: 'active' },
        { task: 'Set up A/B test flag', assignee: 'Aryan', status: 'pending' },
        { task: 'Fill Miro retro board', assignee: 'Everyone', status: 'pending' },
    ];

    const members = [
        { name: 'Priya Sharma', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1', status: 'online' },
        { name: 'Aryan Mehta', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0', status: 'online' },
        { name: 'Aiko Tanaka', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/East Asian/3', status: 'online' },
        { name: 'Amara Osei', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/female/25-35/African/5', status: 'away' },
        { name: 'James Carter', avatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/North American/2', status: 'busy' },
    ];

    const sharedFiles = [
        { name: 'Onboarding_v2.fig', type: 'Figma', size: '4.2 MB', icon: 'figma', color: 'text-purple' },
        { name: 'Sprint_28_brief.pdf', type: 'PDF', size: '1.1 MB', icon: 'file-text', color: 'text-danger' },
        { name: 'design-tokens.json', type: 'JSON', size: '48 KB', icon: 'code-2', color: 'text-primary' },
    ];

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;
        const newMsg: Message = {
            id: Date.now().toString(),
            sender: 'Aryan Mehta',
            senderAvatar: 'https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            content: newMessage,
            isOwn: true,
        };
        setMessages([...messages, newMsg]);
        setNewMessage('');
    };

    const addReaction = (messageId: string, emoji: string) => {
        setMessages(prev =>
            prev.map(msg =>
                msg.id === messageId
                    ? {
                        ...msg,
                        reactions: msg.reactions
                            ? msg.reactions.map(r => (r.emoji === emoji ? { ...r, count: r.count + 1 } : r))
                            : [{ emoji, count: 1 }],
                    }
                    : msg
            )
        );
    };

    const activeChannelInfo = channels.find(c => c.id === activeChannel) || channels[0];

    return (
        <div className="flex flex-1 min-w-0">
            {/* Left Sidebar – Channels & DMs */}
            <div className="flex flex-col border-r border-border bg-background-2 w-[240px] flex-shrink-0">
                <div className="flex items-center justify-between px-4 py-4 border-b border-border">
                    <span className="text-base font-bold text-foreground">Messages</span>
                    <button className="w-7 h-7 flex items-center justify-center rounded-lg bg-surface border border-border text-foreground-muted">
                        <Icon name="edit-3" size={14} />
                    </button>
                </div>
                <div className="px-3 pt-3 pb-2">
                    <div className="flex items-center gap-2 rounded-lg bg-surface border border-border px-3 py-2">
                        <Icon name="search" size={13} />
                        <span className="text-xs text-foreground-muted">Search messages...</span>
                    </div>
                </div>
                <div className="flex flex-col px-2 mt-2">
                    <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest px-2 py-1.5">Channels</span>
                    {channels.map(ch => (
                        <button
                            key={ch.id}
                            onClick={() => setActiveChannel(ch.id)}
                            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition ${activeChannel === ch.id ? 'bg-teal-bg text-primary' : 'text-foreground-muted hover:bg-surface-2'
                                }`}
                        >
                            <Icon name="hash" size={14} />
                            <span className="flex-1 text-sm font-medium truncate text-left">{ch.name}</span>
                            {ch.unread > 0 && (
                                <span className="text-xs font-bold bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                                    {ch.unread}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col px-2 mt-3">
                    <span className="text-xs font-bold text-foreground-muted uppercase tracking-widest px-2 py-1.5">Direct Messages</span>
                    {directMessages.map(dm => (
                        <button key={dm.id} className="flex items-center gap-2 px-3 py-2 rounded-lg text-foreground-muted hover:bg-surface-2 transition">
                            <div className="relative flex-shrink-0">
                                <img src={dm.avatar} className="w-6 h-6 rounded-full" alt={dm.name} />
                                <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-background-2 ${dm.status === 'online' ? 'bg-success' : dm.status === 'busy' ? 'bg-danger' : 'bg-warning'
                                    }`} />
                            </div>
                            <span className="flex-1 text-sm font-medium truncate text-left">{dm.name}</span>
                            {dm.unread > 0 && (
                                <span className="text-xs font-bold bg-primary text-primary-foreground rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                                    {dm.unread}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
                <div className="mt-auto border-t border-border px-4 py-3 flex items-center gap-2">
                    <div className="relative">
                        <img src="https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0" className="w-7 h-7 rounded-full" alt="Aryan" />
                        <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-success border border-background-2" />
                    </div>
                    <span className="text-xs font-semibold text-foreground flex-1">Aryan Mehta</span>
                    <button className="text-foreground-muted">
                        <Icon name="settings" size={13} />
                    </button>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-background-2">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-bg">
                            <Icon name="hash" size={16} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="text-base font-bold text-foreground">{activeChannelInfo.name}</span>
                                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-bg text-primary font-semibold">5 online</span>
                            </div>
                            <span className="text-xs text-foreground-muted">Design team discussions, feedback, and file sharing</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted">
                            <Icon name="users" size={13} /> Members
                        </button>
                        <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-surface text-xs font-semibold text-foreground-muted">
                            <Icon name="search" size={13} /> Search
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted">
                            <Icon name="more-horizontal" size={15} />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex flex-col flex-1 min-h-0">
                    <div className="flex items-center gap-3 px-6 py-4">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs font-semibold text-foreground-muted px-2">Today — July 18, 2024</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>
                    <div className="flex flex-col gap-1 px-6 pb-4 flex-1 overflow-y-auto">
                        {messages.map(msg => (
                            <div key={msg.id} className={`group flex gap-3 rounded-xl px-3 py-2 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                                <div className="flex-shrink-0 mt-1" style={{ width: 36 }}>
                                    <img src={msg.senderAvatar} className="w-8 h-8 rounded-full" alt={msg.sender} />
                                </div>
                                <div className={`flex flex-col gap-1 flex-1 min-w-0 ${msg.isOwn ? 'items-end' : 'items-start'}`}>
                                    <div className={`flex items-center gap-2 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                                        <span className="text-xs font-bold text-foreground">{msg.sender}</span>
                                        <span className="text-xs text-foreground-muted">{msg.timestamp}</span>
                                    </div>
                                    <div className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-lg ${msg.isOwn ? 'bg-primary text-primary-foreground rounded-tr-sm' : 'bg-surface-2 border border-border text-foreground rounded-tl-sm'
                                        }`}>
                                        {msg.content}
                                    </div>
                                    <div className="flex gap-1.5 mt-0.5">
                                        {msg.reactions?.map(react => (
                                            <button
                                                key={react.emoji}
                                                className="flex items-center gap-1 text-xs rounded-full border border-border bg-surface px-2 py-0.5 font-medium text-foreground-muted"
                                            >
                                                {react.emoji} {react.count}
                                            </button>
                                        ))}
                                        <button className="w-6 h-6 flex items-center justify-center rounded-full border border-border bg-surface text-foreground-muted opacity-0 group-hover:opacity-100 transition">
                                            <Icon name="smile-plus" size={11} />
                                        </button>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 mt-1 self-start ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
                                    <button className="w-6 h-6 flex items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted">
                                        <Icon name="smile-plus" size={11} />
                                    </button>
                                    <button className="w-6 h-6 flex items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted">
                                        <Icon name="reply" size={11} />
                                    </button>
                                    <button className="w-6 h-6 flex items-center justify-center rounded-lg border border-border bg-surface text-foreground-muted">
                                        <Icon name="more-horizontal" size={11} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="flex items-center gap-3 px-3 py-2">
                            <img src="https://storage.googleapis.com/banani-avatars/avatar/female/25-35/South Asian/1" className="w-6 h-6 rounded-full" alt="Priya" />
                            <div className="flex items-center gap-1.5 bg-surface-2 border border-border rounded-2xl px-3 py-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-foreground-muted"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-foreground-muted"></span>
                                <span className="w-1.5 h-1.5 rounded-full bg-foreground-muted"></span>
                            </div>
                            <span className="text-xs text-foreground-muted">Priya is typing...</span>
                        </div>
                    </div>

                    {/* Message Input */}
                    <div className="px-6 pb-5">
                        <div className="rounded-2xl border border-border bg-surface overflow-hidden">
                            <div className="flex items-center gap-1 px-4 py-2 border-b border-border">
                                <button className="w-7 h-7 flex items-center justify-center rounded text-foreground-muted"><Icon name="bold" size={13} /></button>
                                <button className="w-7 h-7 flex items-center justify-center rounded text-foreground-muted"><Icon name="italic" size={13} /></button>
                                <button className="w-7 h-7 flex items-center justify-center rounded text-foreground-muted"><Icon name="link" size={13} /></button>
                                <button className="w-7 h-7 flex items-center justify-center rounded text-foreground-muted"><Icon name="list" size={13} /></button>
                                <button className="w-7 h-7 flex items-center justify-center rounded text-foreground-muted"><Icon name="code" size={13} /></button>
                                <button className="w-7 h-7 flex items-center justify-center rounded text-foreground-muted"><Icon name="at-sign" size={13} /></button>
                            </div>
                            <div className="flex items-end gap-3 px-4 py-3">
                                <div className="flex-1 text-sm text-foreground-muted min-h-8 leading-relaxed">
                                    <input
                                        type="text"
                                        value={newMessage}
                                        onChange={e => setNewMessage(e.target.value)}
                                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Message #design..."
                                        className="w-full bg-transparent outline-none"
                                    />
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-muted"><Icon name="paperclip" size={15} /></button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-muted"><Icon name="image" size={15} /></button>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-foreground-muted"><Icon name="smile" size={15} /></button>
                                    <button onClick={handleSendMessage} className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                                        <Icon name="send" size={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Sidebar – Pinned, Members, Files */}
            <div className="flex flex-col gap-5 border-l border-border px-5 py-5 bg-background-2 w-[260px] flex-shrink-0 overflow-y-auto">
                {/* Pinned Tasks */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Icon name="pin" size={14} />
                        <span className="text-xs font-bold text-foreground uppercase tracking-wide">Pinned Tasks</span>
                    </div>
                    {pinnedTasks.map((task, idx) => (
                        <div key={idx} className="flex items-start gap-2 rounded-lg bg-surface border border-border p-3">
                            <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${task.status === 'active' ? 'bg-primary' : 'bg-foreground-muted'}`} />
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-xs font-semibold text-foreground leading-snug">{task.task}</span>
                                <span className="text-xs text-foreground-muted">{task.assignee}</span>
                            </div>
                        </div>
                    ))}
                    <button className="flex items-center gap-1.5 text-xs text-primary font-semibold">
                        <Icon name="plus" size={12} /> Pin a task
                    </button>
                </div>

                {/* Members */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Icon name="users" size={14} />
                        <span className="text-xs font-bold text-foreground uppercase tracking-wide">Members · {members.length}</span>
                    </div>
                    {members.map(member => (
                        <div key={member.name} className="flex items-center gap-2">
                            <div className="relative flex-shrink-0">
                                <img src={member.avatar} className="w-7 h-7 rounded-full" alt={member.name} />
                                <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-background-2 ${member.status === 'online' ? 'bg-success' : member.status === 'busy' ? 'bg-danger' : 'bg-warning'
                                    }`} />
                            </div>
                            <span className="text-xs text-foreground truncate">{member.name}</span>
                        </div>
                    ))}
                </div>

                {/* Shared Files */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2">
                        <Icon name="paperclip" size={14} />
                        <span className="text-xs font-bold text-foreground uppercase tracking-wide">Shared Files</span>
                    </div>
                    {sharedFiles.map(file => (
                        <a key={file.name} className="flex items-center gap-2 rounded-lg bg-surface border border-border px-3 py-2.5">
                            <div className={`w-7 h-7 flex items-center justify-center rounded-lg bg-muted flex-shrink-0 ${file.color}`}>
                                <Icon name={file.icon as any} size={13} />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                                <span className="text-xs font-semibold text-foreground truncate">{file.name}</span>
                                <span className="text-xs text-foreground-muted">{file.type} · {file.size}</span>
                            </div>
                            <Icon name="download" size={12} />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chat;