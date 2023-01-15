type ButtonProps = {
  children: React.ReactNode;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

export function Button(props: ButtonProps) {
  return <button {...props} />;
}
