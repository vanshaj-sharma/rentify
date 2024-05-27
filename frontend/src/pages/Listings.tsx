import { Appbar } from "../components/AppBar";
import { ListingCard } from "../components/ListingCard";
import { useBuildings } from "../hooks";

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
          {buildings.map((build: any) => (
            <ListingCard
              key={build.id}
              id={build.id}
              builtYear={build.builtYear}
              price={build.price}
              address={build.address}
              place={build.place}
              amenities={build.amenities}
              sellerName={build.owner.firstname}
              description={build.description}
              propertyType={build.propertyType}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
