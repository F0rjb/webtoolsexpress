import { current } from "@reduxjs/toolkit"
import {
  MDBModal,
  MDBModalContent,
  MDBModalDialog,
  MDBSpinner,
} from "mdb-react-ui-kit"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const LoadingToRedirect = () => {
  const [count, setcount] = useState(5)
  const navigate = useNavigate()
  useEffect(() => {
    const interval = setInterval(() => {
      setcount((currentCount) => currentCount - 1)
    }, 1000)
    count === 0 && navigate("/auth")
    return () => clearInterval(interval)
  }, [count, navigate])

  return (
    <div className="vh-100 gradient-custom">
      {" "}
      <MDBModal show={true}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <p className="mt-3">Redirecting you in {count}</p>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </div>
  )
}

export default LoadingToRedirect
