import TrainingCard from "./TrainingCard";
import type { TrainingCategory } from "@/data/trainingData";

interface TrainingGridProps {
  categories: TrainingCategory[];
}

export default function TrainingGrid({ categories }: TrainingGridProps) {
  return (
    <section aria-label="Training categories">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        role="list"
      >
        {categories.map((category, index) => (
          <div key={category.slug} role="listitem">
            <TrainingCard category={category} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
