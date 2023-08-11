// rafce
import React from 'react'
import {Link} from 'react-router-dom'
import { Navbar} from 'react-bootstrap';
import Footer from '../Layout/Footer';
const Home = () => {
  return (
    <>
    <Navbar className='nav' expand="lg" style={{ backgroundColor: "#563D7C", width: '100%', height: '50px', paddingTop: '9px'}}>
    <div style={{ margin: '0 auto', display: 'flex' }}>
      <div style={{ marginTop: '5px' , color: '#ffffff'}}>
        The next generation of AI Subtitles is here  🚀
      </div>     
      <div className="">
        <Link to="https://github.com/toandokhanh/VidSubWizard" style={{ backgroundColor: "#ffffff", color:'#000000', borderRadius: '50px', marginLeft: '20px' }} className="btn py-1 px-2">Learn more</Link>
      </div>
    </div>
    </Navbar>
    <br/>
    <br/>
      <div className="container-fluid bg-light my-6 mt-0" id="home">
      <div className="container">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6 py-6 pb-0 pt-lg-0 " style={{ marginTop: "129px" }}>
            <h1 className="mb-3" style={{ color: "#563D7C" }} >Create a summary for the video</h1>
            <h2 className="display-3 mb-3">Build concise, accurate summaries of your long videos.</h2>
            <div className="typed-text d-none">Create Subtitles Now !!</div>
            <div className="d-flex align-items-center pt-5">
              <Link to="/login" style={{ backgroundColor: "#563D7C", color:'#ffffff', borderRadius: '50px' }} className="btn py-3 px-4 me-5">Create your first summary</Link>
            </div>
          </div>
          <div className="col-lg-6" style={{ marginTop: "129px" }}>
            <img className="img-fluid" src='https://cdn-site-assets.veed.io/Add_Subtitles_to_Video_2dfa45d60e/Add_Subtitles_to_Video_2dfa45d60e.png?width=768&quality=75' alt="" />
          </div>
        </div>
      </div>
      <div className="container" style={{ backgroundColor: '#f7f7f8', borderRadius: '20px', padding: '0 30px 30px 30px' }}>
        <div className="row g-5 align-items-center" style={{ marginTop: "60px" }}>
        <h3 style={{ margin: '15px 0 -27px 0', textAlign: 'left' }}>Video summary generator</h3>
          <div className="col-lg-6 py-6 pb-0 pt-lg-0 ">
          Are you looking for an online and automated tool to create subtitles for your videos? If so, TextVidSummarizer's auto caption generator is just what you're looking for - It's powerful, flexible, easy to use and best of all, adding subtitles is completely free! With TextVidSummarizer, you can easily subtitle your videos. You can then either embed them in the video permanently (hardcoded subtitles) or if you want you can download them as separate subtitle files (SRT, VTT, TXT, etc.). Our automatic caption generator uses artificial intelligence to create near-perfect captions for you. It can perform multiple tasks at once, such as automatic captioning, recording, and speech recognition.
          </div>
          <div className="col-lg-6">
          Simply upload your video and TextVidSummarizer will convert the audio to text, allowing you to edit as needed, and easily add that recording to your video with a single click. Combined with our simple yet powerful video editor, TextVidSummarizer is the best place to make your videos more accessible to more people. Translate Subtitles - Need more than just English subtitles? Then use TextVidSummarizer's Subtitle Generator to translate your text from English to other languages and vice versa. From Arabic to Armenian, or Spanish to Swahili, this tool will help you discover and create great videos in the process. Upgrade to TextVidSummarizer PRO Package to experience automatic translation.
          </div>
        </div>
      </div>
      <div className="container" style={{ backgroundColor: '#f7f7f8', borderRadius: '20px', padding: '0 30px 30px 30px'}}>
        <div className="row g-5 align-items-center" style={{ marginTop: "60px" }}>
        <h3 style={{ margin: '15px 0 -60px 0px', textAlign: 'left' }}>Summary type</h3>
          <div className="row g-5 align-items-center" style={{ display: 'flex', justifyContent: 'center' }}>
          <div className="col-lg-6">
          Choose from our massive collection of typefaces, sizes, designs, languages - it's all up to you! TextVidSummarizer gives the freedom to create videos that reflect your brand, message and style. You also have the ability to fine-tune text placement, letter spacing, and many other factors. We offer professionally designed summary styles that make your video editing quick and convenient. Once you've found the perfect recap style for your video, why not explore more stickers, emojis and smileys from our collection to make your videos come to life. more dynamic and creative?
          </div>
          <div className="col-lg-5">
          <img className="img-fluid" src='https://cdn-site-assets.veed.io/Create_content_that_speaks_to_your_market_8a4d4be5d6/Create_content_that_speaks_to_your_market_8a4d4be5d6.png?width=640&quality=75' alt="" />
          </div>
          </div>
        </div>
      </div>


      <div className="container" style={{ backgroundColor: '#f7f7f8', borderRadius: '20px', padding: '0 30px 30px 30px'}}>
        <div className="row g-5 align-items-center" style={{ marginTop: "60px" }}>
          <div className="row g-5 align-items-center" style={{ display: 'flex', justifyContent: 'center' }}>
          <h3 style={{ textAlign: 'center' }}>
          The Turn From Auto Captions!
          </h3>
          <p style={{ alignItems: 'center', textAlign: 'center' }}>
          Creating automatic captions is just the first step in your journey with TextVidSummarizer. TextVidSummarizer is a simple yet powerful online video editing platform. You can add progress bar, background music, stickers, filters, special effects and more. We built TextVidSummarizer so you can focus on creating great content without having to master complicated video editing software. Our video editor has been used and loved by creators, influencers, and marketers alike. Use TextVidSummarizer to expand your audience and increase engagement on popular social media platforms like Instagram, Facebook, Twitter, TikTok, LinkedIn and many more. Whether you're a beginner in video editing or a pro, TextVidSummarizer - an easy-to-use tool - will get the job done in minutes.
          </p>
          <Link to="/login" style={{ backgroundColor: "#563D7C", color:'#ffffff', borderRadius: '50px', width: '260px' }} className="btn py-3 px-4 me-5">Create your first summary</Link>
          <img className="img-fluid" src='https://cdn-site-assets.veed.io/morethan_8c1e4a3d1e_ab0f207654/morethan_8c1e4a3d1e_ab0f207654.png?width=1280&quality=75' alt="" />
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
    </>
  )
}

export default Home
