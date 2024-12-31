import React, { useEffect, useState } from "react";
import Players from "./Components/Players";
import NavLogo from "./assets/images/logo.png";
import LogoFooter from "./assets/images/logo-footer.png";
import BannerImage from "./assets/images/image 1.png";
import Coin from "./assets/images/pngwing.com (4).png";
import { RiDeleteBinLine } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const [players, setPlayers] = useState([]);
  const [styles, setStyles] = useState(true);
  const [money, setMoney] = useState(0);
  const [bestPlayers, setBestPlayers] = useState([]);

  useEffect(() => {
    fetch("PlayersInfo.json")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
      });
  }, []);

  const handleStyles = (style) => {
    setStyles(style);
  };

  const addMoney = (singleMoney) => {
    setMoney(money + singleMoney);
    toast.success(singleMoney + " New Money Added");
  };

  const handleChoicePlayer = (playerInfo) => {
    if (bestPlayers.find((player) => player.name === playerInfo.name)) {
      toast.warning(playerInfo.name + " Already Selected");
    } else if (money < playerInfo.price) {
      toast.warning("Not enough money");
    } else if (bestPlayers.length >= 6) {
      toast.warning("Maximum 6 players can be selected");
    } else {
      const newBestPlayers = [...bestPlayers, playerInfo];
      setBestPlayers(newBestPlayers);
      setMoney(money - playerInfo.price);
      toast.success(playerInfo.name + " Selected");
    }
  };

  const removePlayer = (removingInfo) => {
    const newBestPlayers = bestPlayers.filter(
      (player) => player.name !== removingInfo.name
    );
    setBestPlayers(newBestPlayers);
    setMoney(money + parseInt(removingInfo.price));
    toast.warning(removingInfo.name + " Removed");
  };

  return (
    <>
      <ToastContainer position="top-center" theme="colored" />
      <nav className=" backdrop-blur-md bg-white/45 sticky start-1 top-0 z-50">
        <div className=" w-11/12 flex justify-between items-center py-8 md:container mx-auto">
          <div>
            <img src={NavLogo} alt="NavLogo" />
          </div>
          <div className=" flex justify-between items-center gap-10">
            <span>
              <ul className=" hidden md:flex justify-center items-center">
                <li className=" mr-10 font-semibold cursor-pointer">Home</li>
                <li className=" mr-10 font-semibold cursor-pointer">Fixture</li>
                <li className=" mr-10 font-semibold cursor-pointer">Teams</li>
                <li className=" mr-10 font-semibold cursor-pointer">
                  Schedules
                </li>
              </ul>
            </span>
            <span className=" flex gap-2 items-center border-2 rounded-lg py-2 px-4">
              <span className=" font-bold">{money} Coin</span>
              <div>
                <img width={20} src={Coin} alt="coin" />
              </div>
            </span>
          </div>
        </div>
      </nav>

      <div className=" w-11/12 md:container mx-auto my-10">
        <div className=" bg-black rounded-xl">
          <div className="h-screen w-full rounded-xl flex flex-col justify-center items-center bg-no-repeat bg-cover bg-[url('./assets/images/bg-shadow.png')]">
            <div>
              <img className="w-32 md:w-44 " src={BannerImage} alt="" />
            </div>
            <h2 className=" text-center text-4xl text-white font-semibold my-5 leading-tight">
              Assemble Your Ultimate Dream 11 Cricket Team
            </h2>
            <p className=" text-xl text-gray-200 text-center">
              Beyond Boundaries Beyond Limits
            </p>
            <div className=" border border-lime-400 rounded-xl my-5">
              <button
                onClick={() => addMoney(15000000)}
                className=" py-3 px-4 m-1 bg-lime-300 hover:bg-lime-200 rounded-xl font-semibold"
              >
                Claim Free Credit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* players button section start here now */}
      {/* players button section start here now */}

      <div className=" w-11/12 md:container mx-auto md:flex justify-between items-center py-12">
        <div className=" mb-6 text-4xl font-bold">Available Players</div>
        <div className=" flex flex-col md:flex-row border rounded-xl">
          <button
            onClick={() => handleStyles(true)}
            className={`${
              styles ? "bg-lime-300" : "bg-gray-100"
            } font-semibold py-2 px-5 rounded-tl-md rounded-tr-md md:rounded-tr-none md:rounded-bl-md`}
          >
            Available
          </button>
          <button
            onClick={() => handleStyles(false)}
            className={`${
              styles ? "bg-gray-100" : "bg-lime-300"
            } font-semibold py-2 px-5 rounded-bl-md md:rounded-bl-none md:rounded-tr-md rounded-br-md`}
          >
            Selected ({bestPlayers.length})
          </button>
        </div>
      </div>

      {/* selected all data here */}

      <div
        className={` w-11/12 md:container mx-auto bg-slate-200 mb-10 rounded-md py-2 px-5 ${
          styles ? "hidden" : ""
        }`}
      >
        <h2 className=" text-3xl font-bold py-8">
          Selected Players ({bestPlayers.length}/6)
        </h2>
        {bestPlayers.map((p) => (
          <div key={p.name}>
            <div className=" rounded-md flex my-2 bg-white justify-between py-2 px-2 items-center">
              <div className="flex gap-3 items-center">
                <img
                  className=" w-[50px] h-[50px] object-cover rounded-md"
                  src={p.img}
                  alt=""
                />
                <div>
                  <h2 className=" text-xl font-semibold">{p.name}</h2>
                  <p>{p.battingHands}</p>
                </div>
              </div>
              <div className="text-xl text-red-500 cursor-pointer">
                <span onClick={() => removePlayer(p)}>
                  <RiDeleteBinLine />
                </span>
              </div>
            </div>
          </div>
        ))}
        <div className="flex ">
          <div className=" border-2 border-lime-400 rounded-xl my-5">
            <button
              onClick={() => handleStyles(true)}
              className=" py-3 px-4 m-1 bg-lime-300 hover:bg-lime-500 rounded-xl font-bold"
            >
              Add More Player
            </button>
          </div>
        </div>
      </div>

      <div className=" w-11/12 md:container mx-auto mb-80">
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${
            styles ? "" : "hidden"
          }`}
        >
          {players.map((player, index) => (
            <Players
              key={index}
              handleChoicePlayer={handleChoicePlayer}
              player={player}
            ></Players>
          ))}
        </div>
      </div>

      <footer className=" pb-10 pt-72 bg-gray-800 relative z-10">
        {/* Positional subscribe section start here now */}

        <div className=" w-11/12 md:container mx-auto h-[400px] rounded-lg border-2 mb-20 p-5 absolute center z-20 top-[-200px] left-0 right-0 bottom-0">
          <div className='h-full rounded-lg border w-full flex flex-col bg-blue-50 justify-center items-center bg-no-repeat bg-cover bg-[url("./assets/images/bg-shadow.png")]'>
            <h2 className=" text-4xl font-bold text-center">
              Subscribe to our Newsleter
            </h2>
            <p className=" text-xl text-center my-5">
              Get the latest updates and news right in your inbox!
            </p>
            <div className=" md:px-20 lg:px-72 xl:px-96 md:justify-center md:items-center px-5 w-full grid md:grid-cols-3 ">
              <div className=" w-full md:col-span-2">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="input w-full md:col-span-2 md:rounded-tl-md md:rounded-bl-md rounded-md md:rounded-none border-none md:join-item"
                />
              </div>
              <button className=" mt-3 md:mt-0 rounded-md md:rounded-none md:rounded-tr-md md:rounded-br-md py-2 w-full bg-gradient-to-r from-fuchsia-500 to-yellow-500 font-semibold text-xl">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Positional subscribe section start end now */}
        {/* Positional subscribe section start end now */}

        <div className=" container mx-auto flex justify-center pt-4 pb-10">
          <img src={LogoFooter} alt="footer logo" />
        </div>
        <div className=" lg:flex justify-between w-11/12 md:container mx-auto text-gray-300">
          <nav className=" w-80">
            <h2 className=" text-white text-2xl font-semibold mb-8">
              About Us
            </h2>
            <p>
              We are a passionate team dedicated to providing the best services
              to our customers.
            </p>
          </nav>
          <nav className=" my-6">
            <h6 className="text-white text-2xl font-semibold mb-8">
              Quick Links
            </h6>
            <div className=" w-11/12 mx-auto flex flex-col gap-5">
              <a className="cursor-pointer list-item">Home</a>
              <a className="cursor-pointer list-item">Services</a>
              <a className="cursor-pointer list-item">About</a>
              <a className="cursor-pointer list-item">Contact</a>
            </div>
          </nav>
          <div>
            <h6 className=" text-white text-2xl font-semibold">Newsletter</h6>
            <fieldset className="form-control w-80">
              {/* <label className="label">
                <span className="label-text border-4">
                  Enter your email address
                </span>
              </label> */}
              <div className="join mt-6">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="input input-bordered join-item"
                />
                <button className="btn bg-gradient-to-r from-fuchsia-500 to-yellow-500 join-item">
                  Subscribe
                </button>
              </div>
            </fieldset>
          </div>
        </div>
        <div className=" text-center text-gray-300 mt-10 border-t-2 border-gray-700 pt-10">
          © 2024 Your company. All rights reserved.
        </div>
      </footer>
    </>
  );
}
