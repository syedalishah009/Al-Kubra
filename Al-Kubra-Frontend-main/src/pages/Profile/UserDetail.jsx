import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { getMyDetails } from "../../api/user";

const UserDetail = () => {
  const { token } = useSelector((state) => state.user);

  const { status, error, data } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getMyDetails(token),
  });

  if (status === "loading") return <h1>Loading...</h1>;

  if (status === "error") return <h1>Error</h1>;

  console.log("user: ", data);

  const handleImageChange = () => {
    // Logic to handle image change
  };

  return (
    <div>
      <h2 className="heading">User Details</h2>
      <img
        src={
          // data.user.avatar.url
          //   ? data.user.avatar.url
          // :
          "../../images/Profile.png"
        }
        alt="User"
        className="w-32 h-32 rounded-full object-cover cursor-pointer"
        onClick={handleImageChange}
      />
      <p>
        Email: <span className="text-gray-600 ml-2">{data.user.email}</span>
      </p>
      <p>
        Name: <span className="text-gray-600 ml-2">{data.user.name}</span>
      </p>
    </div>
  );
};

export default UserDetail;
