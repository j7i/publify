import { IInputProps } from '@core/form/input/types'
import classNames from 'classnames'
import { PureComponent } from 'react'
import styles from './styles.css'

export default class Input extends PureComponent<IInputProps> {
  public render(): JSX.Element {
    const { type, name, label, id, value, handleChange, handleBlur, handleFocus, isFocused } = this.props

    let validityHint: string

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
      <div className={classNames(styles.input, { [styles.focused]: isFocused || value })}>
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={' '}
          pattern={type === 'password' ? '.{0}|.{8,}' : '{5,}'}
        />
        <label className={styles.label}>{label}</label>
        <div className={styles.validityHint}>{validityHint}</div>
      </div>
    )
  }
}
