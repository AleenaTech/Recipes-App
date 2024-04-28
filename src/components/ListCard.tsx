import React, { useState, useEffect } from "react";
import styled from "styled-components";
import fetchData from "../functions/api_get";
import ListCardItem from "./ListCardItem";
import FilterButton from "./FilterButton";

interface Item {
    id: number;
    name: string;
    image: string;
    mealType: string[];
}

interface Props {
    apiUrl: string;
}

const ListContainer = styled.div`
    margin: 20px auto;
    width: 100%;

    h2 {
        text-align: center;
        margin-top: 20px;
        margin-bottom: 50px;
        font-size: 40px;
    }

    .item-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 20px;

        @media (min-width: 576px) {
            grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
            grid-template-columns: repeat(3, 1fr);
        }
        @media (min-width: 992px) {
            grid-template-columns: repeat(4, 1fr);
        }
        @media (min-width: 1700px) {
            grid-template-columns: repeat(5, 1fr);
        }
    }

    .filter-buttons {
        display: flex;
        justify-content: center;
        margin-bottom: 20px;
        gap: 10px;
    }

    .filter-button {
        padding: 8px 16px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #f0f0f0;
        cursor: pointer;

        &:hover {
            background-color: #e0e0e0;
        }
    }

    .filter-button.active {
        background-color: #007bff;
        color: #fff;
    }
`;

const LoadingMessage = styled.div`
    text-align: center;
    font-style: italic;
`;

const ErrorMessage = styled.div`
    color: red;
`;

const ListCard: React.FC<Props> = ({ apiUrl }) => {
    const [data, setData] = useState<Item[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedMealType, setSelectedMealType] = useState<string>("All");

    useEffect(() => {
        async function fetchDataFromAPI() {
            try {
                const responseData = await fetchData(apiUrl);
                setData(responseData?.recipes || []);
            } catch (error) {
                setError("Error fetching data. Please try again later.");
            } finally {
                setLoading(false);
            }
        }
        fetchDataFromAPI();
    }, [apiUrl]);

    // Extract unique meal types
    const mealTypeSet = new Set<string>();
    data.forEach((item) => {
        item.mealType.forEach((type) => mealTypeSet.add(type));
    });
    const uniqueMealTypes = Array.from(mealTypeSet);

    // Filter recipes based on selected meal type
    const filteredData =
        selectedMealType === "All"
            ? data
            : data.filter((item) => item.mealType.includes(selectedMealType));

    const handleFilter = (mealType: string) => {
        setSelectedMealType(mealType);
    };

    if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
    if (error) return <ErrorMessage>{error}</ErrorMessage>;

    const filterButtons = (
        <div className="filter-buttons">
            <FilterButton
                mealType="All"
                active={selectedMealType === "All"}
                onClick={() => handleFilter("All")}
            />
            {uniqueMealTypes.map((mealType, index) => (
                <FilterButton
                    key={index}
                    mealType={mealType}
                    active={selectedMealType === mealType}
                    onClick={() => handleFilter(mealType)}
                />
            ))}
        </div>
    );

    const recipeCards = (
        <div className="item-grid">
            {filteredData.map((item) => (
                <ListCardItem key={item.id} item={item} />
            ))}
        </div>
    );

    return (
        <ListContainer>
            <h2>Recipes</h2>
            {filterButtons}
            {recipeCards}
        </ListContainer>
    );
};

export default ListCard;
