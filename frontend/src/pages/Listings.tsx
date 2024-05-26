import { Appbar } from "../components/AppBar";
import { ListingCard } from "../components/ListingCard";
import { useBuildings, BuildingSt } from "../hooks";

export const Listing = () => {
  const { loading, buildings } = useBuildings();

  if (loading || !buildings) {
    //add skeletons
    return <div>loading</div>;
  }
  return (
    <div>
      <Appbar name={localStorage.getItem("name") || ""} />
      <div className="flex justify-center">
        <div>
          {buildings.map((build) => (
            <ListingCard />
          ))}
        </div>
      </div>
    </div>
  );
};
