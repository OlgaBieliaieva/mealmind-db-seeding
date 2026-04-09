type Props = {
  nutrients: {
    name: string;
    value: number;
    unit: string;
  }[];
};

export function NutrientsList({ nutrients }: Props) {
  return (
    <div className="space-y-2">
      {nutrients.map((n) => (
        <div
          key={n.name}
          className="flex justify-between text-sm border-b pb-1"
        >
          <span>{n.name}</span>
          <span>
            {n.value.toFixed(1)} {n.unit}
          </span>
        </div>
      ))}
    </div>
  );
}