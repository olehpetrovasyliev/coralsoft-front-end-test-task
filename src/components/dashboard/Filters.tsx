import { ChangeEvent, FC, useState } from "react";

interface FiltersProps {
  onSortChange: (
    sort: "name" | "affection_level" | "adaptability" | "life_span"
  ) => void;
  onFilterChange: (filter: string) => void;
}

const Filters: FC<FiltersProps> = ({ onSortChange, onFilterChange }) => {
  const [sort, setSort] = useState<"name" | "affection_level" | "adaptability" | "life_span">("name");
  const [filter, setFilter] = useState("");

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = e.target.value as "name" | "affection_level" | "adaptability" | "life_span";
    setSort(selectedSort);
    onSortChange(selectedSort);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    onFilterChange(e.target.value);
  };

  return (
    <div className="flex flex-wrap space-x-4 mb-4 gap-4">
      <div>
        <label className="block">Sort By</label>
        <select
          onChange={handleSortChange}
          value={sort}
          className="p-2 border rounded"
        >
          <option value="name">Name</option>
          <option value="affection_level">Affection Level</option>
          <option value="adaptability">Adaptability</option>
          <option value="life_span">Life Span</option>
        </select>
      </div>

      <div>
        <label className="block">Filter by Origin</label>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="p-2 border rounded"
          placeholder="Enter breed origin"
        />
      </div>
    </div>
  );
};

export default Filters;
