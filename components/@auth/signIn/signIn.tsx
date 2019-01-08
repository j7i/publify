import { UserSpecificContent } from '@auth'
import { firebaseApp } from '@config'
import { Form, IFormChildProps, Input } from '@core'
import Button from '@material-ui/core/Button'
import { IUserInfo } from '@user'
import classNames from 'classnames'
import 'isomorphic-unfetch'
import Router from 'next/router'
import React, { PureComponent, ReactNode } from 'react'
import styles from './signInStyles.css'
import { ILoginFormValues, ISignInState } from './types'

export const handleLogout = async (event: React.SyntheticEvent): Promise<void> => {
  event.preventDefault()
  firebaseApp
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error: firebase.auth.Error) => {
      // tslint:disable-next-line:no-console
      console.log(error)
    })
}

export class SignIn extends PureComponent<{}, ISignInState> {
  public state: ISignInState = {
    isSignUp: false
  }

  public render(): JSX.Element {
    const { isSignUp }: ISignInState = this.state

    return (
      <main className={styles.signInUp}>
        <div className={classNames(styles.signInUpContainer, 'mainContent')}>
          <UserSpecificContent>
            {(user: firebase.User, userInfo: IUserInfo): ReactNode => {
              return user ? (
                <>
                  <h2>
                    Hi {userInfo && userInfo.firstName}, <br />
                    {!isSignUp && `you are logged in.`}
                  </h2>
                  <p>{isSignUp && `You signed up`}</p>
                  <div className={styles.signInUpLogoutButtonContainer}>
                    <Button className={styles.signInUpLogoutButton} variant="contained" color="primary" type="submit" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h1>{isSignUp ? `Create an Account` : `Login`}</h1>
                  <Form onSubmit={this.handleSubmit} className={styles.registerForm}>
                    {(formChildProps: IFormChildProps): JSX.Element => (
                      <>
                        {isSignUp && (
                          <>
                            <Input type={'text'} name="firstName" label={'Firstname'} formChildProps={formChildProps} />
                            <Input type={'text'} name="lastName" label={'Lastname'} formChildProps={formChildProps} />
                          </>
                        )}
                        <Input type={'email'} name="email" label={'Email'} formChildProps={formChildProps} />
                        <Input type={'password'} name="password" label={'Password'} formChildProps={formChildProps} />
                        <Button className={styles.signInUpButton} variant="contained" color="primary" type="submit">
                          {isSignUp ? `Sign up` : `Login`}
                        </Button>
                      </>
                    )}
                  </Form>
                </>
              )
            }}
          </UserSpecificContent>
        </div>
        <UserSpecificContent>
          {(user: firebase.User): ReactNode => {
            return !user ? (
              <p className={styles.toggleSignInUp} onClick={this.toggleRegister}>
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

  private toggleRegister = (): void => {
    this.setState({ isSignUp: !this.state.isSignUp })
  }

  // private handleLogin = (): void => {
  //   firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
  // }

  private handleSubmit = async (values: ILoginFormValues): Promise<void> => {
    const { firstName, lastName, email, password } = values
    const firestore = firebaseApp.firestore()

    this.state.isSignUp
      ? firebaseApp
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then((resp: firebase.auth.UserCredential) => {
            firestore
              .collection('users')
              .doc(resp.user!.uid)
              .set({
                firstName,
                lastName,
                fullName: `${firstName} ${lastName}`,
                initials: firstName[0] + lastName[0],
                email
              })
          })
          .catch((error: firebase.auth.Error) => {
            // Handle Errors here.
            // const errorCode = error.code
            // const errorMessage = error.message
            // ...
            // tslint:disable-next-line:no-console
            console.log(error)
          })
      : firebaseApp
          .auth()
          .signInWithEmailAndPassword(email, password)
          .then(() => {
            this.setState({ isSignUp: false })
            Router.push('/dashboard')
          })
          .catch((error: firebase.auth.Error) => {
            // tslint:disable-next-line:no-console
            console.log(error)
          })
  }
}
