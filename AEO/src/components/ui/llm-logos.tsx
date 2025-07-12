import React from 'react';
import { cn } from '@/lib/utils';

// Import SVG logos as URLs
import OpenAILogo from './Logos Llm/openai.svg?url';
import ClaudeLogo from './Logos Llm/claude-color.svg?url';
import GeminiLogo from './Logos Llm/gemini-color.svg?url';
import PerplexityLogo from './Logos Llm/perplexity-color.svg?url';
import DeepSeekLogo from './Logos Llm/deepseek-color.svg?url';

interface LLMLogoProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Map LLM names to their respective logos
const logoMap = {
  'ChatGPT': OpenAILogo,
  'OpenAI': OpenAILogo,
  'Claude': ClaudeLogo,
  'Gemini': GeminiLogo,
  'Perplexity': PerplexityLogo,
  'DeepSpeak': DeepSeekLogo,
  'DeepSeek': DeepSeekLogo,
  'You.com': GeminiLogo, // Fallback to Gemini for You.com since we don't have their logo
};

const sizeClasses = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export const LLMLogo: React.FC<LLMLogoProps> = ({ 
  name, 
  size = 'md', 
  className 
}) => {
  const LogoComponent = logoMap[name as keyof typeof logoMap];
  
  if (!LogoComponent) {
    // Fallback to a simple circle with initials if logo not found
    return (
      <div 
        className={cn(
          'rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-xs',
          sizeClasses[size],
          className
        )}
      >
        {name.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <img
      src={LogoComponent}
      alt={`${name} logo`}
      className={cn(
        'object-contain',
        sizeClasses[size],
        className
      )}
    />
  );
};

// Component for displaying logo with name
export const LLMLogoWithName: React.FC<LLMLogoProps & { showName?: boolean }> = ({ 
  name, 
  size = 'md', 
  className,
  showName = true 
}) => {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <LLMLogo name={name} size={size} />
      {showName && (
        <span className="font-medium text-foreground">{name}</span>
      )}
    </div>
  );
};

// Helper function to get logo component for dynamic usage
export const getLLMLogoComponent = (name: string) => {
  return logoMap[name as keyof typeof logoMap];
};

// Export individual logos for direct import
export {
  OpenAILogo,
  ClaudeLogo,
  GeminiLogo,
  PerplexityLogo,
  DeepSeekLogo,
};

export default LLMLogo;