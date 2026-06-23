// src/pages/admin/AdminAddEmployee.tsx
import React, { useState } from 'react';
import Icon from '../../../components/ui/Icon';

interface EmployeeForm {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dob: string;
    gender: string;
    address: string;
    country: string;
    city: string;
    department: string;
    jobRole: string;
    employmentType: string;
    employeeId: string;
    startDate: string;
    manager: string;
    accessRole: 'employee' | 'admin';
    baseSalary: number;
    payFrequency: string;
    paymentMethod: string;
    bankAccount: string;
    allowances: { hra: number; transport: number; medical: number };
}

const AdminAddEmployee: React.FC = () => {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState<EmployeeForm>({
        firstName: 'Arjun',
        lastName: 'Kapoor',
        email: 'arjun.kapoor@acmecorp.com',
        phone: '+91 99887 76655',
        dob: '15 Mar 1995',
        gender: 'Male',
        address: 'Flat 4B, Oberoi Heights, Bandra West, Mumbai 400050',
        country: 'India',
        city: 'Mumbai',
        department: 'Engineering',
        jobRole: 'Frontend Engineer',
        employmentType: 'Full-time',
        employeeId: 'EMP-0042',
        startDate: '22 Jul 2024',
        manager: 'Aiko Tanaka',
        accessRole: 'employee',
        baseSalary: 8800,
        payFrequency: 'Monthly',
        paymentMethod: 'Bank Transfer',
        bankAccount: '•••• •••• 4892',
        allowances: { hra: 800, transport: 200, medical: 300 },
    });

    const totalMonthly = form.baseSalary + form.allowances.hra + form.allowances.transport + form.allowances.medical;
    const annualCTC = totalMonthly * 12;

    const handleChange = (field: keyof EmployeeForm, value: any) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep((s) => Math.min(s + 1, 4));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    return (
        <div className="flex flex-1 min-w-0 gap-0">
            {/* Main form area */}
            <div className="flex flex-col flex-1 min-w-0 px-8 py-6 gap-6">
                {/* Stepper */}
                <div className="flex items-center gap-0">
                    {[
                        { step: 1, label: 'Personal Info' },
                        { step: 2, label: 'Role & Access' },
                        { step: 3, label: 'Compensation' },
                        { step: 4, label: 'Review' },
                    ].map((s, idx) => (
                        <React.Fragment key={s.step}>
                            <div className="flex items-center flex-1">
                                <div className="flex flex-col items-center gap-1.5">
                                    <div
                                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 ${step >= s.step
                                                ? 'bg-primary border-primary text-primary-foreground'
                                                : 'border-border bg-surface text-foreground-muted'
                                            }`}
                                    >
                                        {s.step}
                                    </div>
                                    <span
                                        className={`text-xs font-semibold whitespace-nowrap ${step >= s.step ? 'text-primary' : 'text-foreground-muted'
                                            }`}
                                    >
                                        {s.label}
                                    </span>
                                </div>
                                {idx < 3 && (
                                    <div
                                        className="flex-1 h-px mx-3 mb-4"
                                        style={{ background: step > s.step ? '#00c9a7' : '#2a3347' }}
                                    />
                                )}
                            </div>
                        </React.Fragment>
                    ))}
                </div>

                {/* Step 1: Personal Information */}
                {step === 1 && (
                    <div className="rounded-xl border border-border bg-surface overflow-hidden">
                        <div className="px-6 py-3.5 border-b border-border bg-background-3">
                            <h3 className="text-sm font-bold text-foreground">Personal Information</h3>
                        </div>
                        <div className="px-6 py-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        First Name <span className="text-danger">*</span>
                                    </label>
                                    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <Icon name="user" size={14} />
                                        <input
                                            type="text"
                                            value={form.firstName}
                                            onChange={(e) => handleChange('firstName', e.target.value)}
                                            className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Last Name <span className="text-danger">*</span>
                                    </label>
                                    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <Icon name="user" size={14} />
                                        <input
                                            type="text"
                                            value={form.lastName}
                                            onChange={(e) => handleChange('lastName', e.target.value)}
                                            className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Email Address <span className="text-danger">*</span>
                                    </label>
                                    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <Icon name="mail" size={14} />
                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) => handleChange('email', e.target.value)}
                                            className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Phone Number
                                    </label>
                                    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <Icon name="smartphone" size={14} />
                                        <input
                                            type="text"
                                            value={form.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                            className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Date of Birth
                                    </label>
                                    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <Icon name="calendar" size={14} />
                                        <input
                                            type="text"
                                            value={form.dob}
                                            onChange={(e) => handleChange('dob', e.target.value)}
                                            className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Gender
                                    </label>
                                    <div className="flex items-center justify-between rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <Icon name="user" size={14} />
                                            <span className="text-sm text-foreground font-medium">{form.gender}</span>
                                        </div>
                                        <Icon name="chevron-down" size={13} />
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                            Address
                                        </label>
                                        <div className="flex items-center gap-2.5 rounded-lg border border-border bg-input px-3.5 py-2.5">
                                            <Icon name="map-pin" size={14} />
                                            <input
                                                type="text"
                                                value={form.address}
                                                onChange={(e) => handleChange('address', e.target.value)}
                                                className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Country <span className="text-danger">*</span>
                                    </label>
                                    <div className="flex items-center justify-between rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <Icon name="globe" size={14} />
                                            <span className="text-sm text-foreground font-medium">{form.country}</span>
                                        </div>
                                        <Icon name="chevron-down" size={13} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        City
                                    </label>
                                    <div className="flex items-center justify-between rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <Icon name="building-2" size={14} />
                                            <span className="text-sm text-foreground font-medium">{form.city}</span>
                                        </div>
                                        <Icon name="chevron-down" size={13} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Role & Department */}
                {step === 2 && (
                    <div className="rounded-xl border border-border bg-surface overflow-hidden">
                        <div className="px-6 py-3.5 border-b border-border bg-background-3">
                            <h3 className="text-sm font-bold text-foreground">Role &amp; Department</h3>
                        </div>
                        <div className="px-6 py-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Department <span className="text-danger">*</span>
                                    </label>
                                    <div className="flex items-center justify-between rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <Icon name="layers" size={14} />
                                            <span className="text-sm text-foreground font-medium">{form.department}</span>
                                        </div>
                                        <Icon name="chevron-down" size={13} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Job Role <span className="text-danger">*</span>
                                    </label>
                                    <div className="flex items-center justify-between rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <Icon name="briefcase" size={14} />
                                            <span className="text-sm text-foreground font-medium">{form.jobRole}</span>
                                        </div>
                                        <Icon name="chevron-down" size={13} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Employment Type
                                    </label>
                                    <div className="flex items-center justify-between rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <Icon name="clock" size={14} />
                                            <span className="text-sm text-foreground font-medium">{form.employmentType}</span>
                                        </div>
                                        <Icon name="chevron-down" size={13} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Employee ID
                                    </label>
                                    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <Icon name="hash" size={14} />
                                        <input
                                            type="text"
                                            value={form.employeeId}
                                            onChange={(e) => handleChange('employeeId', e.target.value)}
                                            className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                        />
                                    </div>
                                    <p className="text-xs text-foreground-muted">Leave blank to auto-generate</p>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Start Date <span className="text-danger">*</span>
                                    </label>
                                    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <Icon name="calendar" size={14} />
                                        <input
                                            type="text"
                                            value={form.startDate}
                                            onChange={(e) => handleChange('startDate', e.target.value)}
                                            className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Manager
                                    </label>
                                    <div className="flex items-center justify-between rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <Icon name="user-check" size={14} />
                                            <span className="text-sm text-foreground font-medium">{form.manager}</span>
                                        </div>
                                        <Icon name="chevron-down" size={13} />
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-foreground">
                                        Access Role <span className="text-danger">*</span>
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div
                                            className={`flex items-start gap-3 rounded-xl border p-4 ${form.accessRole === 'employee'
                                                    ? 'border-primary bg-teal-bg'
                                                    : 'border-border bg-surface'
                                                }`}
                                            onClick={() => handleChange('accessRole', 'employee')}
                                        >
                                            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-primary text-primary-foreground">
                                                <Icon name="user" size={16} />
                                            </div>
                                            <div className="flex flex-col gap-0.5 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-foreground">Employee</span>
                                                    {form.accessRole === 'employee' && (
                                                        <span className="text-xs font-bold text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                                                            Selected
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-foreground-muted leading-relaxed">
                                                    Can track time, manage own tasks and view personal reports
                                                </p>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex items-start gap-3 rounded-xl border p-4 ${form.accessRole === 'admin'
                                                    ? 'border-primary bg-teal-bg'
                                                    : 'border-border bg-surface'
                                                }`}
                                            onClick={() => handleChange('accessRole', 'admin')}
                                        >
                                            <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-muted text-foreground-muted">
                                                <Icon name="shield" size={16} />
                                            </div>
                                            <div className="flex flex-col gap-0.5 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-foreground">Admin</span>
                                                    {form.accessRole === 'admin' && (
                                                        <span className="text-xs font-bold text-primary bg-primary/20 px-2 py-0.5 rounded-full">
                                                            Selected
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="text-xs text-foreground-muted leading-relaxed">
                                                    Full access — manage employees, approve requests, view all reports
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Compensation */}
                {step === 3 && (
                    <div className="rounded-xl border border-border bg-surface overflow-hidden">
                        <div className="px-6 py-3.5 border-b border-border bg-background-3">
                            <h3 className="text-sm font-bold text-foreground">Compensation &amp; Salary</h3>
                        </div>
                        <div className="px-6 py-5">
                            <div className="grid grid-cols-2 gap-5">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground">
                                        Base Salary <span className="text-danger">*</span>
                                    </label>
                                    <div className="flex rounded-lg border border-border bg-input overflow-hidden">
                                        <div className="flex items-center px-3 bg-surface-2 border-r border-border">
                                            <span className="text-xs font-bold text-foreground-muted">USD</span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-1 px-3.5 py-2.5">
                                            <input
                                                type="number"
                                                value={form.baseSalary}
                                                onChange={(e) => handleChange('baseSalary', Number(e.target.value))}
                                                className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none"
                                            />
                                            <span className="text-xs text-foreground-muted">/ month</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Pay Frequency
                                    </label>
                                    <div className="flex items-center justify-between rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <Icon name="calendar" size={14} />
                                            <span className="text-sm text-foreground font-medium">{form.payFrequency}</span>
                                        </div>
                                        <Icon name="chevron-down" size={13} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Payment Method
                                    </label>
                                    <div className="flex items-center justify-between rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <div className="flex items-center gap-2.5">
                                            <Icon name="credit-card" size={14} />
                                            <span className="text-sm text-foreground font-medium">{form.paymentMethod}</span>
                                        </div>
                                        <Icon name="chevron-down" size={13} />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-semibold text-foreground flex items-center gap-1">
                                        Bank Account
                                    </label>
                                    <div className="flex items-center gap-2.5 rounded-lg border border-border bg-input px-3.5 py-2.5">
                                        <Icon name="landmark" size={14} />
                                        <input
                                            type="text"
                                            value={form.bankAccount}
                                            onChange={(e) => handleChange('bankAccount', e.target.value)}
                                            className="flex-1 bg-transparent text-sm text-foreground outline-none"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2 flex flex-col gap-3">
                                    <span className="text-xs font-bold text-foreground-muted uppercase tracking-wide">
                                        Allowances &amp; Benefits
                                    </span>
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="flex items-center justify-between rounded-xl border px-4 py-3 bg-teal-bg border-primary">
                                            <span className="text-xs font-semibold text-foreground">HRA</span>
                                            <span className="text-sm font-bold text-foreground">${form.allowances.hra}</span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-xl border px-4 py-3 bg-info-bg border-info">
                                            <span className="text-xs font-semibold text-foreground">Transport</span>
                                            <span className="text-sm font-bold text-foreground">${form.allowances.transport}</span>
                                        </div>
                                        <div className="flex items-center justify-between rounded-xl border px-4 py-3 bg-success-bg border-success">
                                            <span className="text-xs font-semibold text-foreground">Medical</span>
                                            <span className="text-sm font-bold text-foreground">${form.allowances.medical}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 flex items-center justify-between rounded-xl border border-border bg-background-3 px-5 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-foreground-muted">Total Gross CTC (Annual)</span>
                                        <span className="text-2xl font-bold text-foreground font-headings">
                                            ${annualCTC.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <span className="text-xs text-foreground-muted">Monthly gross</span>
                                        <span className="text-base font-bold text-primary">${totalMonthly.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 4: Review - placeholder */}
                {step === 4 && (
                    <div className="rounded-xl border border-border bg-surface p-8 text-center text-foreground-muted">
                        <Icon name="check" size={32} className="text-primary mx-auto mb-4" />
                        <h3 className="text-lg font-bold text-foreground">Review &amp; Submit</h3>
                        <p className="text-sm">All information is ready. Click "Submit" to onboard the employee.</p>
                    </div>
                )}

                {/* Navigation buttons */}
                <div className="flex items-center justify-between pt-2">
                    <button
                        onClick={prevStep}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground-muted"
                    >
                        <Icon name="chevron-left" size={14} /> Back
                    </button>
                    <div className="flex items-center gap-3">
                        <button className="px-5 py-2.5 rounded-lg border border-border text-sm font-semibold text-foreground-muted">
                            Save Draft
                        </button>
                        <button
                            onClick={nextStep}
                            className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-bold"
                        >
                            {step === 4 ? 'Submit' : 'Continue to Review'}
                            {step < 4 && <Icon name="arrow-right" size={14} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Right summary panel */}
            <div className="flex flex-col gap-5 border-l border-border px-6 py-6 bg-background-2" style={{ width: "280px", flexShrink: 0 }}>
                <div className="flex flex-col items-center gap-3 p-5 rounded-xl border border-dashed border-border">
                    <div className="relative">
                        <img
                            src="https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/7"
                            className="w-16 h-16 rounded-full"
                            alt="Employee avatar"
                        />
                        <button className="absolute -bottom-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full bg-primary text-primary-foreground border-2 border-background-2">
                            <Icon name="camera" size={11} />
                        </button>
                    </div>
                    <div className="flex flex-col items-center gap-0.5 text-center">
                        <span className="text-sm font-bold text-foreground">{form.firstName} {form.lastName}</span>
                        <span className="text-xs text-foreground-muted">{form.jobRole}</span>
                        <span className="text-xs font-semibold text-primary mt-1">{form.employeeId}</span>
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Profile Summary</h4>
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 flex items-center justify-center rounded-md bg-muted text-foreground-muted flex-shrink-0">
                            <Icon name="mail" size={11} />
                        </div>
                        <span className="text-xs text-foreground-muted truncate">{form.email}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 flex items-center justify-center rounded-md bg-muted text-foreground-muted flex-shrink-0">
                            <Icon name="smartphone" size={11} />
                        </div>
                        <span className="text-xs text-foreground-muted truncate">{form.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 flex items-center justify-center rounded-md bg-muted text-foreground-muted flex-shrink-0">
                            <Icon name="layers" size={11} />
                        </div>
                        <span className="text-xs text-foreground-muted truncate">{form.department}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 flex items-center justify-center rounded-md bg-muted text-foreground-muted flex-shrink-0">
                            <Icon name="calendar" size={11} />
                        </div>
                        <span className="text-xs text-foreground-muted truncate">Starts {form.startDate}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 flex items-center justify-center rounded-md bg-muted text-foreground-muted flex-shrink-0">
                            <Icon name="user-check" size={11} />
                        </div>
                        <span className="text-xs text-foreground-muted truncate">Reports to {form.manager}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 flex items-center justify-center rounded-md bg-muted text-foreground-muted flex-shrink-0">
                            <Icon name="shield" size={11} />
                        </div>
                        <span className="text-xs text-foreground-muted truncate capitalize">{form.accessRole} Access</span>
                    </div>
                </div>

                <div className="rounded-xl border border-border bg-surface p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Icon name="banknote" size={14} />
                        <span className="text-xs font-bold text-foreground">Compensation</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground-muted">Base Salary</span>
                        <span className="text-xs font-bold text-foreground">${form.baseSalary}/mo</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-foreground-muted">Total Allowances</span>
                        <span className="text-xs font-bold text-primary">
                            +${form.allowances.hra + form.allowances.transport + form.allowances.medical}/mo
                        </span>
                    </div>
                    <div className="h-px bg-border my-1" />
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-foreground">Total CTC</span>
                        <span className="text-sm font-bold text-foreground">${totalMonthly}/mo</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="text-xs font-bold text-foreground-muted uppercase tracking-wide">Checklist</h4>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-success">
                            <Icon name="check" size={9} />
                        </div>
                        <span className="text-xs font-medium text-foreground line-through opacity-60">Personal Info</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-success">
                            <Icon name="check" size={9} />
                        </div>
                        <span className="text-xs font-medium text-foreground line-through opacity-60">Role &amp; Department</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-success">
                            <Icon name="check" size={9} />
                        </div>
                        <span className="text-xs font-medium text-foreground line-through opacity-60">Compensation</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border border-border bg-surface" />
                        <span className="text-xs font-medium text-foreground-muted">Review &amp; Submit</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAddEmployee;