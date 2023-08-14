import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../contexts/constant';
import CustomNavbar from '../Layout/CustomNavbar'
function Subtitle() {
  const [videoFile, setVideoFile] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('vi');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [videoName, setVideoName] = useState('');
  const [algorithm, setAlgorithm] = useState('no');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVideoFile = (e) => {
    setVideoFile(e.target.files[0]);
    setVideoName(e.target.files[0].name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('inputFile', videoFile);
    if (videoFile.type !== 'video/mp4') {
      alert('Selected file is not a video MP4');
      setLoading(false);
      return;
    }
    try {
      const response = await axios.post(`${apiUrl}/upload/video`, formData);

      const videoForm = {
        video: videoName,
        sourceLanguage,
        targetLanguage,
        algorithm,
      };

      const createResponse = await axios.post(`${apiUrl}/video/create`, videoForm);

      if (createResponse.data.success) {
        setLoading(false);
        navigate('/video/summary/detail/' + createResponse.data.newVideo.date_time);
      }
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  return (
    <>
        <CustomNavbar />
        <div className='container-video'>
        <h2>Create Video Subtitles</h2>
        <br />
        <Form onSubmit={handleSubmit}>
            <Form.Group>
            <Form.Label>Choose a video file</Form.Label>
            <Form.Control type="file" accept="video/*" onChange={handleVideoFile} required />
            </Form.Group>

            <Form.Group>
            <Form.Label>Source language</Form.Label>
            <Form.Control as="select" value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
                <option value="vi">Vietnamese</option>
                <option value="en">English</option>
            </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Target language</Form.Label>
            <Form.Control as="select" value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
                <option value="en">Vietnamese</option>
                <option value="vi">English</option>
            </Form.Control>
            </Form.Group>

            <Form.Group>
            <Form.Label>Video name</Form.Label>
            <Form.Control type="text" value={videoName} onChange={(e) => setVideoName(e.target.value)} required />
            </Form.Group>

            <Form.Group>
            <Form.Label>Noise reduction algorithm</Form.Label>
            <Form.Control as="select" value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
                <option value="no">No algorithm</option>
                <option value="deep">DeepFilterNet</option>
                <option value="noise">NoiseReduce</option>
            </Form.Control>
            </Form.Group>
            <br/>
            <Button variant="primary" type="submit">
            Submit
            </Button>
        </Form>
        {loading && (
            <div className="loading-overlay">
            <Spinner animation="border" variant="info" />
            </div>
        )}
        </div>
    </>
  );
}

export default Subtitle;
