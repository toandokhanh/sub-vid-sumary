import React, { useState , useEffect} from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import { MDBBtn } from 'mdb-react-ui-kit';
import CustomNavbar from '../Layout/CustomNavbar'
import { useParams } from 'react-router-dom';
import { apiUrl } from '../../contexts/constant';
import axios from 'axios';
import '../../App.css'
function SubtitleDetail() {
  const params = useParams();
  const [subtitles, setSubtitles] = useState([
    // Initialize subtitles data here
  ]);
  const [detailResult, setDetailResult] = useState();
  
  useEffect(() => {
    axios.get(`${apiUrl}/video/get/summary/detail/${params.id}`)
      .then((response) => {
        setDetailResult(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const handleAddSubtitle = () => {
    const newSubtitle = {
      start_time: '00:00:00,000',
      end_time: '00:00:00,000',
      text: '',
    };
    setSubtitles((prevSubtitles) => [...prevSubtitles, newSubtitle]);
  };

  const handleDeleteSubtitle = (index) => {
    setSubtitles((prevSubtitles) =>
      prevSubtitles.filter((_, i) => i !== index)
    );
  };

  const handleSubtitleChange = (index, field, value) => {
    setSubtitles((prevSubtitles) => {
      const newSubtitles = [...prevSubtitles];
      newSubtitles[index][field] = value;
      return newSubtitles;
    });
  };

  const handleSubmit = (index, field, value) => {
    console.log('Submit');
  };
  return (
    <>
    <CustomNavbar/>
    <br/>
        <div>
            <div className="container" style={{ display: 'flex' , gap:'10px'}}>
                <div className="left" >
                    <div id="wrapper" style={{ border: '3px solid black' }}>
                        <Form>
                        <Table striped bordered hover>
                            <thead>
                            <tr>
                                <th>Start time</th>
                                <th>End time</th>
                                <th>Text</th>
                            </tr>
                            </thead>
                            <tbody>
                            {subtitles.map((sub, index) => (
                                <tr key={index}>
                                <td>
                                    <Form.Control
                                    type="text"
                                    value={sub.start_time}
                                    onChange={(e) =>
                                        handleSubtitleChange(index, 'start_time', e.target.value)
                                    }
                                    />
                                </td>
                                <td>
                                    <Form.Control
                                    type="text"
                                    value={sub.end_time}
                                    onChange={(e) =>
                                        handleSubtitleChange(index, 'end_time', e.target.value)
                                    }
                                    />
                                </td>
                                <td style={{ position: 'relative' }}>
                                    <Form.Control
                                    as="textarea"
                                    rows={4}
                                    value={sub.text}
                                    onChange={(e) =>
                                        handleSubtitleChange(index, 'text', e.target.value)
                                    }
                                    required
                                    />
                                    <span
                                    style={{
                                        fontSize: '8px',
                                        color: '#6244c5',
                                        marginTop: '-100px',
                                        position: 'absolute',
                                        top: '143%',
                                        left: '-380px',
                                        cursor: 'pointer',
                                        fontWeight: 700,
                                    }}
                                    >
                                    {index + 1}
                                    </span>
                                    <span
                                    style={{
                                        fontSize: '8px',
                                        color: '#6244c5',
                                        marginTop: '-100px',
                                        position: 'absolute',
                                        top: '120%',
                                        right: '-10px',
                                        cursor: 'pointer',
                                    }}
                                    >
                                    <i className="fa fa-plus fa-2x" onClick={handleAddSubtitle}></i>
                                    </span>
                                    <span
                                    style={{
                                        fontSize: '8px',
                                        color: '#b93a3c',
                                        marginTop: '-100px',
                                        position: 'absolute',
                                        top: '165%',
                                        right: '-10px',
                                        cursor: 'pointer',
                                    }}
                                    >
                                    <i
                                        className="fa fa-times fa-2x"
                                        onClick={() => handleDeleteSubtitle(index)}
                                    ></i>
                                    </span>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Button
                            variant="primary"
                            style={{ margin: '0px 235px', backgroundColor: '#563D7C' }}
                            onClick={handleSubmit}
                        >
                            Update subtitle
                        </Button>
                        <p></p>
                        </Form>
                    </div>
                </div>
                <div className="right" >
                <video
                    id="my-video-player"
                    style={{ border: '3px solid black' }}
                    width="760"
                    height="470"
                    controls
                >
                    <source
                    src="video_url"
                    type="video/mp4"
                    />
                </video>
                <MDBBtn
                    className="change"
                    style={{
                    cursor: 'pointer',
                    backgroundColor: '#563D7C',
                    color: '#ffffff',
                    }}
                    data-name="filename"
                    data-nn="session['nn']"
                >
                    Switch to the original language
                </MDBBtn>
                </div>
            </div>
            {/* You can include MDB React UI Kit styles and scripts here */}
            </div>
    </>
  );
}

export default SubtitleDetail;
