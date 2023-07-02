import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MDBInput } from "mdb-react-ui-kit"
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/authApi"
import { toast } from "react-toastify"
import { useAppDispatch } from "../../app/hooks"
import { setUser } from "../../features/authSlice"
const initialState = { name: "", password: "", email: "", confirmPassword: "" }
const Auth = () => {
  const [FormValue, setFormValue] = useState(initialState)
  const { name, email, password, confirmPassword } = FormValue
  const [showRegister, setshowRegister] = useState(false)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const handleChange = (e: any) => {
    setFormValue({ ...FormValue, [e.target.name]: e.target.value })
  }
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation()

  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation()

  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password })
    } else {
      toast.error("Please fill all input ")
    }
  }
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      return toast.error("Password do not match ")
    }
    if (name && email && password) {
      await registerUser({ name, email, password })
    } else {
      toast.error("Please fill all input ")
    }
  }
  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("User login successfully")
      dispatch(setUser({ name: loginData.user.name, token: loginData.token }))
      navigate("/dashboard")
    }
    if (isRegisterSuccess) {
      toast.success("User registered successfully")
      dispatch(
        setUser({ name: registerData.user.name, token: registerData.jwt }),
      )
      navigate("/dashboard")
    }
  }, [isLoginSuccess, isRegisterSuccess])
  useEffect(() => {
    try {
      if (isLoginError) {
        console.log(loginError)
        toast.error((loginError as any).data.message)
      }
      if (isRegisterError) {
        toast.error((registerError as any).data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }, [isLoginError, isRegisterError])

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-4 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-4 text-center">
                <div className="md-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">
                    {!showRegister ? "Login" : "Register"}
                  </h2>
                  <p className="text-white-50 mb-4">
                    {!showRegister
                      ? "please enter your email and password"
                      : "please enter user details"}
                  </p>
                  {showRegister && (
                    <>
                      <div className="form-outline form-white mb-4">
                        <MDBInput
                          type="text"
                          name="name"
                          value={name}
                          onChange={handleChange}
                          label="Name"
                          className="form-control form-control-lg"
                        />
                      </div>
                    </>
                  )}
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      label="Email"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      label="Password"
                      className="form-control form-control-lg"
                    />
                  </div>
                  {showRegister && (
                    <>
                      {" "}
                      <div className="form-outline form-white mb-4">
                        <MDBInput
                          type="password"
                          name="confirmPassword"
                          value={confirmPassword}
                          onChange={handleChange}
                          label="Confirm Password"
                          className="form-control form-control-lg"
                        />
                      </div>
                    </>
                  )}
                  {!showRegister ? (
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="button"
                      onClick={() => handleLogin()}
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="button"
                      onClick={() => {
                        handleRegister()
                      }}
                    >
                      Register
                    </button>
                  )}
                </div>
                <div>
                  <h5 className="mb-0">
                    {!showRegister ? (
                      <>
                        Don't have an account?{" "}
                        <p
                          className="text-white-50 fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setshowRegister(true)
                          }}
                        >
                          Sign up
                        </p>
                      </>
                    ) : (
                      <>
                        Already have an account{" "}
                        <p
                          className="text-white-50 fw-bold"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setshowRegister(false)
                          }}
                        >
                          Sign in
                        </p>{" "}
                      </>
                    )}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Auth
