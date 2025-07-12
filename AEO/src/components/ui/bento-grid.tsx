'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BentoGridItemProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  children?: React.ReactNode;
  actionText?: string;
  gradient?: string;
  logoUrl?: string; // New prop for LLM logos
}

const BentoGridItem = ({
  title,
  description,
  icon,
  className,
  size = 'small',
  onClick,
  children,
  actionText = 'Ver más',
  gradient = 'from-primary to-primary/30',
  logoUrl,
}: BentoGridItemProps) => {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring' as const, 
        damping: 25 
      } 
    },
  };

  return (
    <motion.div
      variants={variants}
      onClick={onClick}
      className={cn(
        'group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm px-6 pb-6 pt-6 shadow-md transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10',
        onClick && 'cursor-pointer',
        className,
      )}
    >
      {/* Grid Pattern Background */}
      <div className="absolute -right-1/2 top-0 z-0 size-full bg-[linear-gradient(to_right,hsl(var(--muted))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted))_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

      {/* Large Background Icon */}
      <div className="absolute bottom-3 right-3 scale-[4] text-muted/5 transition-all duration-700 group-hover:scale-[4.2] group-hover:text-muted/10">
        {icon}
      </div>

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary shadow-sm transition-all duration-500 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20">
            {logoUrl ? (
              <img 
                src={logoUrl} 
                alt={`${title} logo`}
                className="w-8 h-8 object-contain"
              />
            ) : (
              icon
            )}
          </div>
          <h3 className="mb-2 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
          
          {/* Children content (metrics, charts, etc.) */}
          {children && (
            <div className="mt-4">
              {children}
            </div>
          )}
        </div>
        
        {onClick && (
          <div className="mt-4 flex items-center text-sm text-primary font-medium">
            <span className="mr-1">{actionText}</span>
            <ArrowRight className="size-4 transition-all duration-500 group-hover:translate-x-1" />
          </div>
        )}
      </div>
      
      {/* Bottom Gradient */}
      <div className={`absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r ${gradient} blur-2xl transition-all duration-500 group-hover:blur-lg opacity-60`} />
    </motion.div>
  );
};

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

const BentoGrid = ({ children, className }: BentoGridProps) => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};

export { BentoGrid, BentoGridItem };
export type { BentoGridItemProps };