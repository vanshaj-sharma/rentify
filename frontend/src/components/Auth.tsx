import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    userType: "",
    phonenumber: "",
  });
  const navigate = useNavigate();
  async function sendRequest() {
    try {
      const { firstname, lastname, userType, ...rest } = postInputs;
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`,
        type === "signup" ? postInputs : rest
      );
      console.log("workin");
      const jwt = response.data.jwt;
      // console.log(jwt);
      localStorage.setItem("token", jwt);
      // console.log(jwt);
      navigate("/listings");
    } catch (error) {
      //alert user req failed
      alert("errror " + error);
      console.log();
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className=" text-3xl font-extrabold">
              {type === "signup" ? "Create an account" : "Log In to Account"}
            </div>
            <div className="text-slate-400">
              {type === "signup"
                ? "Already Have an account?"
                : "Don't Have an account"}
              <Link
                to={type === "signup" ? "/signin" : "/signup"}
                className="pl-1 underline"
              >
                {type === "signup" ? "Login" : "Sign Up"}
              </Link>
            </div>
          </div>
          <div className="pt-4">
            {type === "signup" ? (
              <LabelledInput
                label="First Name"
                placeholder="Enter First Name here"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    firstName: e.target.value,
                  });
                }}
              />
            ) : null}

            {type === "signup" ? (
              <LabelledInput
                label="Last Name"
                placeholder="Enter Last Name here"
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    lastname: e.target.value,
                  });
                }}
              />
            ) : null}

            {type === "signup" ? (
              <LabelledInput
                label="Phone Number"
                placeholder="Enter Phone Number here"
                // type={"number"}
                onChange={(e) => {
                  setPostInputs({
                    ...postInputs,
                    phonenumber: e.target.value,
                  });
                }}
              />
            ) : null}

            <LabelledInput
              label="Email"
              placeholder="Enter Email here"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  email: e.target.value,
                });
              }}
            />
            <LabelledInput
              label="Password"
              type={"password"}
              placeholder="Enter Password here"
              onChange={(e) => {
                setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                });
              }}
            />
            {type === "signup" ? (
              <div className="pt-4">
                <div className="flex items-center mb-4">
                  <input
                    onChange={(e) => {
                      setPostInputs({
                        ...postInputs,
                        userType: e.target.value,
                      });
                    }}
                    id="default-radio-1"
                    type="radio"
                    value="seller"
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900 ">
                    Seller
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={(e) => {
                      setPostInputs({
                        ...postInputs,
                        userType: e.target.value,
                      });
                    }}
                    id="default-radio-2"
                    type="radio"
                    value="buyer"
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                  />
                  <label className="ms-2 text-sm font-medium text-gray-900 ">
                    Buyer
                  </label>
                </div>
              </div>
            ) : null}

            <button
              onClick={sendRequest}
              type="button"
              className=" w-full mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {type === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

//add on change
interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const LabelledInput = ({
  label,
  placeholder,
  onChange,
  type,
}: LabelledInputType) => {
  return (
    <div>
      <label className="block mb-2 text-md font-bold text-black pt-4">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
};

// interface RadioButton {
//   onChange: e;
// }

// const RadioButton = (onChange) => {
//   return (
//     <div className="pt-4">
//       <div className="flex items-center mb-4">
//         <input
//           id="default-radio-1"
//           type="radio"
//           value=""
//           name="default-radio"
//           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
//         />
//         <label className="ms-2 text-sm font-medium text-gray-900 ">
//           Seller
//         </label>
//       </div>
//       <div className="flex items-center">
//         <input
//           onChange={onChange}
//           id="default-radio-2"
//           type="radio"
//           value="buyer"
//           name="default-radio"
//           className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
//         />
//         <label className="ms-2 text-sm font-medium text-gray-900 ">Buyer</label>
//       </div>
//     </div>
//   );
// };
