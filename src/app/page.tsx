import stockData from 'mockData/stock.json';
import { ChartContainer } from '@/components/Chart/ChartContainer/ChartContainer';
import Stock from '@/components/Chart/Stock/Stock';

const Home = async (props: any) => {
	return (
		<div className={'w-full h-[300px]'}>
			<ChartContainer>
				<Stock stockData={stockData} />
			</ChartContainer>
		</div>
	);
};

export default Home;
