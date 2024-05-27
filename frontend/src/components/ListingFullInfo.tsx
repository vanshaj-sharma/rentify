// import { Blog } from "../hooks";
import { Appbar } from "./AppBar";
import { Avatar } from "./ListingCard";
interface ListingCardItems {
  id: string;
  sellerName: string;
  address?: string;
  place?: string;
  numberOfBedrooms?: number;
  numberOfBathrooms?: number;
  nearbyHospitals?: string;
  nearbyColleges?: string;
  price?: number;
  description?: string;
  propertyType?: string;
  amenities?: string;
  builtYear?: number;
}

export const ListingFullInfo = ({
  sellerName,
  address,
  builtYear,
  description,
  place,
  numberOfBathrooms,
  numberOfBedrooms,
  amenities,
  price,
  propertyType,
}: ListingCardItems) => {
  return (
    <div>
      <Appbar name={sellerName} />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 pt-200 w-full max-w-screen-2xl pt-12">
          <div className=" col-span-8">
            <div className="text-5xl font-extrabold">{address}</div>
            <div className="text-slate-500 pt-2">
              {`${propertyType}, This property was built on ${builtYear}`}
            </div>
            <div className="pt-4">{place}</div>
            <div className="pt-4">{`Description goes here ${description}`}</div>
            <div className="pt-4">
              {`This property has ${numberOfBedrooms} of bedrooms with ${numberOfBathrooms} bathrooms`}
            </div>
            <div className="pt-4">{amenities}</div>

            <div className="pt-4 text-xl font-bold">
              {`Price of property $${price}`}
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg font-semibold"></div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center ">
                <Avatar name={sellerName || "Anonymous"} size="big" />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {sellerName || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random catch phrase to about the Owner, which will catch the
                  user's attension
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
