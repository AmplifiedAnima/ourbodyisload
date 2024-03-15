import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { HeaderWithoutSearch } from "../../HeaderComponent/HeaderWithoutSearch";
import { ExerciseBlueprintsInterface } from "../../../../interfaces/Exercise.interface";
import { useParams } from "react-router-dom";

export const ExerciseIdContainer: React.FC = () => {
  const [data, setData] = useState<ExerciseBlueprintsInterface>();
  const [functionFinishing, setFunctionFinishing] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchOfferData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/exercises/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            setData(data);

            console.log(data);
          } else {
            console.log(`error fetching `);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchOfferData();
      setFunctionFinishing(true);
    }
  }, [id]);

  return (
    <>
      <HeaderWithoutSearch />
      {data && functionFinishing ? (
        <>
          <Typography variant="h5">{data!.name}</Typography>
          <Typography variant="body2">
            movement pattern - {data!.movementPattern}
          </Typography>
          <Typography variant="body2">movement type - {data!.type}</Typography>
          <Typography variant="body2">{data!._id}</Typography>
        </>
      ) : (
        "Loading animation "
      )}
    </>
  );
};
