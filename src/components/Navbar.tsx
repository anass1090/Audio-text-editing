import { NavLink } from "react-router-dom";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Mic, FileText, History, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
    const [dark, setDark] = useState(
        window.matchMedia("(prefers-color-scheme: dark)").matches
    );

    useEffect(() => {
        const root = document.documentElement;
        if (dark) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [dark]);

    const navItems = [
        { to: "/", label: "Record", icon: <Mic className="h-4 w-4" />, end: true },
        {
            to: "/transcript",
            label: "Transcript",
            icon: <FileText className="h-4 w-4" />,
        },
        {
            to: "/history",
            label: "History",
            icon: <History className="h-4 w-4" />,
        },
    ];

    return (
        <header className="sticky top-0 z-50 border-b bg-card/70 backdrop-blur-md">
            <div className="max-w-6xl mx-auto flex items-center justify-between px-6 h-14">
                {/* Logo */}
                <NavLink to="/" end>
                    <span className="font-extrabold text-xl tracking-tight">REFLECT</span>
                </NavLink>

                {/* Navigation */}
                <NavigationMenu>
                    <NavigationMenuList className="flex gap-2">
                        {navItems.map(({ to, label, icon, end }) => (
                            <NavigationMenuItem key={to}>
                                <NavLink to={to} end={end}>
                                    {({ isActive }) => (
                                        <NavigationMenuLink asChild>
                                           <span
                                              className={`px-3 py-2 flex items-center gap-2 rounded-md transition-colors cursor-pointer 
                                                  ${
                                                      isActive
                                                          ? "bg-accent text-accent-foreground"
                                                          : "hover:bg-accent hover:text-accent-foreground"
                                                  }`
                                              }
                                           >
                                              {icon} {label}
                                           </span>
                                        </NavigationMenuLink>
                                    )}
                                </NavLink>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {/* Theme toggle */}
                <button
                    onClick={() => setDark(!dark)}
                    className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                    aria-label="Toggle theme"
                >
                    {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
            </div>
        </header>
    );
};

export default Navbar;