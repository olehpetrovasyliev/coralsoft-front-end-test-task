import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LineChartComponent = ({ title, data }: any) => {
	return (
		<div className="bg-white p-4 rounded-xl shadow-sm">
			<h2 className="text-xl font-semibold mb-4">{title}</h2>
			<div className="h-[300px]">
				<ResponsiveContainer>
					<LineChart data={data}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Line type="monotone" dataKey="years" stroke="#8884d8" />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default LineChartComponent;
