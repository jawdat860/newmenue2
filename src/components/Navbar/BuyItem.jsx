import deleteIco from "../../assets/ico/delete-ico.svg";
import { LocalText } from "../LocakText/LocalText";
const BuyItem = (props) => {
  const price = props.price;

  return (
    <li
      id="genn-BuyItem-card-block"
      className="p-[10px] relative gap-[15px] mb-[5px] flex flex-row bg-white  rounded-[20px] shadow-lg transition-transform transform hover:scale-105 duration-300 cursor-pointer w-full"
    >
      <div
        id="genn-BuyItem-container-img"
        className="relative h-[50px] w-[50px]"
      >
        <div
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-[50px] h-[60px] object-cover rounded-[8px] relative "
          aria-label={`${props.title} image`}
          id="genn-ServiceCardcontainer-img-icons"
        ></div>
      </div>
      <div className="flex-[60%] flex flex-col justify-between">
        <div className="mb-[5px]">
          <h2 className="text-[15px] font-semibold text-black">{props.name}</h2>
        </div>
        <div
          id="genn-BuyItem-card-buttons"
          className="flex justify-between gap-2 items-center"
        >
          <div id="genn-BuyItem-card-price" className="  text-gray-400">
            <span className="text-md ">
              <>{price} </>{" "}
            </span>
            <span className="text-md">x {props.amount}</span>
            <span className="text-md">
              = {+props.amount * +price} {LocalText.root.Currency}
            </span>
          </div>
          <div className="flex gap-[5px]">
            <button
              className="bg-red-600 text-white rounded-md px-3 py-1 transition duration-300 ease-in-out hover:bg-red-700"
              onClick={props.onRemove}
            >
              −
            </button>
            <button
              className="bg-green-600 text-white rounded-md px-3 py-1 transition duration-300 ease-in-out hover:bg-green-700"
              onClick={props.onAdd}
            >
              +
            </button>
            <button
              className="w-[25px] text-white rounded-md transition duration-300 ease-in-out "
              onClick={props.onRemoveAll}
            >
              <img src={deleteIco} className="b" />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default BuyItem;
