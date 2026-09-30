import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/Icon';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center text-primary mb-4">
                <Icon name="alert-circle" size={32} />
            </div>
            <h1 className="font-headings font-bold text-3xl text-foreground mb-2">Page Not Found</h1>
            <p className="text-sm text-foreground-muted max-w-md mb-6">
                The page you are looking for doesn't exist or has been moved.
            </p>
            <Link
                to="/"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:brightness-110 transition shadow-sm"
            >
                <Icon name="arrow-right" size={14} /> Back to Dashboard
            </Link>
        </div>
    );
};

export default NotFound;
