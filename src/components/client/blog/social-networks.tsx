'use client'
import { useTheme } from 'next-themes'
import { FC } from 'react'
import Link from 'next/link'

export const SocialNetworks: FC<any> = ({ userContent }) => {
  const { theme } = useTheme()
  return (
    <div className="z-20 mt-[15px] flex items-center justify-end gap-[16px]">
      <a
        href={userContent.gitHubLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={theme === 'dark' ? 'white' : 'black'}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.25 2C6.58983 2 2 6.59041 2 12.2531C2 16.7833 4.93694 20.6266 9.00963 21.9824C9.52187 22.0773 9.70998 21.76 9.70998 21.4891C9.70998 21.2447 9.70041 20.4369 9.69607 19.5802C6.84442 20.2004 6.24271 18.3704 6.24271 18.3704C5.77645 17.1853 5.10464 16.8703 5.10464 16.8703C4.17469 16.2339 5.17474 16.2469 5.17474 16.2469C6.20404 16.3193 6.74602 17.3035 6.74602 17.3035C7.66021 18.871 9.14388 18.4178 9.72879 18.1559C9.82076 17.4931 10.0864 17.0409 10.3795 16.7849C8.10292 16.5255 5.70957 15.6464 5.70957 11.7177C5.70957 10.5983 6.10998 9.6836 6.76572 8.96559C6.65928 8.7073 6.30847 7.6645 6.865 6.25219C6.865 6.25219 7.72573 5.97662 9.6845 7.3032C10.5021 7.07595 11.3789 6.96209 12.25 6.95823C13.1211 6.96209 13.9987 7.07595 14.8178 7.3032C16.7743 5.97662 17.6338 6.25219 17.6338 6.25219C18.1917 7.6645 17.8407 8.7073 17.7343 8.96559C18.3915 9.6836 18.7891 10.5982 18.7891 11.7177C18.7891 15.6557 16.3913 16.5229 14.1089 16.7767C14.4765 17.0948 14.8041 17.7189 14.8041 18.6754C14.8041 20.0472 14.7922 21.1514 14.7922 21.4891C14.7922 21.762 14.9767 22.0817 15.4963 21.981C19.5668 20.6237 22.5 16.7818 22.5 12.2531C22.5 6.59041 17.9108 2 12.25 2Z"
            fill={theme === 'dark' ? 'white' : 'black'}
          />
          <path
            d="M5.84287 16.6031C5.82052 16.6542 5.74087 16.6695 5.66848 16.6345C5.59466 16.601 5.55316 16.5313 5.5771 16.48C5.59905 16.4274 5.6787 16.4127 5.75237 16.448C5.82635 16.4815 5.86849 16.5518 5.84287 16.6031ZM6.34344 17.0546C6.29492 17.1001 6.20002 17.079 6.13562 17.0071C6.06905 16.9354 6.0566 16.8395 6.10585 16.7933C6.15589 16.7479 6.24791 16.7691 6.31463 16.8409C6.38119 16.9134 6.3942 17.0086 6.34344 17.0546ZM6.68687 17.6322C6.62446 17.676 6.52246 17.635 6.45949 17.5435C6.39716 17.4521 6.39716 17.3424 6.46085 17.2984C6.52406 17.2544 6.62446 17.294 6.68831 17.3847C6.75056 17.4777 6.75064 17.5874 6.68687 17.6322ZM7.26757 18.3013C7.21179 18.3634 7.09303 18.3468 7.00603 18.2619C6.91712 18.179 6.8923 18.0613 6.94825 17.9991C7.00468 17.9368 7.12415 17.9543 7.21179 18.0384C7.30014 18.1212 7.32703 18.2398 7.26757 18.3013ZM8.01811 18.5272C7.99361 18.6077 7.87916 18.6443 7.76392 18.6101C7.64883 18.5749 7.57349 18.4805 7.59671 18.3991C7.62066 18.318 7.73558 18.2798 7.85171 18.3165C7.96664 18.3515 8.04206 18.4452 8.01811 18.5272ZM8.87241 18.6229C8.87528 18.7078 8.77751 18.7782 8.65652 18.7797C8.53481 18.7824 8.4364 18.7137 8.43513 18.6303C8.43513 18.5446 8.53066 18.4749 8.65229 18.4729C8.77328 18.4705 8.87241 18.5386 8.87241 18.6229ZM9.71154 18.5904C9.72607 18.6732 9.64194 18.7582 9.52183 18.7808C9.40371 18.8026 9.29437 18.7515 9.27928 18.6695C9.2646 18.5846 9.35032 18.4997 9.4682 18.4776C9.58855 18.4565 9.69622 18.5063 9.71154 18.5904Z"
            fill={theme === 'dark' ? 'white' : 'black'}
          />
        </svg>
      </a>
      <a
        href={userContent.linkedinLink}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="24"
          viewBox="0 0 25 24"
          fill="none"
        >
          <path
            d="M19.6552 19.0433H16.598V14.4025C16.598 13.2958 16.5748 11.8717 15.0049 11.8717C13.4109 11.8717 13.1675 13.0758 13.1675 14.3208V19.0433H10.1103V9.5H13.0471V10.8008H13.0866C13.4969 10.0508 14.4948 9.25917 15.9855 9.25917C19.0832 9.25917 19.6561 11.2342 19.6561 13.805L19.6552 19.0433ZM6.65737 8.19417C5.67329 8.19417 4.88275 7.4225 4.88275 6.47333C4.88275 5.525 5.67415 4.75417 6.65737 4.75417C7.63802 4.75417 8.43286 5.525 8.43286 6.47333C8.43286 7.4225 7.63716 8.19417 6.65737 8.19417ZM8.19028 19.0433H5.12447V9.5H8.19028V19.0433ZM21.1847 2H3.58985C2.7477 2 2.06641 2.645 2.06641 3.44083V20.5592C2.06641 21.3558 2.7477 22 3.58985 22H21.1821C22.0234 22 22.7116 21.3558 22.7116 20.5592V3.44083C22.7116 2.645 22.0234 2 21.1821 2H21.1847Z"
            fill={theme === 'dark' ? 'white' : 'black'}
          />
        </svg>
      </a>
    </div>
  )
}
