"use client";

type Member = {
  user_id: string;
  first_name: string;
};

type Props = {
  members: Member[];
  selectedUser: string | null;
  onChange: (id: string) => void;
};

export default function MemberSelector({
  members,
  selectedUser,
  onChange,
}: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">👤 Для кого?</label>

      <div className="flex flex-wrap gap-2">
        {members.map((member) => {
          const isActive = selectedUser === member.user_id;

          return (
            <button
              key={member.user_id}
              type="button"
              onClick={() => onChange(member.user_id)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition
                ${
                  isActive
                    ? "bg-purple-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
              `}
            >
              {member.first_name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
