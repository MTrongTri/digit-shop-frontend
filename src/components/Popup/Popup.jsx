import PopupItem from "@/components/Popup/PopupItem";

// eslint-disable-next-line react/prop-types
function Popup({ data }) {
  return (
    <div
      className={`absolute left-0 right-0 top-full z-10 flex flex-col gap-3 rounded-md bg-white p-3 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]`}
    >
      <PopupItem data={data}></PopupItem>
      <PopupItem data={data}></PopupItem>
      <PopupItem data={data}></PopupItem>
    </div>
  );
}

export default Popup;
