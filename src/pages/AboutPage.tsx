import React from 'react'

const AboutPage = ({isLoggedIn}) => {
  console.log("is logged in", isLoggedIn)
  return (
    <div>
      <h1>About page</h1>
      <p>Is Logged in {isLoggedIn}</p>
    </div>
  )
}

export default AboutPage