import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { PageContainer } from "../pages/styles/PageStyle";
import { BsStarFill, BsClock, BsPeople, BsCardHeading } from "react-icons/bs";
import { PiCookingPot, PiChartDonutLight } from "react-icons/pi";

interface Recipe {
    name: string;
    image: string;
    rating?: number;
    reviewCount?: number;
    difficulty?: string;
    cuisine?: string;
    servings?: number;
    prepTimeMinutes?: number;
    cookTimeMinutes?: number;
    caloriesPerServing?: number;
    ingredients?: string[];
    instructions?: string[];
}

const ListItemDetailsContainer = styled.div`
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    margin-top: 100px;
    position: relative;
    h4 {
        font-size: 20px;
        padding: 10px 0 15px;
    }
`;

const RecipeImage = styled.div`
    width: 300px;
    height: 300px;
    border-radius: 8px;
    margin-bottom: 20px;
    position: absolute;
    right: 10px;
    img {
        border-radius: 50%;
        width: 100%;
        width: 100%;
    }
`;

const RecipeTitle = styled.h5`
    margin-bottom: 10px;
`;

const RecipeInfo = styled.div`
    display: grid;
    margin-bottom: 20px;
    gap: 10px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const InfoMainContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const InfoSubContent = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`;

const ReviewWrap = styled.div`
    flex-grow: 1;
`;

const RecipeType = styled.div`
    flex-grow: 1;
`;

const InfoCard = styled.div`
    border-radius: 8px;
    padding: 10px 20px;
    text-align: center;
    border: 1px solid #ffffff;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
`;

const InfoIcon = styled.div`
    font-size: 24px;
    margin-bottom: 5px;
`;

const IngredientsList = styled.ul`
    list-style-type: circle;
    list-style-position: inside;
    padding: 0;
    li {
        font-size: 14px;
        padding-bottom: 8px;
    }
`;

const InstructionList = styled.ol`
    list-style-position: inside;
    padding: 0;
    li {
        font-size: 14px;
        padding-bottom: 8px;
    }
`;

const ListItemDetails: React.FC = () => {
    const location = useLocation();
    const recipe: Recipe | undefined = location.state && location.state.recipe;

    if (!recipe) return <div>Recipe not found</div>;

    return (
        <PageContainer className="recipe-detail-container">
            <ListItemDetailsContainer>
                <InfoMainContent>
                    <RecipeImage>
                        <img src={recipe.image || ""} alt={recipe.name} />
                    </RecipeImage>
                    <RecipeTitle>{recipe.name}</RecipeTitle>
                </InfoMainContent>
                <InfoSubContent>
                    <ReviewWrap>
                        <InfoCard>
                            <InfoIcon>
                                <BsStarFill />
                            </InfoIcon>
                            <p>
                                Rating:{" "}
                                {recipe.rating ? (
                                    <>
                                        {recipe.rating}{" "}
                                        <span>
                                            ({recipe.reviewCount || 0} reviews)
                                        </span>
                                    </>
                                ) : (
                                    "N/A"
                                )}
                            </p>
                        </InfoCard>
                    </ReviewWrap>
                    <RecipeType>
                        <InfoCard>
                            <InfoIcon>
                                <BsCardHeading />
                            </InfoIcon>
                            <p>Difficulty: {recipe.difficulty || "N/A"}</p>
                            <p>Cuisine: {recipe.cuisine || "N/A"}</p>
                        </InfoCard>
                    </RecipeType>
                </InfoSubContent>
                <RecipeInfo>
                    <InfoCard>
                        <InfoIcon>
                            <BsPeople />
                        </InfoIcon>
                        <p>Servings</p> <p>{recipe.servings || "N/A"}</p>
                    </InfoCard>
                    <InfoCard>
                        <InfoIcon>
                            <BsClock />
                        </InfoIcon>
                        <p>Prep Time</p>{" "}
                        <p>
                            {recipe.prepTimeMinutes
                                ? recipe.prepTimeMinutes + " minutes"
                                : "N/A"}
                        </p>
                    </InfoCard>
                    <InfoCard>
                        <InfoIcon>
                            <PiCookingPot />
                        </InfoIcon>
                        <p>Cook Time</p>{" "}
                        <p>
                            {recipe.cookTimeMinutes
                                ? recipe.cookTimeMinutes + " minutes"
                                : "N/A"}
                        </p>
                    </InfoCard>
                    <InfoCard>
                        <InfoIcon>
                            <PiChartDonutLight />
                        </InfoIcon>
                        <p>Calories</p>{" "}
                        <p>{recipe.caloriesPerServing + " kcal" || "N/A"}</p>
                    </InfoCard>
                </RecipeInfo>
                <h4>Ingredients</h4>
                <IngredientsList>
                    {recipe.ingredients &&
                        recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                </IngredientsList>
                <h4>Instructions</h4>
                <InstructionList>
                    {recipe.instructions &&
                        recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                </InstructionList>
            </ListItemDetailsContainer>
        </PageContainer>
    );
};

export default ListItemDetails;