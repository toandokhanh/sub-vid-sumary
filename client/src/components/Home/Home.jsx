// rafce
import React from 'react'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <>
    <br/>
    <br/>
    <br/>
      <div className="container-fluid bg-light my-6 mt-0" id="home">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 py-6 pb-0 pt-lg-0 " style={{ marginTop: "129px" }}>
            <h1 className="mb-3" style={{ color: "#563D7C" }} >Subtitle Generator</h1>
            <h2 className="display-3 mb-3">Build standard subtitles for your videos.</h2>
            <div className="typed-text d-none">Create Subtitles Now !!</div>
            <div className="d-flex align-items-center pt-5">
              <Link to="/register" style={{ backgroundColor: "#563D7C", color:'#ffffff' }} className="btn py-3 px-4 me-5">Sign up</Link>
              
              <h5 className="ms-4 mb-0 d-none d-sm-block"><Link style={{ color:'#000000', textDecoration: 'none' }} to="/login">Create Subtitles</Link></h5>
            </div>
          </div>
          <div className="col-lg-6" style={{ marginTop: "129px" }}>
            <img className="img-fluid" src='https://cdn-site-assets.veed.io/Add_Subtitles_to_Video_2dfa45d60e/Add_Subtitles_to_Video_2dfa45d60e.png?width=768&quality=75' alt="" />
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default Home
