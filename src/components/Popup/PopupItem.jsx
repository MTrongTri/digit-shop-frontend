function PopupItem({ Id, thumbnail, name }) {
  return (
    <div>
      <a href={`/products/${Id}`} className="flex items-center gap-4">
        <div className="aspect-square w-[60px]">
          <img
            src={thumbnail}
            alt=""
            className="h-full w-full rounded-sm object-contain"
          />
        </div>
        <div>
          <span className="hover:text-primary">{name}</span>
        </div>
      </a>
    </div>
  );
}

export default PopupItem;
