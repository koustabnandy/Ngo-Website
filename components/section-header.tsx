// Create a reusable SectionHeader component
// c:/Users/rajde/OneDrive/Desktop/Frontend/ngo/Ngo-Website/components/section-header.tsx

import React from 'react';

interface SectionHeaderProps {
  title: string;
  highlight?: string;
  description?: string;
}

const SectionHeader = ({ title, highlight, description }: SectionHeaderProps) => {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 font-heading">
        <span className="text-blue-800 dark:text-blue-400">{title}</span>
        {highlight && <span className="text-yellow-500 dark:text-yellow-400"> {highlight}</span>}
      </h2>
      {description && (
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
          {description}
        </p>
      )}
      <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
    </div>
  );
};

export default SectionHeader;
