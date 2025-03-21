import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "../store/store";
import BarChartComponent from "../components/dashboard/BarChart";
import PieChartComponent from "../components/dashboard/PieChart";
import LineChartComponent from "../components/dashboard/LineChart";
import CatCard from "../components/dashboard/CatCard";
import { useGetBreedsQuery } from "../services/catsService";
import Filters from "../components/dashboard/Filters";


type OriginData = {
	name: string;
	value: number;
  };
  

const HomePage = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAppSelector(
    (state: any) => state.auth.isAuthenticated
  );
  const { data: cats, error, isLoading } = useGetBreedsQuery();

  const [sort, setSort] = useState<"name" | "affection_level" | "adaptability" | "life_span">("name");
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [isAuthenticated, navigate]);

  if (isLoading)
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  if (error)
    return (
      <div className="container mx-auto px-4 py-8">Error loading cat data</div>
    );
  if (!cats)
    return (
      <div className="container mx-auto px-4 py-8">No cat data available</div>
    );

  const getAverageLifeSpan = (lifeSpan: string) => {
    const [min, max] = lifeSpan.split(" - ").map(Number);
    return (min + max) / 2;
  };

  const adaptabilityData = cats.map((cat) => ({
    name: cat.name,
    value: cat.adaptability,
  }));

  const affectionData = cats.map((cat) => ({
    name: cat.name,
    value: cat.affection_level,
  }));

  const originData = cats.reduce<OriginData[]>((acc, cat) => {
	const origin = cat.origin || "Unknown";
	const existingOrigin = acc.find((item) => item.name === origin);
  
	if (existingOrigin) {
	  existingOrigin.value += 1;
	} else {
	  acc.push({ name: origin, value: 1 });
	}
  
	return acc;
  }, []);

  const indoorData = [
    {
      name: "Indoor",
      value: cats.filter((cat) => cat.indoor === 1).length,
    },
    {
      name: "Outdoor",
      value: cats.filter((cat) => cat.indoor !== 1).length,
    },
  ];

  const lapData = [
    {
      name: "Lap Cat",
      value: cats.filter((cat) => cat.lap === 1).length,
    },
    {
      name: "Not Lap Cat",
      value: cats.filter((cat) => cat.lap !== 1).length,
    },
  ];

  const lifeSpanData = cats.map((cat) => ({
    name: cat.name,
    years: getAverageLifeSpan(cat.life_span),
  }));

  const sortedCats = [...cats].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);

    if (sort === "life_span") {
      return getAverageLifeSpan(a.life_span) - getAverageLifeSpan(b.life_span);
    }
    return a[sort] - b[sort];
  });

  const filteredCats = sortedCats?.filter((cat) =>
    cat.origin.toLowerCase().startsWith(filter.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Cat Breeds Statistics</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <BarChartComponent
          title="Adaptability Distribution"
          data={adaptabilityData}
          color="#0088FE"
        />
        <BarChartComponent
          title="Affection Levels"
          data={affectionData}
          color="#00C49F"
        />
        <PieChartComponent title="Top Origins" data={originData} />
        <PieChartComponent
          title="Indoor vs Outdoor Preference"
          data={indoorData}
        />
        <PieChartComponent title="Lap Cat Distribution" data={lapData} />
        <LineChartComponent
          title="Life Span Distribution"
          data={lifeSpanData}
        />
      </div>

      <Filters onSortChange={setSort} onFilterChange={setFilter} />

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCats.map((cat) => (
          <CatCard key={cat.name} cat={cat} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
