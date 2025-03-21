import  { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../store/store";
import BarChartComponent from "../components/dashboard/BarChart";
import PieChartComponent from "../components/dashboard/PieChart";
import LineChartComponent from "../components/dashboard/LineChart";
import CatCard from "../components/dashboard/CatCard";

const HomePage = () => {
	const navigate = useNavigate();
	const isAuthenticated = useAppSelector((state: any) => state.auth.isAuthenticated);
	const [cats, setCats] = useState([
		{
			name: "Coralcat",
			origin: "Ukraine",
			description: "Coralcat is a breed of cat that is known for its long, luxurious fur and expressive eyes.",
			adaptability: 5,
			affectionLevel: 5,
			lifeSpan: 15,
			indoor: 1,
			lap: 1,
		},
	]);

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/sign-in");
		}
	}, [isAuthenticated, navigate]);

	const adaptabilityData = cats.map((cat) => ({ name: cat.name, value: cat.adaptability }));
	const affectionData = cats.map((cat) => ({ name: cat.name, value: cat.affectionLevel }));
	const originData = cats.map((cat) => ({ name: cat.origin || "Unknown", value: 1 }));
	const indoorData = [
		{ name: "Indoor", value: cats.filter((cat) => cat.indoor === 1).length },
		{ name: "Outdoor", value: cats.filter((cat) => cat.indoor !== 1).length },
	];
	const lapData = [
		{ name: "Lap Cat", value: cats.filter((cat) => cat.lap === 1).length },
		{ name: "Not Lap Cat", value: cats.filter((cat) => cat.lap !== 1).length },
	];
	const lifeSpanData = cats.map((cat) => ({ name: cat.name, years: cat.lifeSpan }));

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-4xl font-bold mb-8">Cat Breeds Statistics</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<BarChartComponent title="Adaptability Distribution" data={adaptabilityData} color="#0088FE" />
				<BarChartComponent title="Affection Levels" data={affectionData} color="#00C49F" />
				<PieChartComponent title="Top Origins" data={originData} />
				<PieChartComponent title="Indoor vs Outdoor Preference" data={indoorData} />
				<PieChartComponent title="Lap Cat Distribution" data={lapData} />
				<LineChartComponent title="Life Span Distribution" data={lifeSpanData} />
			</div>

			<div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{cats.map((cat) => (
					<CatCard key={cat.name} cat={cat} />
				))}
			</div>
		</div>
	);
};

export default HomePage;
