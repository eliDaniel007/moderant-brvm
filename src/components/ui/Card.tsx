import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

interface CardComponent extends React.FC<CardProps> {
  Header: React.FC<CardHeaderProps>;
  Title: React.FC<CardTitleProps>;
  Content: React.FC<CardContentProps>;
}

const Card: CardComponent = ({
  children,
  className = '',
  onClick,
  hover = false,
}) => {
  const baseClasses = 'bg-dark-900/50 backdrop-blur-sm border border-dark-800 rounded-2xl p-6 shadow-xl';
  const hoverClasses = hover ? 'hover:bg-dark-900/70 hover:border-dark-700 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';
  
  const classes = `${baseClasses} ${hoverClasses} ${clickableClass} ${className}`;
  
  return (
    <div className={classes} onClick={onClick}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  );
};

const CardTitle: React.FC<CardTitleProps> = ({ children, className = '' }) => {
  return (
    <h3 className={`text-lg font-semibold text-slate-200 mb-2 ${className}`}>
      {children}
    </h3>
  );
};

const CardContent: React.FC<CardContentProps> = ({ children, className = '' }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Ajouter les sous-composants au composant Card
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export default Card; 