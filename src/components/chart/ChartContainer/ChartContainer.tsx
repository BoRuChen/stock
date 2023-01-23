'use client';

import { ParentSize } from '@visx/responsive';
import React from 'react';

interface ChartContainerProps {
	children: React.ReactNode;
}

export const ChartContainer: React.FC<ChartContainerProps> = (props) => (
	<ParentSize>
		{({ width, height }) =>
			React.isValidElement(props.children) ? (
				React.cloneElement<any>(props.children, {
					width,
					height,
				})
			) : (
				<div />
			)
		}
	</ParentSize>
);
