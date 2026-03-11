import React, { SVGProps } from 'react'

export default function MessageIcon(props:SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
  <path d="M22 17C22 19.2091 20.2091 21 18 21H6C3.79086 21 2 19.2091 2 17V8.96289L9.05957 14.0977C10.8127 15.3725 13.1873 15.3725 14.9404 14.0977L22 8.96289V17ZM18 3C20.0441 3 21.7283 4.53351 21.9688 6.5127L13.7646 12.4805C12.7127 13.2455 11.2873 13.2455 10.2354 12.4805L2.03027 6.5127C2.27072 4.53345 3.95586 3 6 3H18Z" fill="white"/>
</svg>
  )
}
