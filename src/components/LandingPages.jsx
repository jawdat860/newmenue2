import { useState, useRef, useEffect } from "react";
import { LocalText } from "./LocakText/LocalText";
import image1 from "../assets/logo-b29-marino.svg";
import { Modal } from "@telegram-apps/telegram-ui";
import { ModalHeader } from "@telegram-apps/telegram-ui/dist/components/Overlays/Modal/components/ModalHeader/ModalHeader";
import iconYandex from "../assets/ico/ico-ya-r.svg";
import iconYandexMap from "../assets/ico/ico-ya-map.svg";
import iconShare from "../assets/ico/ico-share.svg";
import iconNelegram from "../assets/ico/ico-telegram.svg";
import iconUserIco from "../assets/ico/ico-logo-genn.svg";
import questionIco from "../assets/ico/question.svg";
import WebApp from "@twa-dev/sdk"; // Assuming this package works in JavaScript
const TG_BOT_TOKEN = "7347780887:AAGiNI5Pvs1iHHONlBV3zQibnC_UFm7slys"; // Replace with your actual Bot Token

const LandingPages = () => {
  const [userPhotoUrl, setUserPhotoUrl] = useState(iconUserIco); // Default icon
  const [showReadMore, setShowReadMore] = useState(false);
  const [showMapIframe, setShowMapIframe] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showIframeComment, setShowIframeComment] = useState(false);
  const [showShareModel, setShowShareModel] = useState(false);
  const [showQuestionMap, setShowQusetionMap] = useState(false);
  const [showQuestionTextLong, setShowQusetionTextLong] = useState(false);
  const [showQuestionComment, setShowQusetionComment] = useState(false);
  const [showQuestionSharing, setShowQusetionSharing] = useState(false);

  const showQuestionMapHandler = () => {
    setShowQusetionMap(!showQuestionMap);
  };
  const showQuestionTextLongHandler = () => {
    setShowQusetionTextLong(!showQuestionTextLong);
  };
  const showQuestionCommentHandler = () => {
    setShowQusetionComment(!showQuestionComment);
  };
  const showQuestionSharingHandler = () => {
    setShowQusetionSharing(!showQuestionSharing);
  };
  const paragraphRef = useRef(null);
  const [initData, setInitData] = useState(null);
  useEffect(() => {
    const data = WebApp.initDataUnsafe;
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      console.error("❌ Open this app in Telegram");
      return;
    }
    console.log("✅ Telegram WebApp Available", data);
    setInitData(data); // Store as an object
    WebApp.expand();
  }, []);
  useEffect(() => {
    // Check the height of the paragraph element to determine if "Read More" should be shown
    if (paragraphRef.current && paragraphRef.current.clientHeight >= 16) {
      setShowReadMore(true);
    }
  }, []);

  const handleModalTextOpenChange = (open) => {
    setShowText(open);
  };
  const handleModalMapOpenChange = (open) => {
    setShowMapIframe(open);
  };

  const handleModalCommentOpenChange = (open) => {
    setShowIframeComment(open);
  };
  const handleModalShareOpenChange = (open) => {
    setShowShareModel(open);
  };

  // Extract user_id and fetch profile photo using Telegram Bot API
  useEffect(() => {
    const data = WebApp.initDataUnsafe;
    if (!data || !data.user) {
      console.error(
        "❌ User data is not available. Ensure the app is launched within Telegram."
      );
      return;
    }

    const userId = data.user.id; // Fetch the user ID from initDataUnsafe

    const fetchUserPhoto = async () => {
      try {
        const response = await fetch(
          `https://api.telegram.org/bot${TG_BOT_TOKEN}/getUserProfilePhotos`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id: userId, limit: 1 }),
            cache: "no-store", // Prevent cache on the main request
          }
        );

        const data = await response.json();
        if (data.ok && data.result.photos.length > 0) {
          const fileId = data.result.photos[0][0].file_id;

          const fileResponse = await fetch(
            `https://api.telegram.org/bot${TG_BOT_TOKEN}/getFile`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ file_id: fileId }),
              cache: "no-store", // Prevent cache on the file fetch request
            }
          );

          const fileData = await fileResponse.json();
          if (fileData.ok) {
            const fileUrl = `https://api.telegram.org/file/bot${TG_BOT_TOKEN}/${fileData.result.file_path}`;
            setUserPhotoUrl(`${fileUrl}?t=${new Date().getTime()}`); // Cache-bust by adding timestamp
          }
        }
      } catch (error) {
        console.error("Error fetching user photo:", error);
      }
    };

    fetchUserPhoto();
  }, []);

  return (
    <div
      id="genn-LandingPages-all-blokc"
      className="relative bg-[url('./assets/bg/bg-1.webp')] bg-cover bg-center bg-no-repeat py-[0px] px-[5px] text-center pb-20 "
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div
        id="genn-LandingPage-TelegramHeader"
        className="flex justify-between  relative p-[5px] bg-[#ffffff] rounded-t-[opx] rounded-b-[27px]  border-t-[0] "
      >
        <div
          id="genn-LandingPage-TelegramHeader-user-info"
          className="flex items-center"
        >
          <div className="twailweenchange1 gap-[10px] flex items-center ">
            <img
              src={userPhotoUrl}
              alt={LocalText.LandingPagesOrg.description}
              className="rounded-[50%] w-[35px] h-[35px]"
            />
          </div>
          <div className="text-[black] text-[17px] ml-[10px]">
            {LocalText.LandingPagesOrg.theUser}
            {/* Написано для визуального просмотра на веб версии */}
            {initData?.user?.first_name || " jawdat"}
            {/* Работает только в телеграмм */}
            {/* {initData.user.first_name } */}
          </div>
        </div>
        <div
          id="genn-LandingPage-TelegramHeader-link"
          className="flex bg-[#40b3e0] items-center gap-[10px] twailweenchange2"
        >
          <div className="w-[27px] ">
            <img
              className=" "
              src={iconNelegram}
              alt={LocalText.LandingPagesOrg.description}
            />
          </div>
          <div className="">
            <div
              className="text-[18px] font-[600] underline  "
              onClick={() =>
                WebApp.openTelegramLink(LocalText.LandingPagesOrg.telegramLink)
              }
            >
              {LocalText.LandingPagesOrg.telegramTitl}
            </div>
          </div>
        </div>
      </div>

      <div
        id="genn-LandingPage-block-logo-h1-text-ico"
        className="relative mx-auto text-white px-[10px]"
      >
        {/* Header Section */}
        <div
          id="genn-LandingPage-Org-logo"
          className="flex justify-center py-[40px] "
        >
          <img src={image1} alt="Logo" className="w-[180px] h-[45px]" />
        </div>
        <h1
          id="genn-LandingPage-Org-titl-h1"
          className="p-0 m-0 text-[26px] leading-[20px] text-white font-[100] font-bold"
        >
          <>
            <span className="text-[26px]">
              {LocalText.LandingPagesOrg.titleH1}
            </span>
            <br />
            <span className="text-[14px]">
              {LocalText.LandingPagesOrg.titleH1sub}
            </span>
          </>
        </h1>

        {/* Paragraph with Read More functionality */}
        <div
          id="genn-LandingPage-Org-description"
          ref={paragraphRef}
          className="mt-[20px] max-h-[168px] overflow-hidden text-ellipsis"
        >
          {LocalText.LandingPagesOrg.description}
        </div>
        <div
          id="genn-LandingPage-Org-blok-Ici"
          className="flex justify-between mt-[20px]"
        >
          {" "}
          {/* Иконки карта, отзывы, расшарить */}
          {showReadMore && LocalText.LandingPagesOrg.descriptionLong !== "" && (
            <button
              onClick={() => {
                setShowText(true);
              }}
              className=" block genn-ico-redmore  bg-[#fff] rounded-[100px] py-[0] px-[20px]  text-buttonOrgReadMore text-[14px]"
            >
              {LocalText.LandingPagesOrg.readMoreButton}
            </button>
          )}
          {/* Button to show map iframe in modal */}
          <div id="genn-LandingPage-Org-Ici" className="flex gap-[6px]">
            <button
              onClick={() => {
                setShowMapIframe(true); // Show map iframe in modal
              }}
              className=" text-blue-500 underline block genn-ico bg-[#fff] h-[45px] w-[45px] p-[7px] rounded-[100px] decoration-auto"
              id="genn-LandingPage-Org-ButtonMap"
            >
              <img
                src={iconYandexMap}
                alt={LocalText.LandingPagesOrg.description}
              />
            </button>

            <button
              onClick={() => {
                setShowIframeComment(true); // Show comments iframe in modal
              }}
              className=" text-blue-500 underline block genn-ico bg-[#fff] h-[45px] w-[45px] p-[7px] rounded-[100px]"
              id="genn-LandingPage-Org-ButtonComment"
            >
              <span>
                <img
                  src={iconYandex}
                  alt={LocalText.LandingPagesOrg.showCommentsButton}
                />
              </span>
            </button>
            <button
              onClick={() => {
                setShowShareModel(true); // Show comments iframe in modal
              }}
              className=" text-blue-500 underline block genn-ico bg-[#fff] h-[45px] w-[45px] p-[7px] rounded-[100px]"
              id="genn-LandingPage-Org-ButtonSharing"
            >
              <span>
                <img
                  src={iconShare}
                  alt={LocalText.LandingPagesOrg.showCommentsButton}
                />
              </span>
            </button>
          </div>
        </div>

        {/* first model for long text */}
        <Modal
          header={
            <ModalHeader style={{ backgroundColor: "transparent" }}>
              Service Details
            </ModalHeader>
          }
          open={showText}
          onOpenChange={handleModalTextOpenChange}
          dismissible={true}
          style={{
            backgroundColor: "transparent",
            bottom: "0",
            display: "flex",
            alignContent: "space-between",
            minHeight: "100%",
          }}
        >
          <div
            id="genn-LandingPages-redmore-description"
            className="p-6 flex flex-col flex-[1]  "
          >
            <div className="flex justify-center items-center">
              <h2 className=" text-[16px]  font-[600]">
                {LocalText.LandingPagesOrg.TextLong}
              </h2>
              <img
                className="w-[20px] items-center  mt-[5px] ml-[10px]"
                src={questionIco}
                alt={LocalText.BuyPage.titleHead}
                onClick={() => showQuestionTextLongHandler()}
              />
            </div>
            {showQuestionTextLong && (
              <div
                className={`mb-[20px] px-[10px] text-center transition-content  transition-opacity duration-300 ease-in-out transform translate-y-2 ${
                  showQuestionTextLong ? "transition-content-enter" : ""
                }`}
              >
                {LocalText.LandingPagesOrg.TextLongQuestion}{" "}
                {LocalText.LandingPagesOrg.titleH1}
              </div>
            )}
            <p>{LocalText.LandingPagesOrg.descriptionLong}</p>
          </div>
        </Modal>

        {/* second  model for map */}
        <Modal
          header={
            <ModalHeader style={{ backgroundColor: "transparent" }}>
              Service Details
            </ModalHeader>
          }
          open={showMapIframe}
          onOpenChange={handleModalMapOpenChange}
          dismissible={true}
          style={{
            backgroundColor: "transparent",
            bottom: "0",
            display: "flex",
            alignContent: "space-between",
            minHeight: "100%",
          }}
        >
          <div
            id="genn-LandingPages-map"
            className="p-6 flex flex-col flex-[1]  "
          >
            <div className="flex flex-col ">
              <div className="flex items-center justify-center pt-[10px] pb-[30px]">
                <h2 className=" text-center  text-[26px] font-[600] ">
                  {LocalText.LandingPagesOrg.modelMap}
                </h2>
                <img
                  className="w-[20px] items-center mt-[6px] ml-[10px]"
                  src={questionIco}
                  alt={LocalText.BuyPage.titleHead}
                  onClick={() => showQuestionMapHandler()}
                />
              </div>
              {showQuestionMap && (
                <div
                  className={`mb-[20px] px-[10px] text-center transition-content  transition-opacity duration-300 ease-in-out transform translate-y-2 ${
                    showQuestionMap ? "transition-content-enter" : ""
                  }`}
                >
                  {LocalText.LandingPagesOrg.modelMapQuestion}
                </div>
              )}
            </div>

            <div className="flex-[1] flex">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3Aeea953657fb7f2652860a7c81e04f3adb78e6e68ebd873b32760a348ff0fd9c7&amp;source=constructor"
                width="100%"
                minHeight="100%"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </Modal>
        {/* third modal for comments iframe */}
        <Modal
          header={
            <ModalHeader style={{ backgroundColor: "transparent" }}>
              Comments
            </ModalHeader>
          }
          open={showIframeComment}
          onOpenChange={handleModalCommentOpenChange}
          dismissible={true}
          style={{
            backgroundColor: "transparent",
            bottom: "0",
            display: "flex",
            alignContent: "space-between",
            minHeight: "100%",
          }}
        >
          <div className="p-6 flex flex-col flex-[1]  ">
            <div className="flex flex-col justify-center">
              <div className="flex items-center justify-center pt-[10px] pb-[30px]">
                <h2 className="text-center  text-[26px] font-[600] ">
                  {LocalText.LandingPagesOrg.modelComment}
                </h2>
                <img
                  className="w-[20px] items-center mt-[6px] ml-[10px] "
                  src={questionIco}
                  alt={LocalText.BuyPage.titleHead}
                  onClick={() => showQuestionCommentHandler()}
                />
              </div>
              {showQuestionComment && (
                <div
                  className={`mb-[20px] px-[10px] text-center transition-content  transition-opacity duration-300 ease-in-out transform translate-y-2 ${
                    showQuestionComment ? "transition-content-enter" : ""
                  }`}
                >
                  {LocalText.LandingPagesOrg.modelCommentQuestion}
                </div>
              )}
            </div>

            <div id="genn-LandingPages-coment" className=" flex-[1] flex">
              <iframe
                style={{
                  width: "100%",
                  minHeight: "100%",
                  border: "1px solid #e6e6e6",
                  borderRadius: "8px",
                  boxSizing: "border-box",
                }}
                src="https://yandex.ru/maps-reviews-widget/107780353451?comments"
                frameBorder="0"
              ></iframe>
            </div>
          </div>
        </Modal>
        {/* four model for sharing */}
        <Modal
          header={
            <ModalHeader style={{ backgroundColor: "transparent" }}>
              Comments
            </ModalHeader>
          }
          open={showShareModel}
          onOpenChange={handleModalShareOpenChange}
          dismissible={true}
          style={{
            backgroundColor: "transparent",
            bottom: "0",
            display: "flex",
            alignContent: "space-between",
            minHeight: "100%",
          }}
        >
          <div className="flex flex-col justify-center p-6">
            <div className="flex justify-center  pt-[10px] pb-[30px]">
              <h2 className=" text-[20px]  font-[600]">
                {LocalText.LandingPagesOrg.modelSharingTitle}
              </h2>
              <img
                className="w-[20px] items-center mt-[6px] ml-[10px]"
                src={questionIco}
                alt={LocalText.BuyPage.titleHead}
                onClick={() => showQuestionSharingHandler()}
              />
            </div>
            {showQuestionSharing && (
              <div
                className={`mb-[20px] px-[10px] text-center transition-content  transition-opacity duration-300 ease-in-out transform translate-y-2 ${
                  showQuestionSharing ? "transition-content-enter" : ""
                }`}
              >
                {LocalText.LandingPagesOrg.modelSharingQuestion}
              </div>
            )}
          </div>
          <div id="genn-LandingPages-share" className="p-6">
            <div>{LocalText.LandingPagesOrg.shareText}</div>
          </div>
        </Modal>
        {/* Модальные окна для иконок организации - окончание */}
      </div>
    </div>
  );
};

export default LandingPages;
