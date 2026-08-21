const Merch = () => {
  return (
    <div className="scrollbars">
      <div className="max-w-[1600px] w-full my-4 mx-auto text-center px-4">
        <div className="grid gap-[0.7rem] grid-cols-1 h-[75vh] min-h-[32rem]">
          <div className="col-start-1 row-start-1 h-full w-full">
            <img
              src="/img/in-pool-offset.jpg"
              alt=""
              className="w-full h-full object-cover object-[10%_center] opacity-80"
            />
          </div>
          <div className="col-start-1 row-start-1 z-10 flex items-center justify-center">
            <div>
              <h1>Merch</h1>
              <h2>Coming soon!</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Merch
