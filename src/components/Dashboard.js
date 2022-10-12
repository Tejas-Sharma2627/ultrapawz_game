import React, { useState } from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";
import { useCode } from "../contexts/CodeContext";
import { CopyToClipboard } from "react-copy-to-clipboard";
export default function Dashboard() {
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const { currentUser, logout } = useAuth();
  const { userCode, referralCounts } = useCode();
  const history = useHistory();
  const referrallLink = window.location.href+"signup?code="+userCode;
  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <div>
            <strong>Referals: </strong> {referralCounts}
          </div>
          <div>
            <strong>Unique Referral Code: </strong> {userCode}
          </div>
          <CopyToClipboard text={referrallLink} >
            <div
              className="btn btn-primary w-100 mt-3"
            >
              Generate Unique Referral Link
            </div>
          </CopyToClipboard>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
}
