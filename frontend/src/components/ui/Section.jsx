import clsx from "clsx";
import Container from "./Container";

const spacing = {
  sm: "py-12",
  md: "py-20",
  lg: "py-28",
  xl: "py-36",
};

export default function Section({
  children,
  id,
  className,
  size = "lg",
  container = true,
}) {
  const content = container ? (
    <Container>{children}</Container>
  ) : (
    children
  );

  return (
    <section
      id={id}
      className={clsx(
        "relative w-full",
        spacing[size],
        className
      )}
    >
      {content}
    </section>
  );
}