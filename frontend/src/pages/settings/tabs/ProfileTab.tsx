import React from 'react';

const ProfileTab: React.FC = () => {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold text-foreground">Profile</h2>
                <p className="text-sm text-foreground-muted">Manage your personal information</p>
            </div>
            <div className="rounded-xl border border-border bg-surface p-6">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <img
                            src="https://storage.googleapis.com/banani-avatars/avatar/male/25-35/South Asian/0"
                            className="w-16 h-16 rounded-full"
                            alt="Avatar"
                        />
                        <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold">
                            Change Avatar
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-foreground">First Name</label>
                            <input
                                type="text"
                                defaultValue="Aryan"
                                className="w-full mt-1 rounded-lg border border-border bg-background-2 px-4 py-2 text-foreground"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-foreground">Last Name</label>
                            <input
                                type="text"
                                defaultValue="Mehta"
                                className="w-full mt-1 rounded-lg border border-border bg-background-2 px-4 py-2 text-foreground"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-foreground">Bio</label>
                        <textarea
                            rows={3}
                            defaultValue="Frontend Engineer passionate about design systems and user experience."
                            className="w-full mt-1 rounded-lg border border-border bg-background-2 px-4 py-2 text-foreground"
                        />
                    </div>
                    <button className="w-fit px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-bold">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileTab;