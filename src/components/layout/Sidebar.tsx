"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen,
    Brain,
    Trophy,
    MessageCircle,
    Target,
    AlertCircle,
    Settings,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: number;
}

const navItems: NavItem[] = [
    {
        label: "Dashboard",
        href: ROUTES.DASHBOARD.ROOT,
        icon: LayoutDashboard,
    },
    {
        label: "Vocabulary",
        href: ROUTES.DASHBOARD.VOCABULARY,
        icon: BookOpen,
    },
    {
        label: "Flashcards",
        href: ROUTES.DASHBOARD.FLASHCARDS,
        icon: Brain,
    },
    {
        label: "Assessments",
        href: ROUTES.DASHBOARD.ASSESSMENTS,
        icon: GraduationCap,
    },
    {
        label: "Progress",
        href: ROUTES.DASHBOARD.PROGRESS,
        icon: Trophy,
    },
    {
        label: "Dialog Missions",
        href: ROUTES.DASHBOARD.DIALOG_MISSIONS,
        icon: Target,
    },
    {
        label: "AI Chat",
        href: ROUTES.DASHBOARD.AI_CHAT,
        icon: MessageCircle,
    },
    {
        label: "Mistakes",
        href: ROUTES.DASHBOARD.MISTAKES,
        icon: AlertCircle,
    },
];

const bottomNavItems: NavItem[] = [
    {
        label: "Settings",
        href: ROUTES.DASHBOARD.SETTINGS,
        icon: Settings,
    },
];

interface SidebarProps {
    className?: string;
}

function Sidebar({ className }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const toggleCollapse = () => setIsCollapsed(!isCollapsed);

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen bg-white border-r border-slate-200 flex flex-col z-40 transition-all duration-300",
                {
                    "w-64": !isCollapsed,
                    "w-20": isCollapsed,
                },
                className
            )}
        >
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200">
                <Link href={ROUTES.DASHBOARD.ROOT} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-500 flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <AnimatePresence>
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: "auto" }}
                                exit={{ opacity: 0, width: 0 }}
                                className="font-bold text-xl text-slate-900 overflow-hidden whitespace-nowrap"
                            >
                                Verbo
                            </motion.span>
                        )}
                    </AnimatePresence>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 overflow-y-auto">
                <ul className="space-y-1">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.href}
                            item={item}
                            isActive={pathname === item.href}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </ul>
            </nav>

            {/* Bottom Navigation */}
            <div className="py-4 px-3 border-t border-slate-200">
                <ul className="space-y-1">
                    {bottomNavItems.map((item) => (
                        <NavLink
                            key={item.href}
                            item={item}
                            isActive={pathname === item.href}
                            isCollapsed={isCollapsed}
                        />
                    ))}
                </ul>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={toggleCollapse}
                className="absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors"
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
                {isCollapsed ? (
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                ) : (
                    <ChevronLeft className="w-4 h-4 text-slate-600" />
                )}
            </button>
        </aside>
    );
}

function NavLink({
    item,
    isActive,
    isCollapsed,
}: {
    item: NavItem;
    isActive: boolean;
    isCollapsed: boolean;
}) {
    const Icon = item.icon;

    return (
        <li>
            <Link
                href={item.href}
                className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                    {
                        "bg-primary-50 text-primary-600": isActive,
                        "text-slate-600 hover:bg-slate-50 hover:text-slate-900":
                            !isActive,
                    }
                )}
                title={isCollapsed ? item.label : undefined}
            >
                <Icon
                    className={cn("w-5 h-5 flex-shrink-0", {
                        "text-primary-600": isActive,
                        "text-slate-500 group-hover:text-slate-700": !isActive,
                    })}
                />
                <AnimatePresence>
                    {!isCollapsed && (
                        <motion.span
                            initial={{ opacity: 0, width: 0 }}
                            animate={{ opacity: 1, width: "auto" }}
                            exit={{ opacity: 0, width: 0 }}
                            className="font-medium text-sm overflow-hidden whitespace-nowrap"
                        >
                            {item.label}
                        </motion.span>
                    )}
                </AnimatePresence>
                {item.badge && !isCollapsed && (
                    <span className="ml-auto bg-primary-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                    </span>
                )}
                {item.badge && isCollapsed && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                        {item.badge}
                    </span>
                )}
            </Link>
        </li>
    );
}

Sidebar.displayName = "Sidebar";

export { Sidebar };
