import UserSpecificContent from '@auth/userSpecificContent'
import Form from '@core/form'
import { IFormChildProps, IFormValues } from '@core/form/formHandler/types'
import Input from '@core/form/input'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import firebase from 'firebase'
import 'isomorphic-unfetch'
import React, { PureComponent } from 'react'
import styles from './styles.css'
import { ISignInState } from './types'

export default class SignIn extends PureComponent<{}, ISignInState> {
  public state: ISignInState = {
    isSignUp: false
  }

  public toggleRegister = (): void => {
    this.setState({ isSignUp: !this.state.isSignUp })
  }

  public render(): JSX.Element {
    const { isSignUp }: ISignInState = this.state

    return (
      <main className={styles.signUp}>
        <div className={styles.signUpContainer}>
          <UserSpecificContent>
            {// tslint:disable-next-line:no-any
            (user: any): JSX.Element => {
              return user ? (
                <>
                  <h2>Congrats 🎉 </h2>
                  <p>{isSignUp ? `You signed up` : `You're logged in`}</p>
                  <button className={styles.button} onClick={this.handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <h1>{isSignUp ? `Create an Account` : `Login`}</h1>
                  <Form onSubmit={this.handleSubmit} className={styles.registerForm}>
                    {(formChildProps: IFormChildProps): JSX.Element => (
                      <>
                        <Input type={'email'} name="email" label={'Email'} formChildProps={formChildProps} />
                        <Input type={'password'} name="password" label={'Password'} formChildProps={formChildProps} />
                        <button className={styles.button} type="submit">
                          {isSignUp ? `Sign up` : `Login`}
                        </button>
                      </>
                    )}
                  </Form>
                </>
              )
            }}
          </UserSpecificContent>
        </div>
        <UserSpecificContent>
          {// tslint:disable-next-line:no-any
          (user: any): JSX.Element => {
            return !user ? (
              <p className={styles.toggleSignUp} onClick={this.toggleRegister}>
                {isSignUp ? `Already have an account? Click here.` : `Don't have an account? Click here.`}
              </p>
            ) : (
              <></>
            )
          }}
        </UserSpecificContent>
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
