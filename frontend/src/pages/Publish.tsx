import axios from "axios";
import { Appbar } from "../components/AppBar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    address: "",
    place: "",
    numberOfBedrooms: "",
    numberOfBathrooms: "",
    nearbyHospitals: "",
    nearbyColleges: "",
    price: "",
    description: "",
    propertyType: "",
    amenities: "",
    builtYear: "",
  });
  return (
    <div>
      <Appbar publish={true} />
      <div className="flex justify-center pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            onChange={(e) => {
              setInfo({
                ...info,
                address: e.target.value,
              });
            }}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            placeholder="Write the address here"
          />

          <input
            onChange={(e) => {
              setInfo({
                ...info,
                place: e.target.value,
              });
            }}
            type="text"
            className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            placeholder="Write place here"
          />
          <input
            onChange={(e) => {
              setInfo({
                ...info,
                propertyType: e.target.value,
              });
            }}
            type="text"
            className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            placeholder="Write property type"
          />
          <input
            onChange={(e) => {
              setInfo({
                ...info,
                amenities: e.target.value,
              });
            }}
            type="text"
            className="mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            placeholder="Write about ameneties here"
          />

          <div className="pt-4 grid gap-6 md:grid-cols-4">
            <div>
              <input
                placeholder="Number of Bedrooms"
                type="text"
                onChange={(e) => {
                  setInfo({
                    ...info,
                    numberOfBedrooms: e.target.value,
                  });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <input
                placeholder="Number of Bathrooms"
                type="text"
                onChange={(e) => {
                  setInfo({
                    ...info,
                    numberOfBathrooms: e.target.value,
                  });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <div>
              <input
                placeholder="Price"
                type="text"
                onChange={(e) => {
                  setInfo({
                    ...info,
                    price: e.target.value,
                  });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>

            <div>
              <input
                placeholder="Built in year"
                type="text"
                onChange={(e) => {
                  setInfo({
                    ...info,
                    builtYear: e.target.value,
                  });
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </div>
            <div></div>
          </div>

          <input
            onChange={(e) => {
              setInfo({
                ...info,
                nearbyHospitals: e.target.value,
              });
            }}
            type="text"
            className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            placeholder="Write about nearby hospital"
          />
          <input
            onChange={(e) => {
              setInfo({
                ...info,
                nearbyColleges: e.target.value,
              });
            }}
            type="text"
            className="mt-4 mb- bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
            placeholder="Write about college here"
          />

          <TextEditor
            onChange={(e) => {
              setInfo({
                ...info,
                description: e.target.value,
              });
            }}
          />

          <button
            type="submit"
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/properties`,
                {
                  address: info.address,
                  place: info.place,
                  numberOfBedrooms: info.numberOfBedrooms,
                  numberOfBathrooms: info.numberOfBathrooms,
                  nearbyHospitals: info.nearbyHospitals,
                  nearbyColleges: info.nearbyColleges,
                  price: info.price,
                  description: info.description,
                  propertyType: info.propertyType,
                  amenities: info.amenities,
                  builtYear: info.builtYear,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              navigate(`/Listings/${response.data.id}`);
            }}
            className="mt-4 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish Property
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="mt-2">
      <div className="w-full mb-4 ">
        <div className="flex items-center justify-between border">
          <div className="my-2 bg-white rounded-b-lg w-full">
            {/* <label className="sr-only">Publish post</label> */}
            <textarea
              onChange={onChange}
              id="editor"
              rows={8}
              className="focus:outline-none block w-full px-0 text-sm text-gray-800 bg-white border-0 pl-2"
              placeholder="Write about a description about the place..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
}
