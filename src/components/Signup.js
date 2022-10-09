import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useCode } from "../contexts/CodeContext";
import { Link, useHistory } from "react-router-dom";
import referralCodeGenerator from "referral-code-generator";
import { doc, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { colRef, db } from "../firebase";
import validator from "validator";
export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const nameRef = useRef();
  const [phone, setPhoneNumber] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const { signup } = useAuth();
  const { setUserCode, setReferralCounts } = useCode();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }
    const isValidPhoneNumber = validator.isMobilePhone(phone);
    if (!isValidPhoneNumber) {
      return setError("Wrong Mobile Number");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);

      let userEmail = emailRef.current.value;
      const uniqueCode =
        userEmail.substring(0, 3) +
        referralCodeGenerator.alphaNumeric("uppercase", 3, 2).substring(0, 5);
      setUserCode(uniqueCode);
      console.log(uniqueCode);
      setReferralCounts(0);
      addDoc(colRef, {
        name: nameRef.current.value,
        phone: phone,
        email: emailRef.current.value,
        code: uniqueCode,
        count: 0,
      }).catch((err) => console.log(err));
      getDocs(colRef)
        .then((snapshot) => {
          snapshot.docs.forEach((docdata) => {
            if (referralCode === docdata.data().code) {
              console.log("Hello World", docdata.id);
              const updateRef = doc(db, "referal-codes", docdata.id);
              let increment = docdata.data().count + 1;
              updateDoc(updateRef, {
                count: increment,
              }).catch((err) => console.log("update error", err));
            }
          });
        })
        .catch((err) => console.log(err));
      history.push("/");
    } catch (err) {
      console.log(err);
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="referral-code">
              <Form.Label>Referral Code</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setReferralCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="phone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </>
  );
}
