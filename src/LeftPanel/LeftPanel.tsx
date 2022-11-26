import { createRef, FunctionComponent, ReactNode, useEffect } from "react";
import { styles } from "../styles";

export type LeftPanelProps = {
	leftWidth: number | undefined;
	setLeftWidth: (value: number) => void;
	children: ReactNode;
};

export const LeftPanel: FunctionComponent<LeftPanelProps> = ({
	children,
	leftWidth,
	setLeftWidth,
}) => {
	const leftRef = createRef<HTMLDivElement>();

	useEffect(() => {
		if (leftRef.current) {
			if (!leftWidth) {
				setLeftWidth(leftRef.current.clientWidth);
			}
			leftRef.current.style.width = `${leftWidth}px`;
		}
	}, [leftRef]);
	return (
		<div
			style={styles.LeftPanel}
			ref={leftRef}>
			{children}
		</div>
	);
};
