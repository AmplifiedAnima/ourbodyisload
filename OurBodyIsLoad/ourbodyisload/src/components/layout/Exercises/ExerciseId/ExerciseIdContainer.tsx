import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { HeaderWithoutSearch } from "../../HeaderComponent/HeaderWithoutSearch";
import { exerciseInterface } from "../../../../interfaces/calendar.interface";
import { useParams } from "react-router-dom";

export const ExerciseIdContainer: React.FC = () => {
  const [data, setData] = useState<exerciseInterface>();
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
          <Typography variant="body2">{data!.sets}</Typography>
          <Typography variant="body2">{data!.reps}</Typography>
          <Typography variant="body2">{data!.intensity}</Typography>
          <Typography variant="body2">{data!._id}</Typography>
        </>
      ) : (
        "Loading animation "
      )}
    </>
  );
};
