import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

export const BentoGrid = ({
    className,
    children,
}: {
    className?: string;
    children?: ReactNode;
}) => {
    return (
        <div
            className={cn(
                "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
                className
            )}
        >
            {children}
        </div>
    );
};

export const BentoGridItem = ({
    className,
    title,
    description,
    header,
    icon,
}: {
    className?: string;
    title?: string | React.ReactNode;
    description?: string | React.ReactNode;
    header?: React.ReactNode;
    icon?: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                "row-span-1 rounded-xl group/bento transition duration-200 p-4 justify-between flex flex-col space-y-4 glass-card hover-glow",
                className
            )}
        >
            {header && <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border border-white/10 dark:border-white/20">{header}</div>}

            <div className="group-hover/bento:translate-x-2 transition duration-200">
                {icon}
                <div className="font-heading font-bold text-lg text-neutral-200 mb-2 mt-2">
                    {title}
                </div>
                <div className="font-sans font-normal text-muted-foreground text-xs">
                    {description}
                </div>
            </div>
        </div>
    );
};
