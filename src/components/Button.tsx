// Note: I'm not really using this wrapper effectively.
// It's mostly here just for practice.

export const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
> = ({ children, className, ...rest }) => (
  <button className={`text-white ${className}`} {...rest}>
    {children}
  </button>
);
