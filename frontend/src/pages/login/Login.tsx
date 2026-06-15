import React, { useState } from 'react';
import Icon from '../../components/ui/Icon';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Login attempt with: ${email} / ${password}`);
    };

    const handleGoogleLogin = () => alert('Google login clicked');
    const handleGithubLogin = () => alert('GitHub login clicked');

    return (
        <div className="flex bg-background font-body min-h-screen">
            {/* Left panel – Brand, features, testimonial */}
            <div className="relative flex flex-col justify-between p-12 overflow-hidden w-[520px] flex-shrink-0">
                <div className="absolute inset-0">
                    <img
                        src="https://storage.googleapis.com/banani-generated-images/generated-images/539998eb-305e-402d-b9f6-206f7d7fae58.jpg"
                        className="w-full h-full object-cover"
                        alt="Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f111790] via-[#0f1117e8] to-[#0f1117]" />
                </div>

                <div className="relative flex items-center gap-3 z-10">
                    <div className="flex items-center justify-center rounded-xl bg-primary w-10 h-10">
                        <Icon name="zap" size={20} />
                    </div>
                    <span className="font-headings font-bold text-xl text-foreground">FlowWork</span>
                </div>

                <div className="relative z-10 flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <h1 className="font-headings font-bold text-foreground leading-tight text-[40px]">
                            Work smarter,
                            <br />
                            <span className="text-primary">not harder.</span>
                        </h1>
                        <p className="text-base text-foreground-muted leading-relaxed max-w-[360px]">
                            Track time, manage tasks, and understand your productivity — all in one beautifully designed workspace.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-bg">
                                <Icon name="timer" size={15} />
                            </div>
                            <span className="text-sm text-foreground-muted">Live time tracking with auto-save</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-bg">
                                <Icon name="layout-dashboard" size={15} />
                            </div>
                            <span className="text-sm text-foreground-muted">Rich employee &amp; admin dashboards</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-bg">
                                <Icon name="bar-chart-2" size={15} />
                            </div>
                            <span className="text-sm text-foreground-muted">Deep productivity analytics</span>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-surface/70 p-5 backdrop-blur-sm">
                        <p className="text-sm text-foreground-muted leading-relaxed italic">
                            "FlowWork transformed how our team tracks time. Adoption went from 20% to 98% in two weeks."
                        </p>
                        <div className="flex items-center gap-3 mt-4">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                                SL
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-foreground">Sarah Lee</div>
                                <div className="text-xs text-foreground-muted">Head of Engineering, Acme Corp</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel – Login Form */}
            <div className="flex flex-col flex-1 items-center justify-center px-16 py-12 bg-background-2">
                <div className="w-full max-w-[420px]">
                    <div className="flex flex-col gap-2 mb-10">
                        <h2 className="font-headings font-bold text-foreground text-[28px]">Welcome back</h2>
                        <p className="text-sm text-foreground-muted">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-primary font-semibold hover:underline">
                                Sign up free
                            </a>
                        </p>
                    </div>

                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={handleGoogleLogin}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-sm font-semibold text-foreground hover:bg-surface-2 transition"
                        >
                            <Icon name="chrome" size={16} /> Google
                        </button>
                        <button
                            onClick={handleGithubLogin}
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-sm font-semibold text-foreground hover:bg-surface-2 transition"
                        >
                            <Icon name="github" size={16} /> GitHub
                        </button>
                    </div>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex-1 h-px bg-border" />
                        <span className="text-xs text-foreground-muted">or continue with email</span>
                        <div className="flex-1 h-px bg-border" />
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-foreground">Work Email</label>
                            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5">
                                <Icon name="mail" size={16} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@company.com"
                                    className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-semibold text-foreground">Password</label>
                                <a href="#" className="text-xs text-primary font-semibold hover:underline">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3.5">
                                <Icon name="lock" size={16} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                    required
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-foreground-muted">
                                    <Icon name="eye" size={15} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setRememberMe(!rememberMe)}
                                className="w-4 h-4 rounded border-2 flex items-center justify-center"
                                style={{ borderColor: 'var(--color-primary)', backgroundColor: rememberMe ? 'var(--color-primary)' : 'transparent' }}
                            >
                                {rememberMe && <Icon name="check" size={10} className="text-primary-foreground" />}
                            </button>
                            <span className="text-sm text-foreground-muted">Remember me for 30 days</span>
                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground hover:bg-primary/90 transition mt-1"
                        >
                            Sign In
                            <Icon name="arrow-right" size={17} />
                        </button>
                    </form>

                    <div className="flex items-center gap-3 mt-8 rounded-xl border border-dashed border-border p-4">
                        <Icon name="info" size={15} />
                        <div className="text-xs text-foreground-muted">
                            <span className="font-semibold text-foreground">Demo accounts: </span>
                            admin@flowwork.io / employee@flowwork.io — password: demo1234
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;