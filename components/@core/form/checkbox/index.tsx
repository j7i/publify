import { IInputProps } from '@core/form/input/types'
import { PureComponent } from 'react'
import styles from './styles.css'

export default class Checkbox extends PureComponent<IInputProps> {
  public render(): JSX.Element {
    const { name, label, id, formChildProps, required, checked } = this.props
    const { values, handleChange, handleBlur } = formChildProps
    let isChecked

    if (name) {
      isChecked = values[name] === true || checked ? true : false
    }

    return (
      <div className={styles.checkbox}>
        <input required={required} id={id ? id : name} type={'checkbox'} name={name} checked={isChecked} onChange={handleChange} onBlur={handleBlur} />
        <label className={styles.label} htmlFor={name}>
          {label}
        </label>
      </div>
    )
  }
}
