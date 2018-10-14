import { IInputProps } from '@core/form/input/types'
import classNames from 'classnames'
import { PureComponent } from 'react'
import styles from './styles.css'

export default class Input extends PureComponent<IInputProps> {
  public render(): JSX.Element {
    const { type, name, label, id, value, handleChange, handleBlur, handleFocus, isFocused } = this.props

    return (
      <div className={classNames(styles.input, { [styles.focused]: isFocused || value })}>
        <label className={styles.label}>{label}</label>
        <input id={id} type={type} name={name} value={value} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} placeholder={' '} />
      </div>
    )
  }
}
