export interface IInputProps extends React.HTMLProps<HTMLInputElement> {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void
  handleFocus: (event: React.FocusEvent<HTMLInputElement>) => void
  isFocused: boolean
  isTouched: boolean
}
