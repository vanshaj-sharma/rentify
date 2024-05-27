import { useEffect, useState } from "react";
import { Avatar } from "./ListingCard";
import { Link } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Appbar = ({
  publish,
  name,
}: {
  publish?: boolean;
  name?: string;
}) => {
  //get if seller or buyer
  const [userType, setUserType] = useState<string>("");
  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user/buyerorseller`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUserType(res.data.userType);
      });
  }, []);
  console.log("name " + userType);
  // setUserType("buyer");

  return (
    <div className="border-b flex justify-between px-10 py-4">
      <Link
        to={`/listings`}
        className="flex flex-col justify-center cursor-pointer"
      >
        Rentify
      </Link>

      <div>
        <Link to={`/`}>
          <button
            type="button"
            className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
          >
            Sign Out
          </button>
        </Link>
        {publish === false || userType === "seller" ? (
          <Link to={`/publish`}>
            <button
              type="button"
              className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
            >
              New
            </button>
          </Link>
        ) : null}
        <Avatar size={"big"} name={name ? name[0] : "A"} />
      </div>
    </div>
  );
};
