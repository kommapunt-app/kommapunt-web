interface CompareProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  className?: string;
}

export function CompareProgress({
  currentQuestion,
  totalQuestions,
  className = "",
}: CompareProgressProps) {
  const progress =
    totalQuestions > 0
      ? Math.min((currentQuestion / totalQuestions) * 100, 100)
      : 0;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <p className="text-sm font-bold sm:text-base">
        <span className="text-komma-pink">Vraag {currentQuestion}</span>
        <span className="text-komma-black/60"> van {totalQuestions}</span>
      </p>
      <div className="h-2.5 overflow-hidden rounded-full border-2 border-komma-black bg-white">
        <div
          className="h-full rounded-full bg-komma-pink transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
