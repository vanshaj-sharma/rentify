import { Link } from "react-router-dom";

// interface ListingCardProps {
//   authorName: string;
//   title: string;
//   content: string;
//   publishedDate: string;
//   id: string;
// }

export const ListingCard = () => {
  return (
    // <Link to={`/blog/${id}`}>
    <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
      <div className="flex">
        <div className="font-extralight pl-2 flex justify-center flex-col text-sm">
          {/* {authorName} */}
          SellerName
        </div>
        <div className=" flex justify-center flex-col pl-2  text-sm">
          <Circle />
        </div>
        <div className="pl-2 font-extralight text-slate-500 text-sm flex justify-center flex-col ">
          {/* {publishedDate} */}
          builtYear
        </div>
      </div>
      <div className="text-xl font-semibold pt-2">{/* {title} */}Place</div>
      <div className="text-md font-thin">
        {/* {content.slice(0, 100) + "......"} */} add Address here
      </div>
      <div className="text-slate-500 text-sm font-thin pt-4">
        {/* {`${Math.ceil(
          content.length / 100
        )} 
        minute(s) read`} */}
        price here
      </div>
      {/* </Link> */}
    </div>
  );
};

export function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-400"></div>;
}

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        size === `small` ? "w-6 h-6" : "w-10 h-10"
      } overflow-hidden bg-gray-100 rounded-full`}
    >
      <span
        className={`${
          size === `small` ? "text-xs" : "text-md"
        } font-extralight text-gray-600  `}
      >
        {name[0]}
      </span>
    </div>
  );
}
