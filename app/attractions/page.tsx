"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import FilterBar from "@components/FilterBar/FilterBar";
import AttractionCard from "@components/AttractionCard";
import { attractionsFilter } from "./attractionsFilter";
import { IAttraction } from "@models/attraction";
import { AuthProvider } from "@/context/AuthContext"; // Ensure this path is correct

import ThreeDotsWave from "@components/ThreeDotsLoading";
import AddAttractionForm from "@components/AddAttractionForm";
import Modal from "@components/Modal"; // Ensure the path is correct

const Attractions: React.FC = () => {
  const { data: session } = useSession();
  const [filteredData, setFilteredData] = useState<IAttraction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/attraction/getAttraction");
        if (!res.ok) {
          throw new Error(`HTTP status ${res.status}`);
        }
        const result = await res.json();
        setFilteredData(result.attractions);
        setLoading(false);

        const attractionTypes: string[] = Array.from(
          new Set(
            result.attractions
              .map((attraction: IAttraction) => attraction.types)
              .flat()
          )
        );
        attractionsFilter[2].selections = attractionTypes.filter(
          (type) => type && type.trim() !== ""
        );
      } catch (error) {
        console.error("Failed to fetch attractions:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDataChange = (newData: IAttraction[]) => {
    setFilteredData(newData);
  };

  if (loading) return <ThreeDotsWave />;
  if (!filteredData.length) return <div>No attractions available</div>;

  return (
    <AuthProvider>
      <FilterBar
        options={attractionsFilter}
        data={filteredData}
        onDataChange={handleDataChange}
      />
      {session?.user && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded my-4"
        >
          Add Attraction
        </button>
      )}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddAttractionForm onClose={() => setIsModalOpen(false)} />
      </Modal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {filteredData.map((attraction: IAttraction, index: number) => (
          <AttractionCard key={attraction.title + index} item={attraction} />
        ))}
      </div>
    </AuthProvider>
  );
};

export default Attractions;
