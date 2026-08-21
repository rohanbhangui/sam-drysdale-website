import { v4 as uuid } from "uuid"

import { SOCIALS } from "@/utils/data"

const linkClasses =
  "mx-[0.1rem] p-[0.1rem] no-underline transition-colors duration-300 font-semibold normal-case! hover:text-black [&_ion-icon]:text-[2.4rem] [&_ion-icon]:mx-[0.3rem]"

const Footer = ({ id }) => {
  return (
    <footer
      id={id}
      className="w-full mt-32 mx-auto pt-0 p-4 relative text-center max-w-[1200px]"
    >
      <ul className="flex list-none text-center justify-center flex-wrap items-center">
        {Object.keys(SOCIALS)
          .filter((item) => !["apple music", "spotify"].includes(item))
          .map((socialKey) => {
            const { url, icon, name } = SOCIALS[socialKey]

            return (
              <li key={uuid()}>
                {url ? (
                  <a
                    href={url}
                    className={`${linkClasses} h2`}
                    style={{ color: "rgba(0,0,0,0.33)" }}
                  >
                    <ion-icon name={icon} />
                  </a>
                ) : (
                  <div
                    className={`${linkClasses} h2 text-5xl! font-extralight!`}
                    style={{ color: "rgba(0,0,0,0.33)" }}
                  >
                    {name}
                  </div>
                )}
              </li>
            )
          })}
      </ul>
      <div className="mt-32 text-xs text-center uppercase text-white/50 mb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        Sam Drysdale &copy; Copyright {new Date().getFullYear()}
      </div>
    </footer>
  )
}

export default Footer
