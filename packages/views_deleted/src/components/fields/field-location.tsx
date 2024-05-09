import * as React from "react";
// import { fromLatLng } from "react-geocode";
import { FieldProps, useDocument } from "@melony/core";

export const FieldLocation = ({ field }: { field: FieldProps }) => {
	const { data } = useDocument();

	const value = data?.[field.key];

	//   const renderDirectionsButton = () => {
	//     return (
	//       <div className="hidden group-hover:block absolute right-0">
	//         <Button
	//           tiny
	//           iconStart={<ArrowTopRightOnSquareIcon className="h-3 w-3" />}
	//           onClick={(e) => {
	//             e.stopPropagation();

	//             fromLatLng(value.location[1], value.location[0])
	//               .then(({ results }) => {
	//                 const res = results[0];

	//                 window.open(
	//                   `https://www.google.com/maps/dir/?api=1&destination=${res.formatted_address}&travelmode=driving`
	//                 );
	//               })
	//               .catch(console.error);
	//           }}
	//         ></Button>
	//       </div>
	//     );
	//   };

	return (
		<div className="flex items-center gap-2 min-w-0">
			<span className={"block truncate"}>{value?.address || "-"}</span>

			{/* {renderDirectionsButton()} */}
		</div>
	);
};
