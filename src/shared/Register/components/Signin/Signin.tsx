import React, { useCallback, useState } from 'react'
import { DispatchProps, StateProps } from "../../index"
import { Backdrop, TextField } from "@material-ui/core";
import classnames from 'classnames';
import classes from './Signin.module.scss'
import { Formik } from 'formik';
import { Button } from '../../../FormElements'
import { get } from 'lodash'

interface Props extends DispatchProps, StateProps {}

const Signin: React.FC<Props> = ({
    authUIState,
    signinStatus,
    signupStatus,
    userDetails,
    setAuthStateRequest,
    signinRequest,
    signupRequest
}: Props) => {
    const onSubmit = (values) => {
        if(loginstate) {
            signinRequest(values)
        } else {
            signupRequest(values)
        }
    }
    const [loginstate, setLoginState] = useState(true)
    const toggleRegisterState = useCallback(() => {
        setLoginState(!loginstate)
    },[loginstate, setLoginState])

    const toggleRegisterUI = useCallback(()=> {
        setAuthStateRequest(!authUIState)
    },[authUIState,setAuthStateRequest])

    return <Backdrop open={authUIState} className={classnames(classes.registerContainer)}>
            <div className={classnames(classes.signinContainer)}>
                <div className={classnames(classes.crossIconContainer)}>
                    <span 
                        className={classnames(classes.crossIcon)}
                        onClick={toggleRegisterUI}
                    ></span>
                </div>
                {
                    userDetails? 
                    <>
                        <div>{get(userDetails, "displayName","")}</div>
                        <div>{get(userDetails, "email","")}</div>
                        <div>{get(userDetails, "emailVerified",false)?"Email is verified": "Email not verified"}</div>
                        <div>{get(userDetails, "phoneNumber","")}</div>
                        <div>{get(userDetails, "lastSignInTime","")}</div>
                    </>
                    :<>
                        <div className={classnames(classes.registerTextContainer)}>
                            <div className={classnames(classes.mainText)}>{loginstate? "Login": "Sign Up"}</div>
                            <div className={classnames(classes.subText)}>
                                <span>or </span>
                                <span className={classnames(classes.subTextMain)} onClick={toggleRegisterState}>{loginstate?"create an account":"login to your account"}</span>
                            </div>
                        </div>
                        <div className={classnames(classes.signin)}>
                        {
                            loginstate?
                            <Formik
                                validateOnBlur
                                initialValues={{ 
                                    signinemail: "", 
                                    signinpassword: "" 
                                }}
                                onSubmit={(values) => {
                                    onSubmit({
                                        signinemail: values.signinemail,
                                        signinpassword: values.signinpassword
                                    });
                                }}
                            >
                                {({ handleSubmit, values, handleChange }) => (
                                    <form onSubmit={handleSubmit} noValidate className={classnames("d-flex","flex-col",classes.siginForm)}>
                                        {/* <TextField 
                                            id="signinphonenumber" 
                                            label="Phonne number" 
                                            type="text" 
                                            variant="standard" 
                                        /><br/> */}
                                        <TextField 
                                            id="signinemail" 
                                            label="Email Id" 
                                            type="email" 
                                            variant="standard" 
                                            value={values.signinemail}
                                            onChange={handleChange}
                                        /><br/>
                                        <TextField 
                                            id="signinpassword" 
                                            label="Password" 
                                            type="password" 
                                            variant="standard" 
                                            value={values.signinpassword}
                                            onChange={handleChange}
                                        /><br/>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            text="LOGIN"
                                            size={"sm"}
                                        />
                                    </form>
                                )}
                            </Formik>:
                            <Formik
                                validateOnBlur
                                initialValues={{ 
                                    signupName: "",
                                    signupEmail: "",
                                    signupPassword: ""
                                }}
                                onSubmit={(values) => {
                                    onSubmit({
                                        signupName: values.signupName,
                                        signupEmail: values.signupEmail,
                                        signupPassword: values.signupPassword
                                    });
                                }}
                            >
                                {({ handleSubmit, values, handleChange }) => (
                                    <form onSubmit={handleSubmit} noValidate className={classnames("d-flex","flex-col",classes.siginForm)}>
                                        {/* <TextField 
                                            id="signupphonenumber" 
                                            label="Phone number" 
                                            type="number" 
                                            variant="standard" 
                                        /><br/> */}
                                        <TextField 
                                            id="signupName" 
                                            label="Name" 
                                            type="text" 
                                            variant="standard" 
                                            value={values.signupName}
                                            onChange={handleChange}
                                        /><br/>
                                        <TextField 
                                            id="signupEmail" 
                                            label="Email" 
                                            type="email" 
                                            variant="standard" 
                                            value={values.signupEmail}
                                            onChange={handleChange}
                                        /><br/>
                                        <TextField 
                                            id="signupPassword" 
                                            label="Password" 
                                            type="password" 
                                            variant="standard" 
                                            value={values.signupPassword}
                                            onChange={handleChange}
                                        /><br/>
                                        <Button
                                            variant="primary"
                                            type="submit"
                                            text="CONTINUE"
                                            size={"sm"}
                                        />
                                    </form>
                                )}
                            </Formik>
                        }
                        </div>
                        
                        <div className={classnames()}>
                            {signinStatus}
                            {signupStatus}
                        </div>
                    </>
                }
            </div>
        </Backdrop>
}

export default Signin