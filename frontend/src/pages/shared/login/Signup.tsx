import React, { useState } from 'react';
import Icon from '../../../components/ui/Icon';

const Signup: React.FC = () => {
    const [firstName, setFirstName] = useState('Aryan');
    const [lastName, setLastName] = useState('Mehta');
    const [email, setEmail] = useState('aryan@acmecorp.com');
    const [company, setCompany] = useState('Acme Corp');
    const [role, setRole] = useState<'employee' | 'admin'>('employee');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(true);

    const passwordStrength = () => {
        if (password.length === 0) return { level: 0, text: '', color: 'bg-border' };
        if (password.length < 6) return { level: 1, text: 'Weak', color: 'bg-danger' };
        if (password.length < 10) return { level: 2, text: 'Good', color: 'bg-warning' };
        return { level: 3, text: 'Strong', color: 'bg-success' };
    };

    const strength = passwordStrength();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Account created (demo)');
    };

    const handleGoogleSignup = () => alert('Sign up with Google');
    const handleGithubSignup = () => alert('Sign up with GitHub');

    return (
        <div className="flex bg-background font-body min-h-screen">
            {/* Left panel – Brand & Progress */}
            <div className="relative flex flex-col justify-between p-12 overflow-hidden w-[480px] flex-shrink-0">
                <div className="absolute inset-0">
                    <img
                        src="https://storage.googleapis.com/banani-generated-images/generated-images/44e9460d-9255-4892-9313-912c8ab3957f.jpg"
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

                <div className="relative z-10 flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <h1 className="font-headings font-bold text-foreground leading-tight text-[36px]">
                            Set up your
                            <br />
                            <span className="text-primary">workspace.</span>
                        </h1>
                        <p className="text-sm text-foreground-muted leading-relaxed">
                            Get started in under 2 minutes. No credit card required.
                        </p>
                    </div>

                    {/* Progress steps */}
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-success text-foreground">
                                <Icon name="check" size={14} />
                            </div>
                            <span className="text-sm font-semibold text-foreground-muted line-through">Create your account</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-primary text-primary-foreground">
                                02
                            </div>
                            <span className="text-sm font-semibold text-foreground">Set up your workspace</span>
                        </div>
                        <div className="flex items-center gap-4 opacity-40">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-border text-foreground-muted">
                                03
                            </div>
                            <span className="text-sm font-semibold text-foreground-muted">Invite your team</span>
                        </div>
                        <div className="flex items-center gap-4 opacity-40">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 border-border text-foreground-muted">
                                04
                            </div>
                            <span className="text-sm font-semibold text-foreground-muted">Start tracking</span>
                        </div>
                    </div>

                    {/* Social proof */}
                    <div className="flex items-center gap-3 rounded-xl border border-border bg-surface/70 p-4 backdrop-blur-sm">
                        <div className="flex -space-x-2">
                            <div className="w-7 h-7 rounded-full border-2 border-background bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                                A
                            </div>
                            <div className="w-7 h-7 rounded-full border-2 border-background bg-purple flex items-center justify-center text-xs font-bold text-primary-foreground">
                                B
                            </div>
                            <div className="w-7 h-7 rounded-full border-2 border-background bg-warning flex items-center justify-center text-xs font-bold text-primary-foreground">
                                C
                            </div>
                            <div className="w-7 h-7 rounded-full border-2 border-background bg-info flex items-center justify-center text-xs font-bold text-primary-foreground">
                                D
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-foreground">12,000+ teams</span>
                            <span className="text-xs text-foreground-muted">already using FlowWork</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right panel – Signup Form */}
            <div className="flex flex-col flex-1 items-center justify-center px-16 py-12 bg-background-2">
                <div className="w-full max-w-[440px]">
                    <div className="flex flex-col gap-2 mb-8">
                        <h2 className="font-headings font-bold text-foreground text-[26px]">Create your account</h2>
                        <p className="text-sm text-foreground-muted">
                            Already have an account?{' '}
                            <a href="#" className="text-primary font-semibold hover:underline">
                                Sign in
                            </a>
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-foreground">First Name</label>
                                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
                                    <Icon name="user" size={15} />
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-foreground">Last Name</label>
                                <div className="flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-foreground">Work Email</label>
                            <div className="flex items-center gap-3 rounded-xl border border-primary bg-surface px-4 py-3">
                                <Icon name="mail" size={15} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                />
                                <Icon name="check-circle-2" size={15} className="text-primary" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-foreground">Company / Workspace Name</label>
                            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                                <Icon name="building-2" size={15} />
                                <input
                                    type="text"
                                    value={company}
                                    onChange={(e) => setCompany(e.target.value)}
                                    className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-foreground">I am joining as</label>
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setRole('employee')}
                                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 ${role === 'employee'
                                            ? 'border-primary bg-teal-bg'
                                            : 'border-border bg-surface'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${role === 'employee' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground-muted'
                                        }`}>
                                        <Icon name="user" size={15} />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-sm font-bold ${role === 'employee' ? 'text-foreground' : 'text-foreground-muted'}`}>
                                            Employee
                                        </span>
                                        <span className="text-xs text-foreground-muted">Track my work</span>
                                    </div>
                                    {role === 'employee' && <Icon name="check-circle-2" size={16} />}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`flex items-center gap-3 rounded-xl border-2 px-4 py-3.5 ${role === 'admin'
                                            ? 'border-primary bg-teal-bg'
                                            : 'border-border bg-surface'
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${role === 'admin' ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground-muted'
                                        }`}>
                                        <Icon name="shield" size={15} />
                                    </div>
                                    <div className="flex flex-col text-left">
                                        <span className={`text-sm font-bold ${role === 'admin' ? 'text-foreground' : 'text-foreground-muted'}`}>
                                            Admin
                                        </span>
                                        <span className="text-xs text-foreground-muted">Manage team</span>
                                    </div>
                                    {role === 'admin' && <Icon name="check-circle-2" size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-foreground">Password</label>
                            <div className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
                                <Icon name="lock" size={15} />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                    placeholder="Min. 8 characters"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-foreground-muted">
                                    <Icon name="eye" size={15} />
                                </button>
                            </div>
                            {password.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <div className="flex gap-1 flex-1">
                                        {[1, 2, 3].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`flex-1 h-1 rounded-full ${i < strength.level ? strength.color : 'bg-border'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <span className={`text-xs font-semibold ${strength.color === 'bg-danger' ? 'text-danger' : strength.color === 'bg-warning' ? 'text-warning' : 'text-success'}`}>
                                        {strength.text}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-start gap-3">
                            <button
                                type="button"
                                onClick={() => setAgreeTerms(!agreeTerms)}
                                className="w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ borderColor: 'var(--color-primary)', backgroundColor: agreeTerms ? 'var(--color-primary)' : 'transparent' }}
                            >
                                {agreeTerms && <Icon name="check" size={10} className="text-primary-foreground" />}
                            </button>
                            <span className="text-xs text-foreground-muted leading-relaxed">
                                I agree to the <a href="#" className="text-primary font-semibold">Terms of Service</a> and{' '}
                                <a href="#" className="text-primary font-semibold">Privacy Policy</a>
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="flex items-center justify-center gap-2 w-full rounded-xl bg-primary py-3.5 text-base font-bold text-primary-foreground hover:bg-primary/90 transition"
                        >
                            Create Account
                            <Icon name="arrow-right" size={17} />
                        </button>

                        <div className="flex items-center gap-4">
                            <div className="flex-1 h-px bg-border" />
                            <span className="text-xs text-foreground-muted">or sign up with</span>
                            <div className="flex-1 h-px bg-border" />
                        </div>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={handleGoogleSignup}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-sm font-semibold text-foreground hover:bg-surface-2 transition"
                            >
                                <Icon name="chrome" size={16} /> Google
                            </button>
                            <button
                                type="button"
                                onClick={handleGithubSignup}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface py-3 text-sm font-semibold text-foreground hover:bg-surface-2 transition"
                            >
                                <Icon name="github" size={16} /> GitHub
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;