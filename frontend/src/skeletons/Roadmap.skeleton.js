import React from "react";

const SkeletonLine = ({ width = "w-full" }) => (
  <div className={`h-4 bg-zinc-700 rounded-md ${width} animate-pulse`} />
);

const SkeletonCard = ({ titleWidth = "w-1/3", lines = 4 }) => (
  <div className="space-y-3">
    <SkeletonLine width={titleWidth} />
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} width="w-3/4" />
      ))}
    </div>
  </div>
);

const RoadmapSkeleton = () => {
  return (
    <div className="space-y-6 text-zinc-200 animate-pulse">
      <div className="h-8 w-1/2 bg-purple-800 rounded-lg" />

      <SkeletonCard titleWidth="w-1/4" lines={3} />
      <SkeletonCard titleWidth="w-1/4" lines={2} />
      <SkeletonCard titleWidth="w-1/3" lines={3} />
      <SkeletonCard titleWidth="w-1/4" lines={4} />

      <div className="space-y-3">
        <SkeletonLine width="w-1/3" />
        <SkeletonLine width="w-3/4" />
        <SkeletonLine width="w-2/3" />
        <SkeletonLine width="w-1/2" />
      </div>

      <SkeletonCard titleWidth="w-1/4" lines={3} />
    </div>
  );
};



export default RoadmapSkeleton;
