import { useParams } from "react-router-dom";
import { ListingFullInfo } from "../components/ListingFullInfo";
import { useBuilding } from "../hooks";

export const Propertyinfo = () => {
  const { id } = useParams();
  const { loading, property }: { loading: boolean; property: any } =
    useBuilding({
      id: id || "",
    });

  if (loading || !property) {
    return <div>Loading..</div>;
  }

  return (
    <div>
      <ListingFullInfo
        id={property.id}
        sellerName={property.owner.firstname}
        address={property.address}
        builtYear={property.builtYear}
        description={property.descr}
        place={property.place}
        numberOfBathrooms={property.numberOfBathrooms}
        numberOfBedrooms={property.numberOfBedrooms}
        amenities={property.amenities}
        price={property.price}
        propertyType={property.propertyType}
        nearbyColleges={property.nearbyColleges}
        nearbyHospitals={property.nearbyHospitals}
      />
    </div>
  );
};
