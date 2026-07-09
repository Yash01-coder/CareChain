import CountUp from "react-countup";
import { useInView } from "framer-motion";
import { useRef } from "react";
import clsx from "clsx";

export default function AnimatedCounter({
  end,
  start = 0,
  duration = 2,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  return (
    <span
      ref={ref}
      className={clsx(
        "font-bold text-slate-900",
        className
      )}
    >
      {isInView ? (
        <CountUp
          start={start}
          end={end}
          duration={duration}
          decimals={decimals}
          prefix={prefix}
          suffix={suffix}
        />
      ) : (
        `${prefix}${start}${suffix}`
      )}
    </span>
  );
}