import { IInputProps } from '@core/form/input/types'
import { PureComponent } from 'react'
import styles from './styles.css'

export default class Checkbox extends PureComponent<IInputProps> {
  public render(): JSX.Element {
    const { type, name, label, id, formChildProps, required, checked } = this.props
    const { values, handleChange, handleBlur } = formChildProps
    let value

    if (name) {
      value = values[name]
    }

    return (
      <div className={styles.checkbox}>
        <input required={required} id={id ? id : name} type={type} name={name} value={value} checked={checked} onChange={handleChange} onBlur={handleBlur} />
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      </div>
    )
  }
}
