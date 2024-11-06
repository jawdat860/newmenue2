import { FaHeart, FaUser, FaUserMinus } from "react-icons/fa";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import BuyPage from "../Navbar/BuyPage";
import PhoneModel from "./PhoneModel";
import { Link, useNavigate } from "react-router-dom";
import classes from "../Navbar/HeaderCartButton.module.css";
import { useContext, useState } from "react";

import CartContext from "../store/CartContext";
function FooterFlex() {
  const navigate = useNavigate(); // Hook for navigation
  const ctxCart = useContext(CartContext);
  const totalAmount = `${ctxCart.totalAmount} ₽ `;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const numberOfCartItem = ctxCart.items.reduce(
    (curNumber, item) => curNumber + item.amount,
    0
  );
  const numberOfCartItems = ctxCart.itemsFavourite.length;
  const numberOfCartDisItems = ctxCart.itemsDisFavourite.length;
  return (
    <div
      id="genn-FooterFlex-all"
      className="bg-white fixed z-[1000] inset-x-4 bottom-0 h-16 box w-[100%] left-[0] flex justify-around items-center p-2"
    >
      <ul
        id="genn-FooterFlex-list"
        className="flex justify-between w-full gap-[20px] items-center text-white text-2xl"
      >
        <li id="genn-FooterFlex-CartShop" className="flex-[1] ">
          <button
            className={`bg-gradient-to-r flex items-center relative rounded-full w-[100%] justify-center max-h-[36px] from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-2 flex items-center gap-3 ${classes.button}`}
            onClick={() => setIsModalOpen(!isModalOpen)}
          >
            <FaCartShopping
              className={`text-xl      text-white drop-shadow-sm cursor-pointer  `}
            ></FaCartShopping>
            {numberOfCartItem > 0 && (
              <span className={`${classes.badge} text-[17px]`}>
                {numberOfCartItem}
              </span>
            )}
            {numberOfCartItem > 0 ? (
              <span className="text-[20px]">{totalAmount}</span>
            ) : (
              ""
            )}
          </button>
          <BuyPage isOpen={isModalOpen} onClose={setIsModalOpen} />
        </li>

        <li id="genn-FooterFlex-ico-phone" className="px-2">
          <PhoneModel />
        </li>
        <li
          id="genn-FooterFlex-ico-like"
          className="hover:scale-110 transition-transform duration-200 cursor-pointer relative px-2"
          // Navigate to home page when clicked
        >
          <Link to="/like">
            <BiSolidLike className="text-black " />
          </Link>
          {numberOfCartItems > 0 && (
            <span className={`${classes.badgee} text-[15px]`}>
              {numberOfCartItems}
            </span>
          )}
        </li>
        <li
          id="genn-FooterFlex-ico-like"
          className="hover:scale-110 transition-transform duration-200 cursor-pointer relative px-2"
          // Navigate to home page when clicked
        >
          <Link to="/Dislike">
            <BiSolidDislike className="text-black " />
          </Link>
          {numberOfCartDisItems > 0 && (
            <span
              id="genn-FooterFlex-badgee"
              className={`${classes.badgee} text-[15px]`}
            >
              {numberOfCartDisItems}
            </span>
          )}
        </li>
      </ul>
    </div>
  );
}

export default FooterFlex;
