import { IInputProps } from '@core/form/input/types'
import classNames from 'classnames'
import { PureComponent } from 'react'
import styles from './styles.css'

export default class Input extends PureComponent<IInputProps> {
  public render(): JSX.Element {
    const { type, name, label, id, formChildProps, required, checked } = this.props
    const { values, focused, handleChange, handleBlur, handleFocus } = formChildProps
    const isCheckbox = type === 'checkbox'
    let value
    let isFocused
    // let isTouched
    let validityHint: string

    if (name) {
      value = values[name]
      isFocused = focused[name]
      // isTouched = touched[name]
    }

    switch (type) {
      case 'email':
        validityHint = `Please type in a valid Email`
        break
      case 'password':
        validityHint = 'Needs to have at least 8 characters'
        break
      default:
        validityHint = 'This field seems invalid'
    }

    return (
      <div
        className={classNames({
          [styles.input]: !isCheckbox,
          [styles.checkbox]: isCheckbox,
          [styles.focused]: !isCheckbox && (isFocused || value)
        })}
      >
        <input
          required={required}
          id={id ? id : name}
          type={type}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={' '}
          pattern={type === 'password' ? '.{0}|.{8,}' : '{5,}'}
        />
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
        {validityHint && !isCheckbox && <span className={styles.validityHint}>{validityHint}</span>}
      </div>
    )
  }
}
