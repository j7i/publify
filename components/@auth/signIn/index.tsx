import Button from '@core/button'
import Form from '@core/form'
import { IFormChildProps, IFormValues } from '@core/form/formHandler/types'
import Input from '@core/form/input'
import firebase from 'firebase'
import 'isomorphic-unfetch'
import React, { PureComponent } from 'react'
import styles from './styles.css'
import { ISignInState } from './types'

export default class SignIn extends PureComponent<{}, ISignInState> {
  public state: ISignInState = {
    user: null,
    isSignUp: false
  }

  public componentDidMount = (): void => {
    // tslint:disable-next-line:no-any
    firebase.auth().onAuthStateChanged((user: any) => {
      if (user) {
        this.setState({ user })
      } else {
        this.setState({ user: null })
      }
    })
  }

  public toggleRegister = (): void => {
    this.setState({ isSignUp: !this.state.isSignUp })
  }

  public render(): JSX.Element {
    const { user, isSignUp }: ISignInState = this.state

    return (
      <main className={styles.signUp}>
        <div className={styles.navigateBack}>
          <Button target="/">Back</Button>
        </div>
        <div className={styles.signUpContainer}>
          {user ? (
            <>
              <h2>Congrats 🎉 </h2>
              <p>{isSignUp ? `You signed up` : `You're logged in`}</p>
              <button className={styles.button} onClick={this.handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <h1>{isSignUp ? `Create an Account` : `Login`}</h1>
              <Form onSubmit={this.handleSubmit} className={styles.registerForm}>
                {(formChildProps: IFormChildProps): JSX.Element => {
                  const { values, touched, focused, handleChange, handleBlur, handleFocus } = formChildProps
                  return (
                    <>
                      <Input
                        type={'email'}
                        name="email"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        handleFocus={handleFocus}
                        value={values.email}
                        isFocused={focused.email}
                        isTouched={touched.email}
                        label={'Email'}
                      />
                      <Input
                        type={'password'}
                        name="password"
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        handleFocus={handleFocus}
                        value={values.password}
                        isFocused={focused.password}
                        isTouched={touched.password}
                        label={'Password'}
                      />
                      <button className={styles.button} type="submit">
                        {isSignUp ? `Sign up` : `Login`}
                      </button>
                    </>
                  )
                }}
              </Form>
            </>
          )}
        </div>
        <p className={styles.toggleSignUp} onClick={this.toggleRegister}>
          {isSignUp ? `Already have an account? Click here.` : `Don't have an account? Click here.`}
        </p>
      </main>
    )
  }

  // private handleLogin = (): void => {
  //   firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  // }

  private handleSubmit = async (values: IFormValues): Promise<void> => {
    // const {email, password} = event.target
    const { email, password } = values

    this.state.isSignUp
      ? firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          // tslint:disable-next-line:no-any
          .catch((error: any) => {
            // Handle Errors here.
            // const errorCode = error.code
            // const errorMessage = error.message
            // ...
            // tslint:disable-next-line:no-console
            console.log(error)
          })
      : firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ isSignUp: false })
          })
          // tslint:disable-next-line:no-any
          .catch((error: any) => {
            // tslint:disable-next-line:no-console
            console.log(error)
          })
  }

  private handleLogout = async (event: React.SyntheticEvent): Promise<void> => {
    event.preventDefault()
    firebase
      .auth()
      .signOut()
      .then(() => {
        // Sign-out successful.
      })
      // tslint:disable-next-line:no-any
      .catch((error: any) => {
        // tslint:disable-next-line:no-console
        console.log(error)
      })
  }
}
