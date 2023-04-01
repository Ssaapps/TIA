import * as React from "react"

const SearchIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        width={18}
        height={18}
        {...props}
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
        />
    </svg>
)

export default SearchIcon
