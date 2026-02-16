"use client"

import React from 'react'
import { FaUser } from 'react-icons/fa6';


export default function CreatePostInput() {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-300">
      <div className="flex gap-2">
        <div className="relative w-12 h-12 shrink-0">
          <FaUser
            size={45}
            className="object-cover rounded-full border-2 border-gray-300" /*add user's profile pic here later*/
          />
        </div>
        {/* text bubble area where user's can write, initially only this is visible until user clicks */}
        <div className="flex-1"> 
            <textarea placeholder="Post a new review..." className="bg-gray-300/80 w-full p-2 rounded-2xl outline-none resize-none"/>
        </div>
      </div>
    </div>
  );
}
















// import React from "react";
// import { FaUser } from "react-icons/fa6";

// export default function CreatePostInput() {
//   return (
//     <div className="bg-white p-4 rounded-xl border border-gray-300">
//       <div className="flex gap-2">
//         <div className="relative w-12 h-12 shrink-0">
//           <FaUser
//             size={45}
//             className="object-cover rounded-full border-2 border-gray-300" /*Add user's profile pic here later*/
//           />
//         </div>
//         <div className="flex-1">
//             <textarea placeholder="Post a new review..." className="bg-gray-300/80 w-full p-2 rounded-2xl outline-none resize-none"/>
//         </div>
//       </div>
//     </div>
//   );
// }

{
  /* <Image
    src=""
    alt=""
    fill
    className="object-cover rounded-full border-4 border-gray-400"
/> */
}
