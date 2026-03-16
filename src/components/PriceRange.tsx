interface PriceRangeProps {
  priceRange: string;
}

export default function PriceRange({ priceRange }: PriceRangeProps) {
  const levels = ['$', '$$', '$$$', '$$$$'];
  const currentIndex = levels.indexOf(priceRange);

  return (
    <div className="flex items-center gap-0.5">
      {levels.map((level, i) => (
        <span
          key={level}
          className={`text-sm font-medium ${
            i <= currentIndex ? 'text-gold-400' : 'text-dark-600'
          }`}
        >
          $
        </span>
      ))}
    </div>
  );
}
