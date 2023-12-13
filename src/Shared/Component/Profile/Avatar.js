import _ from "lodash";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { classNames } from "../../utils/common";

const Avatar = ({ src, alt, size = "sm", disabled }) => {
    if (src?.length) {
        return !disabled ? (
            <Zoom>
                <img
                    className={classNames(
                        size === "xs" ? "h-7 w-7 " : "",
                        size === "sm" ? "h-10 w-10 " : "",
                        size === "md" ? "h-14 w-14 " : "",
                        size === "lg" ? "h-20 w-20 " : "",
                        size === "xl" ? "h-28 w-28 " : "",
                        size === "2xl" ? "h-36 w-36" : "",
                        "rounded-full object-cover z-0"
                    )}
                    src={src}
                    alt={alt}
                />
            </Zoom>
        ) : (
            <img
                className={classNames(
                    size === "xs" ? "h-7 w-7 " : "",
                    size === "sm" ? "h-10 w-10 " : "",
                    size === "md" ? "h-14 w-14 " : "",
                    size === "lg" ? "h-20 w-20 " : "",
                    size === "xl" ? "h-28 w-28 " : "",
                    size === "2xl" ? "h-36 w-36" : "",
                    "rounded-full object-cover z-0"
                )}
                src={src}
                alt={alt}
            />
        );
    }
    return (
        <div
            className={classNames(
                size === "xs" ? "h-7 w-7 " : "",
                size === "sm" ? "h-10 w-10 " : "",
                size === "md" ? "h-14 w-14 " : "",
                size === "lg" ? "h-20 w-20 " : "",
                size === "xl" ? "h-28 w-28 " : "",
                "rounded-full flex items-center justify-center bg-gray-200"
            )}
        >
            <span className="text-sm">
                {_.chain(alt)
                    .split(" ")
                    .slice(0, 2)
                    .map((s) => s.charAt(0))
                    .join("")
                    .upperCase()
                    .value()}
            </span>
        </div>
    );
};

export default Avatar;
