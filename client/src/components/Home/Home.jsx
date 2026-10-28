import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Layout/Footer';

const Home = () => (
  <>
    <main className="container py-5">
      <div className="p-5 rounded" style={{ backgroundColor: '#f7f7f8' }}>
        <h1>Video subtitles and summaries</h1>
        <p className="lead">Upload a video, choose a noise-reduction method, then generate subtitles or an extractive text summary.</p>
        <Link to="/login" className="btn btn-primary">Get started</Link>
      </div>
      <section className="py-4">
        <h2>What you can do</h2>
        <ul><li>Noise reduction before transcription</li><li>Editable subtitle output</li><li>Extractive summaries and result history</li></ul>
        <p>Review the generated output and correct recognition or translation errors before sharing it.</p>
      </section>
    </main>
    <Footer />
  </>
);
export default Home;
