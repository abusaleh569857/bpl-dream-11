import React from "react";
import { FaFlag } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";

export default function Players({ player, handleChoicePlayer }) {
  return (
    <div className=" border-2 p-5 rounded-xl">
      <div className=" w- full h-[300px]">
        <img
          className=" w-full h-full rounded-xl object-cover"
          src={player.img}
          alt=""
        />
      </div>
      {/* cover image end */}
      <div className=" flex gap-3 items-center py-3">
        <div className=" my-2 text-xl">
          <FaUser />
        </div>
        <div>
          <h2 className=" text-2xl font-bold">{player.name}</h2>
        </div>
      </div>
      {/* profile image and name end */}
      <div className=" flex justify-between items-center">
        <div className=" flex gap-1 items-center text-gray-500">
          <span>
            <FaFlag />
          </span>
          <span className=" font-semibold">{player.country}</span>
        </div>
        <div className=" font-medium py-2 px-5 bg-gray-100 rounded-lg">
          {player.position}
        </div>
      </div>
      <div className=" text-xl my-2">
        <hr />
      </div>
      <h3 className=" font-bold text-lg">Rating</h3>
      <div className=" flex gap-3 items-center justify-between my-3">
        <span className=" text-lg font-semibold">{player.battingHands}</span>
        <p className=" text-lg text-gray-400">{player.skill}</p>
      </div>
      <div className=" flex items-center gap-3 justify-between">
        <p className=" text-lg font-semibold">Price: ${player.price}</p>
        <button
          onClick={() => handleChoicePlayer(player)}
          className=" border-2 font-semibold py-2 px-5 hover:bg-lime-300 rounded-lg"
        >
          Choose Player
        </button>
      </div>
      {/* down main div */}
    </div>
  );
}
