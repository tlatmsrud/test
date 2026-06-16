interface Props {
  message?: string;
}

export const FieldError = ({ message }: Props) => {
  if (!message) return null;
  return <p className="mt-1 text-xs text-danger-500">{message}</p>;
};
