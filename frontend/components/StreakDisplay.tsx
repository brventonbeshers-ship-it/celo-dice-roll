"use client";
export default function StreakDisplay({ streak }: { streak: number }) {
  if (streak < 2) return null;
  return <div className="text-center text-green-400 font-bold text-lg animate-bounce">{streak}x Lucky Streak!</div>;
}
