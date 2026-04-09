type Props = {
  nutrients: {
    code: string;
    name: string;
    value: number;
    unit: string;
  }[];
};

export function MacrosBlock({ nutrients }: Props) {
  function find(code: string) {
    return nutrients.find((n) => n.code === code)?.value ?? 0;
  }

  return (
    <div className="grid grid-cols-2 gap-3 text-center">
      <Macro label="Калорії" value={find("energy_kcal")} unit="kcal" />
      <Macro label="Білки" value={find("protein")} unit="г" />
      <Macro label="Жири" value={find("fat")} unit="г" />
      <Macro label="Вуглеводи" value={find("carbohydrates")} unit="г" />
    </div>
  );
}

function Macro({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) {
  return (
    <div className="rounded border p-3">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-lg font-semibold">
        {value.toFixed(1)} {unit}
      </div>
    </div>
  );
}
