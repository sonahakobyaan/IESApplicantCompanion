import { ArrowRight, Bell, FileText, Flag, Sparkles } from "lucide-react";

export function IconFor({ icon }: { icon: string }) {
  const props = { size: 18, strokeWidth: 2 };
  if (icon === "file") return <FileText {...props} />;
  if (icon === "bell") return <Bell {...props} />;
  if (icon === "flag") return <Flag {...props} />;
  if (icon === "arrow") return <ArrowRight {...props} />;
  return <Sparkles {...props} />;
}
