import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";

function E_com_head({ icon, num, per, title }) {
  return (
    <>
      <div className="h-40 relative bg-neutral-800 border-1 rounded-xl">
        <div className="px-5 py-1">
          <div className="flex pb-8">
            <FontAwesomeIcon
              icon={icon}
              className="w-8 h-8 bg-neutral-900/70 opacity-90 py-3 px-1 rounded-full  mt-2"
            />
            <div className="absolute top-5 right-5">
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className="w-5 h-5 text-white/70 cursor-pointer"
              />
            </div>
            <div></div>
          </div>
          <div className="flex items-center">
            <div className="text-2xl font-bold">{num}</div>
            <div className="text-xs bg-green-600 rounded-xl ml-5 px-2 py-[1px] mt-1 flex items-center justify-center">
              {per}
            </div>
          </div>

          <div className="text-slate-700 ">{title}</div>
        </div>
      </div>
    </>
  );
}

export default E_com_head;
