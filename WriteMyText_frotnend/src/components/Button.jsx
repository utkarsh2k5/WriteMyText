import clsx from "clsx";
import PropTypes from "prop-types";
import { Marker } from "./Marker.jsx";

const Button = ({
  icon,
  iconAlt = "",
  children,
  href,
  containerClassName,
  innerClassName,
  onClick,
  markerFill,
  ...rest
}) => {
  const Inner = () => (
    <>
      <span className={clsx("relative flex items-center min-h-[60px] px-4 g4 rounded-2xl inner-before group-hover:before:opacity-100 overflow-hidden", innerClassName)}>
        <span className="absolute -left-[1px]">
          <Marker markerFill={markerFill} />
        </span>

        {icon && (
          <img
            src={icon}
            alt={iconAlt}
            className="size-10 mr-5 object-contain z-10"
          />
        )}

        <span className="relative z-2 font-poppins base-bold text-p1 uppercase">
          {children}
        </span>
      </span>

      <span className="glow-before glow-after" />
    </>
  );
  const disabled = rest.disabled;

  const baseClass = clsx(
    "relative p-0.5 g5 rounded-2xl shadow-500 group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-p3",
    containerClassName,
    disabled && "opacity-60 cursor-not-allowed",
  );

  return href ? (
    <a className={baseClass} href={href} {...rest}>
      <Inner />
    </a>
  ) : (
    <button className={baseClass} onClick={onClick} {...rest}>
      <Inner />
    </button>
  );
};
export default Button;

Button.propTypes = {
  icon: PropTypes.string,
  iconAlt: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  containerClassName: PropTypes.string,
  innerClassName: PropTypes.string,
  onClick: PropTypes.func,
  markerFill: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  icon: undefined,
  iconAlt: "",
  children: null,
  href: undefined,
  containerClassName: "",
  innerClassName: "",
  onClick: undefined,
  markerFill: undefined,
  disabled: false,
};
