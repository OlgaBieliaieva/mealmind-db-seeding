"use client";

type Props = {
  mode: "members" | "meals";
  setMode: (mode: "members" | "meals") => void;
};

export default function ViewToggle({ mode, setMode }: Props) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setMode("members")}
        className={`px-3 py-1 rounded-full text-sm ${
          mode === "members"
            ? "bg-black text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        👥
      </button>

      <button
        onClick={() => setMode("meals")}
        className={`px-3 py-1 rounded-full text-sm ${
          mode === "meals" ? "bg-black text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        🍳
      </button>
    </div>
  );
}
