import { useState, useEffect, useContext } from "react";
import CartContext from "../store/CartContext";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { LocalText } from "../LocakText/LocalText";
import deleteIco from "../../assets/ico/delete-ico.svg";
import checkIco from "../../assets/ico/ico-check.svg";
const ServiceCard = ({ service, onClick, loading, titleLoad }) => {
  const [quantity, setQuantity] = useState(0);
  const [love, setLove] = useState(false);
  const [Dislove, setDisLove] = useState(false);
  const cartCtx = useContext(CartContext);
  const [anmition, setAnmition] = useState(false);
  const ButtonCard = () => {
    setAnmition(!anmition);
    cartCtx.addItem({
      id: service.id,
      title: service.title,
      amount: 1,
      price: service.price,
    });
  };
  const addToFavouriteHandler = () => {
    cartCtx.addItemToFavourite({
      id: service.id,
      title: service.title,
      amount: quantity,
      price: service.price,
      description: service.description,
      love: true,
      Dislove: false,
    });
  };
  const addToDisFavouriteHandler = () => {
    cartCtx.addItemToDisFavourite({
      id: service.id,
      title: service.title,
      amount: quantity,
      price: service.price,
      description: service.description,
      love: false,
      Dislove: true,
    });
  };
  const handleDecrement = (id) => {
    setAnmition(!anmition);
    setQuantity((prevQuantity) => prevQuantity - 1);
    cartCtx.removeItem(id);
  };

  const handleIncrement = (ser) => {
    setAnmition(!anmition);
    cartCtx.addItem({ ...ser, amount: 1 });
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  useEffect(() => {
    if (cartCtx && Array.isArray(cartCtx.items)) {
      const existingItem = cartCtx.items.find((item) => item.id === service.id);
      setQuantity(existingItem ? existingItem.amount : 0);
    }

    if (cartCtx && Array.isArray(cartCtx.itemsFavourite)) {
      const existingItemLove = cartCtx.itemsFavourite.find(
        (item) => item.id === service.id
      );
      setLove(existingItemLove ? existingItemLove.love : false);
    }
    if (cartCtx && Array.isArray(cartCtx.itemsDisFavourite)) {
      const existingItemLove = cartCtx.itemsDisFavourite.find(
        (item) => item.id === service.id
      );
      setDisLove(existingItemLove ? existingItemLove.Dislove : false);
    }
  }, [cartCtx, service.id]);

  // Render an empty card if loading is true
  if (loading) {
    return (
      <>
        {titleLoad.map((e, index) => (
          <div key={index}>
            <h1 className=" top-2 left-4 my-[20px] text-center text-lg font-semibold">
              {e.title}
            </h1>
            <>
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index} // Ensure each item has a unique key
                  className="shimmer relative items-center mb-2 flex flex-row bg-white rounded-2xl shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer w-full"
                >
                  <div className="relative w-full h-40 flex-[40%] p-1">
                    <div className="w-full h-full object-cover rounded-2xl bg-gray-200 " />
                  </div>

                  <div className="pt-1 h-40 text-left flex flex-col flex-[60%] justify-between p-2">
                    <div className="flex-1 p-2 flex gap-2 flex-col">
                      <h1 className="text-lg font-bold capitalize leading-tight"></h1>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-2"></p>
                    </div>

                    <div className="flex justify-between items-center">
                      <p className="font-bold p-2 mr-2 text-lg text-black bg-opacity-50"></p>
                      <button
                        className="bg-gray-200 w-[50px] h-[30px] p-3 rounded-tl-2xl rounded-br-2xl "
                        disabled // Button is disabled
                      ></button>
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        ))}
      </>
    );
  }

  // Render the actual service card when not loading
  return (
    <div
      id="genn-ServiceCard-allCard"
      className="relative items-center mb-[10px] flex flex-row bg-white  rounded-[20px] shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer w-full"
      aria-label={`Open details for ${service.title}`}
    >
      <div
        id="genn-ServiceCard-container-img"
        className="relative w-full h-40 flex-[30%] p-[5px]"
      >
        <div
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          id="genn-ServiceCardcontainer-img-icons"
          className="w-full h-full object-cover rounded-[20px] relative flex flex-col"
          aria-label={`${service.title} image`}
        >
          <div className="flex pl-[10px] pt-[5px] gap-[10px] ">
            <div onClick={addToFavouriteHandler}>
              {love ? (
                <BiSolidLike className="text-[30px] text-red-500 " />
              ) : (
                <BiSolidLike className="text-[30px] " />
              )}
            </div>
            <div onClick={addToDisFavouriteHandler}>
              {Dislove ? (
                <BiSolidDislike className="text-[30px] text-red-500" />
              ) : (
                <BiSolidDislike className="text-[30px] " />
              )}
            </div>
          </div>
          <div className="flex-[1]" onClick={onClick}></div>
        </div>
      </div>
      <div
        id="genn-ServiceCard-text"
        className="pt-1 h-40 text-left flex flex-col flex-[60%] justify-between"
      >
        <div
          onClick={onClick}
          className="flex-[1] p-[6px] flex gap-[10px] flex-col"
        >
          <h1 className="text-[0.9rem] capitalize leading-[15px] sm:text-lg font-bold">
            {service.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-300 line-clamp-2">
            {service.description}
          </p>
        </div>
        <div id="genn-ServiceCard-price" className="flex justify-between">
          <div className="font-bold flex items-center justify-center p-[11px] pr-0  text-[1.05rem] text-black bg-opacity-50">
            {service.price} ₽
          </div>
          <div className="aaaaaa3 overflow-hidden ">
            <div
              className={` ${anmition ? "aaaaaa4 cubic-bezier" : "aaaaaa2"} `}
            >
              <img src={checkIco} className="w-[25px]" />
            </div>
            {quantity >= 2 && (
              <div className="">
                <img
                  src={deleteIco}
                  className="w-[20px]"
                  onClick={() => cartCtx.removeItemall(service.id)}
                />
              </div>
            )}
          </div>
          {quantity === 0 ? (
            <button
              id="genn-ServiceCard-text-buttonOrder"
              className="bg-colorServiceCardOrderZakazatBg text-colorServiceCardOrderZakazatText p-[13px] rounded-tl-[20px] rounded-br-[20px]"
              onClick={ButtonCard}
            >
              {LocalText.ServiceCard.buttonText}
            </button>
          ) : (
            <div
              id="genn-ServiceCard-text-buttonplusMin "
              className="relative flex items-center rounded-tl-[20px] rounded-br-[20px] w-[120px] text-colorServiceCardOrderZakazatTextAktive bg-colorServiceCardOrderZakazatBgAktive  justify-between px-[8px] aling-center"
            >
              <button
                type="button"
                onClick={() => handleDecrement(service.id)}
                className={`${
                  quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                } h-11 rounded-[20px] font-bold text-[30px] justify-center items-center`}
                id="genn-ServiceCard-text-buttonMin"
              >
                -
              </button>
              <input
                type="text"
                id="quantity-input"
                value={quantity}
                readOnly
                className="bg-white rounded-l-[20px] rounded-r-[20px] border-x-0 border-gray-300 h-8 font-medium text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-[50%] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleIncrement(service)}
                className={`h-11 rounded-[20px] font-bold text-[20px] justify-center items-center`}
                id="genn-ServiceCard-text-buttonplus"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
