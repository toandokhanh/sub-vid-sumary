import React, {useState} from 'react'
import CustomNavbar from '../Layout/CustomNavbar'
import { Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import '../../App.css'
function Dashboard() {
  const [file, setFile] = useState(null);
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [subtitleName, setSubtitleName] = useState('');
  const [noiseReductionAlgorithm, setNoiseReductionAlgorithm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform any necessary actions with the form data here
    // For example, you can send the form data to a server using fetch or Axios
    // ...

    // Reset form values after submission
    setFile(null);
    setSourceLanguage('');
    setTargetLanguage('');
    setSubtitleName('');
    setNoiseReductionAlgorithm('');
  };
  return (
    <>
    <CustomNavbar />
    <div className='container-video'>
      <h2>Categorize topics and summarize Video</h2>
      <br/>
      <Form onSubmit={handleSubmit} encType="multipart/form-data" className="index">
      <Form.Group>
        <Form.Label>Choose a file</Form.Label>
        <Form.Control type="file" onChange={(e) => setFile(e.target.files[0])} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Source language (input)</Form.Label>
        <Form.Control as="select" value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
          {/* Add other language options here */}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Target language (output)</Form.Label>
        <Form.Control as="select" value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
          <option value="english">English</option>
          <option value="french">French</option>
          <option value="spanish">Spanish</option>
          {/* Add other language options here */}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>New subtitle name</Form.Label>
        <Form.Control
          type="text"
          value={subtitleName}
          onChange={(e) => setSubtitleName(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Noise reduction algorithm</Form.Label>
        <Form.Control
          type="text"
          value={noiseReductionAlgorithm}
          onChange={(e) => setNoiseReductionAlgorithm(e.target.value)}
        />
      </Form.Group>
      <br/>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
    </>
  )
}

export default Dashboard