import * as React from "react"

const BackArrowIcon = (props) => (
    <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m7 16-4-4m0 0 4-4m-4 4h18"
        />
    </svg>
)

export default BackArrowIcon
