import React from "react";

function Card({ number, title, type, Icon }) {
  return (
    <div className="rounded-md bg-white p-6 shadow-[0_3px_6px_rgb(0,0,0,0.2)]">
      <div className="flex justify-between gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold">
            {number >= 1e9
              ? (number / 1e9).toFixed(1).replace(/\.0$/, "") + "B"
              : number >= 1e6
                ? (number / 1e6).toFixed(1).replace(/\.0$/, "") + "M"
                : number >= 1e3
                  ? (number / 1e3).toFixed(1).replace(/\.0$/, "") + "k"
                  : number.toString()}
            {type === "money" ? " (VNĐ)" : ""}
          </span>
          <span className="text-sm text-gray-500">{title}</span>
        </div>
        <div className="h-[72px] w-[72px]">{Icon}</div>
      </div>
    </div>
  );
}

export default Card;
