"use client";

interface QuickRepliesProps {
  replies: string[];
  onSelect: (reply: string) => void;
  disabled?: boolean;
}

export function QuickReplies({ replies, onSelect, disabled }: QuickRepliesProps) {
  if (!replies || replies.length === 0) return null;

  return (
    <div
      role="group"
      aria-label="Suggestions de questions"
      className="flex gap-2 overflow-x-auto py-2 px-4 no-scrollbar"
    >
      {replies.map((reply, idx) => (
        <button
          key={`${reply}-${idx}`}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(reply)}
          className="shrink-0 rounded-full border border-champagne/50 bg-ivoire px-3 py-1.5 text-xs font-medium text-nuit transition-all duration-200 hover:border-nuit hover:bg-nuit hover:text-ivoire active:scale-95 disabled:pointer-events-none disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-champagne"
        >
          {reply}
        </button>
      ))}
    </div>
  );
}
