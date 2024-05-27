import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface BuildingSt {
  address: string;
  place: string;
  numberOfBedrooms: number;
  numberOfBathrooms: number;
  nearbyHospitals: string;
  nearbyColleges: string;
  price: number;
  description: string;
  propertyType: string;
  amenities: string;
  builtYear: number;
}

export const useBuilding = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [property, setProperty] = useState();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/properties/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setProperty(response.data.buildings);
        setLoading(false);
      });
  }, [id]);
  return {
    loading,
    property,
  };
};

export const useBuildings = () => {
  const [loading, setLoading] = useState(true);
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/properties`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBuildings(response.data.buildings);
        setLoading(false);
      });
  }, []);
  return {
    loading,
    buildings,
  };
};
