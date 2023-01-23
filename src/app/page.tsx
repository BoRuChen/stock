import stockData from 'mockData/stock.json';
import { ChartContainer } from '@/components/chart/ChartContainer/ChartContainer';
import Stock from '@/components/chart/Stock/Stock';

export default function Home() {
	return (
		<div className={'container mx-auto'}>
			<div className={'w-full h-[300px]'}>
				<ChartContainer>
					<Stock stockData={stockData} />
				</ChartContainer>
			</div>
		</div>
	);
}
