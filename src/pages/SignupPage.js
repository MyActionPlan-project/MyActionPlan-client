import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAge = (e) => setAge(e.target.value);
  const handleTelephoneNumber = (e) => setTelephoneNumber(e.target.value);
  const handleCity = (e) => setCity(e.target.value);

  
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, age, telephoneNumber, city };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };

  // useEffect(() => {
  //   axios
  //     .get(`${API_URL}/users/current`)
  //     .then((response) => {
  //       const userData = response.data;
  //       // Set the initial state of the age input field to the user's age
  //       setAge(userData.age);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <div className="SignupPage">
      <h1>Sign Up</h1>

      <form onSubmit={handleSignupSubmit}>
          
          <div>
            <label>Email: 
              <input type="email" name="email" value={email} onChange={handleEmail} />
            </label>
          </div>

          <div>
            <label>Password:
              <input type="password" name="password" value={password} onChange={handlePassword} />
            </label>
          </div>

          <div>
            <label>Name:
              <input type="text" name="name" value={name} onChange={handleName} />
            </label>
          </div>

          <div>
            <label htmlFor="birthday">Age:
              <input type="date" id="birthday" name="age" value={age} onChange={handleAge} />
            </label>
          </div>

          <div>
            <label>TelephoneNumber:
            <input type="text" name="telephoneNumber" value={telephoneNumber} onChange={handleTelephoneNumber} />
            </label>
          </div>

          <div>
            <label>City:
              <input type="text" name="city" value={city} onChange={handleCity} />
            </label>
          </div>

          <button type="submit">Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;