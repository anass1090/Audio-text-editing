const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-dvh flex flex-col bg-gradient-to-br from-background via-background/95 to-muted transition-colors overflow-hidden">
            <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-primary/30 blur-[160px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[32rem] h-[32rem] bg-secondary/30 blur-[160px] rounded-full pointer-events-none" />
            <main className="flex-1 flex items-center justify-center p-6 relative z-10">
                {children}
            </main>
        </div>
    );
};

export default AppLayout;