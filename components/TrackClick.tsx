"use client";
import { track } from "@/lib/track";

interface Props {
  event: string;
  properties?: Record<string, unknown>;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: "div" | "span";
}

export default function TrackClick({ event, properties, children, className, style, as: Tag = "div" }: Props) {
  return (
    <Tag
      className={className}
      style={{ display: "contents", ...style }}
      onClick={() => track(event, properties)}
    >
      {children}
    </Tag>
  );
}
