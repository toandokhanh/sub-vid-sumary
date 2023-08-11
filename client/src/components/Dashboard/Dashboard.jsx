import React, {useState} from 'react'
import CustomNavbar from '../Layout/CustomNavbar'
import { Form, Button } from 'react-bootstrap';
import {Link} from 'react-router-dom'
import '../../App.css'
function Dashboard() {
  const [file, setFile] = useState(null);
  const [sourceLanguage, setSourceLanguage] = useState('');
  const [NoiseReduction, setNoiseReduction] = useState('');
  const [TextSummarization, setTextSummarization] = useState('');
  const [SummarySentences, setSummarySentences] = useState('');
  const [noiseReductionAlgorithm, setNoiseReductionAlgorithm] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setFile(null);
    setSourceLanguage('');
    setNoiseReduction('');
    setTextSummarization('');
    setSummarySentences('');
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
          <option value="vi">Tiếng việt</option>
          <option value="en">English</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Noise reduction algorithm</Form.Label>
        <Form.Control as="select" value={NoiseReduction} onChange={(e) => setNoiseReduction(e.target.value)}>
          <option value="no">Do not use algorithms</option>
          <option value="deep">DeepFilterNet</option>
          <option value="noise">NoiseReduce</option>
          {/* Add other language options here */}
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Text summarization algorithm</Form.Label>
        <Form.Control as="select" value={TextSummarization} onChange={(e) => setTextSummarization(e.target.value)}>
          <option value="lexrank">Giải thuật Lexrank</option>
          <option value="textrank">Giải thuật Textrank</option>
          <option value="lsa">Giải thuật LSA</option>
          <option value="random">Giải thuật Random</option>
          <option value="reduction">Giải thuật Reduction</option>
          <option value="edmundson">Giải thuật Edmundson</option>
          <option value="kl">Giải thuật KL-sum</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Summary sentences</Form.Label>
        <Form.Control
          type="number"
          value={SummarySentences}
          onChange={(e) => setSummarySentences(e.target.value)}
          max={10}
          min={1}
        />
      </Form.Group>
      <br/>
      <Button variant="primary" type="submit" className="custom-button">
        Submit
      </Button>
    </Form>
    </div>
    </>
  )
}

export default Dashboard