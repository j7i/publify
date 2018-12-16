import { IInputProps } from '@core/form/types'
import TextField from '@material-ui/core/TextField'
import { PureComponent } from 'react'

export class Input extends PureComponent<IInputProps> {
  public render(): JSX.Element {
    const { type, name, label, id, formChildProps, required, multiline } = this.props
    const { values, handleChange } = formChildProps
    let value
    // let validityHint: string

    if (name) {
      value = values[name]
    }

    // switch (type) {
    //   case 'email':
    //     validityHint = `Please type in a valid Email`
    //     break
    //   case 'password':
    //     validityHint = 'Needs to have at least 8 characters'
    //     break
    //   default:
    //     validityHint = 'This field seems invalid'
    // }

    return (
      <TextField
        id={id ? id : name}
        type={type}
        multiline={multiline}
        name={name}
        label={label}
        value={value}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        required={required}
      />
    )
  }
}
