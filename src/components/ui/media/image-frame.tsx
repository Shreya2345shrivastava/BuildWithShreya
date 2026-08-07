import Image, { type ImageProps } from "next/image";
import type { CSSProperties } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface ImageFrameProps extends Pick<ImageProps, "src" | "alt" | "width" | "height" | "sizes" | "priority" | "quality" | "loading" | "placeholder" | "blurDataURL" | "unoptimized"> {
	floating?: boolean;
 	className?: string;
 	style?: CSSProperties;
}

export function ImageFrame({ floating = false, className, style, alt, ...props }: ImageFrameProps) {
	return (
		<div
			className={cn(
				"overflow-hidden border border-[var(--color-border-soft)] bg-[var(--color-surface-primary)] shadow-[var(--shadow-card)]",
				floating && "hover-lift",
				className,
			)}
			style={{ borderRadius: theme.frames.radius, ...style }}
		>
			<Image alt={alt} className="h-full w-full object-cover" {...props} />
		</div>
	);
}