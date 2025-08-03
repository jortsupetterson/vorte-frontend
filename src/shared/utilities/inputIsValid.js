export default function  inputIsValid(pattern, value) {
  return new RegExp(`^(?:${pattern})$`).test(value);
}