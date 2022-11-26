import {
	FunctionComponent,
	useEffect,
	useState,
	createRef,
} from "react";
import { LeftPanel } from "../LeftPanel/LeftPanel";
import { styles } from "../styles";

export type SplitViewProps = {
	left: JSX.Element;
	right: JSX.Element;
	defaultLeftPanelWidth: number;
};

const MIN_WIDTH = 50;

export const SplitView: FunctionComponent<SplitViewProps> = ({
	left,
	right,
	defaultLeftPanelWidth,
}) => {
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [leftWidth, setLeftWidth] = useState<number | undefined>(
		defaultLeftPanelWidth
	);
	const [xPosition, setXPosition] = useState<number | undefined>();

	const splitPaneRef = createRef<HTMLDivElement>();

	useEffect(() => {
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);
		return () => {
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		};
	});

	const onMouseUp = () => {
		setIsDragging(false);
	};

	const onMouseMove = (event: any) => {
		if (isDragging && leftWidth && xPosition) {
			const newLeftWidth = leftWidth + event.clientX - xPosition;
			setXPosition(event.clientX);

			if (newLeftWidth < MIN_WIDTH) {
				setLeftWidth(MIN_WIDTH);
				return;
			}

			if (splitPaneRef.current) {
				const splitPaneWidth = splitPaneRef.current.clientWidth;

				if (newLeftWidth > splitPaneWidth - MIN_WIDTH) {
					setLeftWidth(splitPaneWidth - MIN_WIDTH);
					return;
				}
			}

			setLeftWidth(newLeftWidth);
		}
	};

	const onMouseDown = (event: any): void => {
		setXPosition(event.clientX);
		setIsDragging(true);
	};

	return (
		<div
			style={styles.SplitView}
			ref={splitPaneRef}>
			<LeftPanel leftWidth={leftWidth} setLeftWidth={setLeftWidth}>
				{left}
			</LeftPanel>
			<div
				style={styles.DividerHitBox}
				onMouseDown={onMouseDown}>
				<div
					style={styles.Divider}
					onMouseDown={onMouseDown} />
			</div>
			<div
				style={styles.RightPanel}>{right}</div>
		</div>
	);
};
