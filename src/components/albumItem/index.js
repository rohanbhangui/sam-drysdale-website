const AlbumItem = ({ item: { img, title, subtitle, url } }) => {
  return (
    <div className="px-2">
      <a
        href={url}
        className="flex items-center justify-center w-[18rem] h-[18rem] medium:w-60 medium:h-60 bg-cover cursor-pointer group"
        style={{ backgroundImage: `url(${img})` }}
      >
        <button className="cursor-pointer bg-none border-none h-16 opacity-0 group-hover:opacity-100">
          <ion-icon
            name="play-circle-sharp"
            style={{
              color: "white",
              fontSize: "4rem",
              textShadow: "0 0 4px rgba(0, 0, 0, 0.66)",
            }}
          />
        </button>
      </a>
      <a
        href={url}
        className="flex items-start medium:items-center p-2 no-underline group/content"
      >
        <div className="flex-1">
          <h3 className="!mt-0 mb-1 medium:mb-0">{title}</h3>
          <p className="!mt-0 text-[0.8rem]" style={{ color: "rgba(0,0,0,0.33)" }}>
            {subtitle}
          </p>
        </div>
        <div>
          <ion-icon
            name="arrow-forward-circle"
            className="text-5xl opacity-100 medium:text-3xl medium:opacity-0 medium:group-hover/content:opacity-100"
          />
        </div>
      </a>
    </div>
  )
}

export default AlbumItem
