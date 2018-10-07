import Button from '@core/button'
import firebase from 'firebase'
import 'isomorphic-unfetch'
import React, { PureComponent } from 'react'
import styles from './styles.css'
import { ISignInState } from './types'

export default class SignIn extends PureComponent<{}, ISignInState> {
  public state: ISignInState = {
    user: null,
    email: '',
    password: '',
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

  public handleLogin = (): void => {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  public toggleRegister = (): void => {
    this.setState({ isSignUp: !this.state.isSignUp })
  }

  public render(): JSX.Element {
    const { user, email, password, isSignUp }: ISignInState = this.state

    return (
      <main className={styles.signUp}>
        <div className={styles.navigateBack}>
          <Button type="link" target="/">
            Back
          </Button>
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
              <form className={styles.registerForm} onSubmit={this.handleSubmit}>
                <input type={'email'} placeholder={'Email'} onChange={this.handleEmail} value={email} />
                <input type={'password'} placeholder={'Password'} onChange={this.handlePassword} value={password} />
                <button className={styles.button} type="submit">
                  {isSignUp ? `Sign up` : `Login`}
                </button>
              </form>
              <p className={styles.toggleSignUp} onClick={this.toggleRegister}>
                {isSignUp ? `Already have an account? Click here.` : `Don't have an account? Click here.`}
              </p>
            </>
          )}
        </div>
      </main>
    )
  }

  private handleEmail = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ email: event.currentTarget.value })
  }

  private handlePassword = (event: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ password: event.currentTarget.value })
  }

  private handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    {
      this.state.isSignUp
        ? firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
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
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
              this.setState({ isSignUp: false })
            })
            // tslint:disable-next-line:no-any
            .catch((error: any) => {
              // tslint:disable-next-line:no-console
              console.log(error)
            })
    }
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
