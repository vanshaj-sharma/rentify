// import { Blog } from "../hooks";
import { Appbar } from "./AppBar";
import { Avatar } from "./ListingCard";

export const ListingFullInfo = () => {
  return (
    <div>
      <Appbar
      // name={name}
      />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 pt-200 w-full max-w-screen-2xl pt-12">
          <div className=" col-span-8">
            <div className="text-5xl font-extrabold">
              {/* {blog.title} */} Address of property
            </div>
            <div className="text-slate-500 pt-2">
              Posted on 2nd December 2023
              {/* add year here */}
            </div>
            <div className="pt-4">
              {/* {blog.content} */}
              add address of property
            </div>
            <div className="pt-4">
              {/* {blog.content} */}
              add place of property
            </div>
            <div className="pt-4">
              {/* {blog.content} */}
              Number of bathrooms and number of bedrooms
            </div>
            <div className="pt-4">
              {/* {blog.content} */}
              add info on amenties, and also property type
            </div>

            <div className="pt-4 text-xl font-bold">
              {/* {blog.content} */}
              add price of property
            </div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg font-semibold">
              Owner/Seller
            </div>
            <div className="flex w-full">
              <div className="pr-4 flex flex-col justify-center ">
                <Avatar name={"Anonymous"} size="big" />
              </div>
              <div>
                <div className="text-xl font-bold">{"Anonymous"}</div>
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
