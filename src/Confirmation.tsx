import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './Confirmation.css';

function Confirmation() {
  const location = useLocation();
  const [status, setStatus] = useState("Confirming your email...");
  const [error, setError] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tokenHash = params.get("token_hash");
    const type = params.get("type");
    const email = params.get("email");

    if (tokenHash && type && email) {
      fetch(`https://chefster.the-orange-house.com/auth/verify-email?tokenHash=${tokenHash}&type=${type}&email=${email}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(_ => {
          setStatus("Email confirmed successfully!");
        })
        .catch(error => {
          console.error("Confirmation error:", error);
          setError(true);
          setStatus("Error confirming email.");
        });
    } else {
        setStatus("Invalid confirmation link.");
    }
  }, [location]);

  return (
    <div className="confirmation-container">
      <h1>{status}</h1>
      {error ? (
        <p>Could not confirm your email. Please try again or contact support.</p>
      ) : (
        <p>You can now close this tab and return to the application.</p>
      )}
    </div>
  );
}

export default Confirmation;