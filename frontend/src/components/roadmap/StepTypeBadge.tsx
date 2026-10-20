import { GraduationCap, FileCheck2, Code, ShieldCheck, Flag, Trophy } from "lucide-react";
import { getStepBadge } from "../../data/roadmapTheme";

interface Props {
  detailKind?: string;
  size?: "sm" | "md";
}

export default function StepTypeBadge({ detailKind, size = "sm" }: Props) {
  const config = getStepBadge(detailKind);

  const renderIcon = () => {
    const iconClass = size === "sm" ? "w-3 h-3 shrink-0" : "w-3.5 h-3.5 shrink-0";
    switch (config.iconName) {
      case "exam":
        return <FileCheck2 className={iconClass} />;
      case "course":
        return <GraduationCap className={iconClass} />;
      case "skill":
        return <Code className={iconClass} />;
      case "licence":
        return <ShieldCheck className={iconClass} />;
      case "destination":
        return <Trophy className={iconClass} />;
      case "milestone":
      default:
        return <Flag className={iconClass} />;
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border tracking-normal ${
        config.badgeClass
      } ${size === "sm" ? "text-xs px-2.5 py-0.5" : "text-xs px-3 py-1"}`}
    >
      {renderIcon()}
      <span>{config.label}</span>
    </span>
  );
}
