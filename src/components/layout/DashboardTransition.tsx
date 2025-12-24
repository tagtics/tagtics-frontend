import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ReactNode } from 'react';

interface DashboardTransitionProps {
    children: ReactNode;
}

export function DashboardTransition({ children }: DashboardTransitionProps) {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={location.pathname}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.075, ease: "easeOut" }} // Fast 75ms transition
                className="w-full h-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
