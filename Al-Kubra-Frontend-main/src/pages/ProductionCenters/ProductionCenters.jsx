import React from "react";
import CenterCard from "../../components/CenterCard/CenterCard";
import { useQuery } from "@tanstack/react-query";
import { getCenters } from "../../api/productionCenters";
import { ProductionCenterSkeletonLoading } from "../../components/SkeletonLoadingComponents/ProductionCenterSkeletonLoading";

const ProductionCenters = () => {
  const { status, error, data } = useQuery({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

  if (status === "loading")
    return (
      <>
        <section className="container flex justify-center">
          <div className="my-8 flex justify-center flex-wrap gap-6">
            <ProductionCenterSkeletonLoading />
            <ProductionCenterSkeletonLoading />
            <ProductionCenterSkeletonLoading />
            <ProductionCenterSkeletonLoading />
          </div>
        </section>
      </>
    );

  if (status === "error") return <h1>{error}</h1>;

  return (
    <React.Fragment>
      <section className="container flex justify-center">
        <div className="my-8 flex justify-center flex-wrap gap-6">
          {data.centers.map((center) => (
            <CenterCard center={center} />
          ))}
        </div>
      </section>
    </React.Fragment>
  );
};

export default ProductionCenters;
