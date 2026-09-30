import React, { createContext, useContext, useState, useCallback } from 'react';
import Icon, { type IconName } from '@/components/ui/Icon';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastItem {
    id: string;
    title: string;
    message?: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (title: string, message?: string, type?: ToastType, duration?: number) => void;
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const showToast = useCallback((title: string, message?: string, type: ToastType = 'info', duration: number = 3500) => {
        const id = Math.random().toString(36).substring(2, 9);
        const item: ToastItem = { id, title, message, type };
        setToasts((prev) => [...prev, item]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, [removeToast]);

    const success = useCallback((title: string, message?: string) => showToast(title, message, 'success'), [showToast]);
    const error = useCallback((title: string, message?: string) => showToast(title, message, 'error'), [showToast]);
    const info = useCallback((title: string, message?: string) => showToast(title, message, 'info'), [showToast]);
    const warning = useCallback((title: string, message?: string) => showToast(title, message, 'warning'), [showToast]);

    const getIcon = (type: ToastType): IconName => {
        switch (type) {
            case 'success': return 'check-circle-2';
            case 'error': return 'alert-circle';
            case 'warning': return 'shield-alert';
            case 'info':
            default: return 'info';
        }
    };

    const getTypeStyles = (type: ToastType) => {
        switch (type) {
            case 'success':
                return {
                    border: 'border-l-4 border-l-success border-border',
                    iconColor: 'text-success',
                    badgeBg: 'bg-success-bg text-success',
                };
            case 'error':
                return {
                    border: 'border-l-4 border-l-danger border-border',
                    iconColor: 'text-danger',
                    badgeBg: 'bg-danger-bg text-danger',
                };
            case 'warning':
                return {
                    border: 'border-l-4 border-l-warning border-border',
                    iconColor: 'text-warning',
                    badgeBg: 'bg-warning-bg text-warning',
                };
            case 'info':
            default:
                return {
                    border: 'border-l-4 border-l-primary border-border',
                    iconColor: 'text-primary',
                    badgeBg: 'bg-teal-bg text-primary',
                };
        }
    };

    return (
        <ToastContext.Provider value={{ showToast, success, error, info, warning }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full px-4">
                <AnimatePresence>
                    {toasts.map((toast) => {
                        const styles = getTypeStyles(toast.type);
                        return (
                            <motion.div
                                key={toast.id}
                                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 50, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-surface/95 border shadow-2xl backdrop-blur-md ${styles.border}`}
                            >
                                <div className={`flex-shrink-0 mt-0.5 ${styles.iconColor}`}>
                                    <Icon name={getIcon(toast.type)} size={18} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-xs font-bold text-foreground leading-snug">{toast.title}</h4>
                                    {toast.message && (
                                        <p className="text-[11px] text-foreground-muted mt-0.5 leading-relaxed">{toast.message}</p>
                                    )}
                                </div>
                                <button
                                    onClick={() => removeToast(toast.id)}
                                    className="text-foreground-muted hover:text-foreground transition flex-shrink-0 -mr-1 -mt-1 p-1 rounded-lg"
                                >
                                    <Icon name="x" size={14} />
                                </button>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
