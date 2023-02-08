'use client';

import React from 'react';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows } from '@visx/grid';
import { Bar } from '@visx/shape';
import moment from 'moment';
import { DataProps, StockProps } from '@/components/Chart/Stock/type';
import { useTooltip, Tooltip, defaultStyles } from '@visx/tooltip';
import { localPoint } from '@visx/event';

const defaultMargin = { top: 40, right: 30, bottom: 50, left: 40 };

const Stock: React.FC<StockProps> = ({
	stockData,
	width = 0,
	height = 0,
	margin = defaultMargin,
}) => {
	const {
		tooltipData,
		tooltipLeft,
		tooltipTop,
		tooltipOpen,
		showTooltip,
		hideTooltip,
	} = useTooltip<DataProps>();

	const handleMouseOver =
		(data: DataProps) =>
		(
			event:
				| React.TouchEvent<SVGRectElement>
				| React.MouseEvent<SVGRectElement>,
		) => {
			const { x, y } = localPoint(event) || { x: 0 };

			showTooltip({
				tooltipData: data,
				tooltipLeft: x,
				tooltipTop: y,
			});
		};

	const tooltipStyles = {
		...defaultStyles,
		backgroundColor: 'rgba(53,71,125,0.8)',
		color: 'white',
		padding: 12,
	};

	if (width < 10) return null;

	const color = {
		background: '#000',
		grid: '#444444',
		axisLabel: '#fff',
		rise: 'red',
		fall: 'green',
		unchanged: '#fff',
	};

	const getColor = (open: number, close: number): string => {
		if (open > close) {
			return color.fall;
		}
		if (open < close) {
			return color.rise;
		}
		return color.unchanged;
	};

	// bounds
	const xMax = width - margin.left - margin.right;
	const yMax = height - margin.top - margin.bottom;

	const xScale = scaleBand<number>()
		.range([0, xMax])
		.domain(stockData.map((data) => new Date(data.date).valueOf()))
		.padding(0.5);

	const yScale = scaleLinear({
		range: [yMax, 0],
		domain: [
			Math.min(...stockData.map((data) => data.low - 5)),
			Math.max(...stockData.map((data) => data.high + 5)),
		],
		nice: true,
	});

	return (
		<div>
			<svg width={width} height={height}>
				<rect
					x={0}
					y={0}
					width={width}
					height={height}
					fill={color.background}
				/>
				<Group left={margin.left} top={margin.top}>
					<GridRows
						scale={yScale}
						width={xMax}
						height={yMax}
						stroke={color.grid}
					/>
					{/*<GridColumns*/}
					{/*	scale={xScale}*/}
					{/*	width={xMax}*/}
					{/*	height={yMax}*/}
					{/*	stroke={color.grid}*/}
					{/*/>*/}
					<line x1={xMax} x2={xMax} y1={0} y2={yMax} stroke={color.grid} />
					<AxisBottom
						top={yMax}
						scale={xScale}
						tickFormat={(d) => moment(d).format('YYYY/MM/DD')}
						stroke={color.grid}
						tickStroke={color.grid}
						tickLabelProps={() => ({
							fill: color.axisLabel,
							fontSize: 11,
							textAnchor: 'middle',
						})}
					/>
					<AxisLeft
						scale={yScale}
						stroke={color.grid}
						tickStroke={color.grid}
						tickLabelProps={() => ({
							fill: color.axisLabel,
							fontSize: 11,
							textAnchor: 'end',
						})}
					/>

					{stockData.map((data) => {
						const stockColor = getColor(data.open, data.close);

						return (
							<>
								{tooltipData?.date === data.date && (
									<line
										x1={
											(xScale(new Date(data.date).valueOf()) ?? 0) +
											xScale.bandwidth() / 2
										}
										x2={
											(xScale(new Date(data.date).valueOf()) ?? 0) +
											xScale.bandwidth() / 2
										}
										y1={0}
										y2={yMax}
										stroke={'#DFFFDF'}
										pointerEvents='none'
										strokeDasharray='5,2'
									/>
								)}
								<line
									x1={
										(xScale(new Date(data.date).valueOf()) ?? 0) +
										xScale.bandwidth() / 2
									}
									x2={
										(xScale(new Date(data.date).valueOf()) ?? 0) +
										xScale.bandwidth() / 2
									}
									y1={yScale(data.low)}
									y2={yScale(data.high)}
									stroke={stockColor}
								/>
								<Bar
									key={`bar-${data.date}`}
									x={xScale(new Date(data.date).valueOf())}
									y={yScale(data.open)}
									width={xScale.bandwidth()}
									height={
										data.close > data.open
											? yScale(data.open) - yScale(data.close)
											: data.close < data.open
											? yScale(data.close) - yScale(data.open)
											: 1
									}
									fill={stockColor}
								/>
								<Bar
									x={xScale(new Date(data.date).valueOf())}
									y={0}
									width={xScale.bandwidth()}
									height={height}
									fill='transparent'
									rx={14}
									onTouchStart={handleMouseOver(data)}
									onTouchMove={handleMouseOver(data)}
									onMouseMove={handleMouseOver(data)}
									onMouseLeave={hideTooltip}
								/>
							</>
						);
					})}
				</Group>
			</svg>
			{tooltipOpen && (
				<Tooltip
					key={Math.random()}
					style={tooltipStyles}
					top={tooltipTop ?? 0}
					left={tooltipLeft ?? 0}
				>
					<div>日期:{moment(tooltipData?.date).format('YYYY-MM-DD')}</div>
					<div>開盤:{tooltipData?.open}</div>
					<div>收盤:{tooltipData?.close}</div>
					<div>最高:{tooltipData?.high}</div>
					<div>最低:{tooltipData?.low}</div>
				</Tooltip>
			)}
		</div>
	);
};

export default Stock;
