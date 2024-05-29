import { MapPinIcon } from "@heroicons/react/24/outline";
import React from "react";
import Button from "../../components/Button/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSingleCenter } from "../../api/productionCenters";

const CenterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { status, error, data } = useQuery({
    queryKey: ["centers", parseInt(id)],
    queryFn: () => getSingleCenter(id),
  });

  if (status === "loading") return <h1>Loading</h1>;

  if (status === "error") return <h1>{error}</h1>;

  const { center } = data;

  return (
    <React.Fragment>
      <img
        className="w-full object-contain"
        src="/images/center/mirpur.jpg"
        alt="Center Image"
      />
      <div className="container py-6">
        <div className="flex justify-between">
          <div>
            <h1 className="heading">Alkubra Production center {center.name}</h1>
            <p className="flex">
              <MapPinIcon className="h-4 w-4 mr-2" />
              <span className="text-gray-500">{center.name}</span>
            </p>
          </div>
          <div>
            <Button
              text={"Apply for Workshop"}
              onClick={() => navigate("/apply-for-workshop")}
            />
          </div>
        </div>
        <div className="my-4">
          <p>{center.description}</p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CenterDetails;
