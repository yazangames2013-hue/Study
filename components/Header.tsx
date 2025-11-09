import React from 'react';

// Star icon to represent points
const StarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);


interface HeaderProps {
    points: number;
}

const Header: React.FC<HeaderProps> = ({ points }) => {
  return (
    <header className="bg-card shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
          منجز المهام الدراسي
        </h1>
        <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 font-bold px-4 py-2 rounded-full">
          <StarIcon className="h-6 w-6 text-yellow-500" />
          <span>{points}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
