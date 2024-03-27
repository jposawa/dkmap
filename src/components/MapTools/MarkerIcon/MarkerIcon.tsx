import React from "react";

import styles from "./MarkerIcon.module.scss";

export type MarkerIconProps = {
	children?: React.ReactNode;
	color?: string;
	className?: string;
	size?: string;
	style?: React.CSSProperties;
};

export const MarkerIcon: React.FC<MarkerIconProps> = ({
	children,
	className = "",
	color = "#369",
	size = "2rem",
	style = {},
}) => {
	return (
		<div
			className={`${styles.marker} ${className}`}
			style={
				{ ...style, "--color": color, "--size": size } as React.CSSProperties
			}
		>
			{children}
		</div>
	);
};
