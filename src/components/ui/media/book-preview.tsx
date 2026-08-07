import Image, { type ImageProps } from "next/image";
import type { CSSProperties } from "react";
import { theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface BookPreviewProps extends Pick<ImageProps, "src" | "alt" | "width" | "height" | "sizes" | "priority" | "quality" | "loading" | "placeholder" | "blurDataURL" | "unoptimized"> {
	perspective?: boolean;
 	className?: string;
 	style?: CSSProperties;
}

export function BookPreview({ perspective = true, className, style, alt, ...props }: BookPreviewProps) {
	return (
		<div className={cn("relative", perspective && "[perspective:1400px]", className)} style={style}>
			<div className={cn("overflow-hidden border border-[var(--color-border-soft)] bg-[var(--color-surface-primary)] shadow-[var(--shadow-floating)]", perspective && "[transform:rotateY(-10deg)_rotateX(2deg)]")} style={{ borderRadius: theme.frames.radius }}>
				<Image alt={alt} className="h-full w-full object-cover" {...props} />
			</div>
		</div>
	);
}