import { IInputProps } from '@core/form/types'
import { PureComponent } from 'react'
import styles from './checkboxStyles.css'

export class Checkbox extends PureComponent<IInputProps> {
  public render(): JSX.Element {
    const { name, label, id, formChildProps, required, checked } = this.props
    const { values, handleChange, handleBlur } = formChildProps
    let isChecked

    if (name) {
      isChecked = values[name] === true || checked ? true : false
    }

    return (
      <div className={styles.checkbox}>
        <input
          className={styles.checkboxInput}
          required={required}
          id={id ? id : name}
          type={'checkbox'}
          name={name}
          checked={isChecked}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <label className={styles.checkboxLabel} htmlFor={name}>
          {label}
        </label>
      </div>
    )
  }
}
