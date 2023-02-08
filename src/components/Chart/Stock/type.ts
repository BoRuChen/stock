export interface DataProps {
	symbol: string;
	date: string;
	open: number;
	low: number;
	high: number;
	close: number;
	adjClose: number;
	volume: number;
}

export type StockProps = {
	stockData: DataProps[];
	width?: number;
	height?: number;
	margin?: { top: number; right: number; bottom: number; left: number };
};
