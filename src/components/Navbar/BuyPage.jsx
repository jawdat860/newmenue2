import { Modal } from "@telegram-apps/telegram-ui";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import { useContext, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import CartContext from "../store/CartContext";
import BuyItem from "./BuyItem";
import image from "../../assets/product.png";
import questionIco from "../../assets/ico/question.svg";
import { useNavigate } from "react-router-dom";
import { LocalText } from "../LocakText/LocalText";

function BuyPage({ isOpen, onClose }) {
  const cartCtx = useContext(CartContext);
  const [questionShow, setQuestionShow] = useState(false);
  const navigate = useNavigate();

  const totalAmount = `${cartCtx.totalAmount} ₽`;
  const hasItems = cartCtx.items.length > 0;
  const numberOfCartItems = cartCtx.items.reduce(
    (curNumber, item) => curNumber + item.amount,
    0
  );

  const handleOrderClick = () => {
    onClose();
    navigate("/order"); // Navigate to the order page
  };

  return (
    <Modal
      header={
        <ModalHeader
          style={{ backgroundColor: "transparent", padding: "1rem 2rem" }}
        >
          {LocalText.BuyPage.titleHead || "Your Cart"}
        </ModalHeader>
      }
      open={isOpen}
      onOpenChange={(open) => !open && onClose()} // Close modal on backdrop click
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        height: "100%",
      }}
    >
      <div className="h-full bg-[#eee] py-[20px] pb-[0] px-[0px] rounded-lg shadow-xl flex flex-col">
        <div className="flex flex-col gap-[20px] justify-center mb-[20px] transition-opacity duration-300 ease-in-out transform translate-y-2">
          <div className="flex justify-center">
            <h2 className="text-[20px] font-[600]">
              {LocalText.BuyPage.titleHead}
            </h2>
            <img
              className="w-[20px] items-center"
              src={questionIco}
              alt={LocalText.BuyPage.titleHead}
              onClick={() => setQuestionShow(!questionShow)}
            />
          </div>
          {questionShow && (
            <div className="mb-[20px] px-[10px] text-center transition-opacity duration-300 ease-in-out">
              {LocalText.BuyPage.iscriptionHead}
            </div>
          )}
        </div>

        <div className="overflow-y-auto flex-grow p-[15px]">
          {hasItems ? (
            <ul className="flex flex-col gap-2">
              {cartCtx.items.map((item) => (
                <BuyItem
                  key={item.id}
                  name={item.title}
                  amount={item.amount}
                  price={item.price}
                  onRemove={() => cartCtx.removeItem(item.id)}
                  onAdd={() => cartCtx.addItem({ ...item, amount: 1 })}
                  onRemoveAll={() => cartCtx.removeItemall(item.id)}
                />
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center h-full">
              <img src={image} alt="Empty Cart" />
            </div>
          )}
        </div>

        <div className="p-[15px] bg-white pb-[10px] border-t-[1px] border-black">
          <div className="flex justify-between items-center text-lg font-semibold mb-4">
            <span>Total:</span>
            <span className="flex-[1] border-b-[1.9px] border-dashed border-black mx-[5px]" />
            <span>{totalAmount}</span>
          </div>

          <div className="flex justify-end gap-4">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md transition duration-200"
              onClick={onClose}
            >
              Close
            </button>

            {hasItems && (
              <button
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark text-white py-2 px-6 rounded-md shadow-md transition-all duration-200"
                onClick={handleOrderClick}
              >
                Order Now
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default BuyPage;
