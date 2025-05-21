import React from "react";

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = "" }) => {
  return (
    <div className={`bg-gray-200 animate-pulse rounded ${className}`} />
  );
};

export default Skeleton;
