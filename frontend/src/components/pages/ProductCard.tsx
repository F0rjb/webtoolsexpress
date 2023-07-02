import {
  MDBCard,
  MDBCardBody,
  MDBCardLink,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardTitle,
} from "mdb-react-ui-kit"
import React from "react"

const ProductCard = ({ el }) => {
  return (
    <div>
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>{el.name}</MDBCardTitle>
          <MDBCardSubTitle>Card subtitle</MDBCardSubTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </MDBCardText>
          <MDBCardLink href="#">Card link</MDBCardLink>
          <MDBCardLink href="#">Another link</MDBCardLink>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}

export default ProductCard
