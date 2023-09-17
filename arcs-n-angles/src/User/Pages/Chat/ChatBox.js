import React, { useEffect, useState } from 'react'
import './ChatBox.css';
import Box from '@mui/material/Box';
import { Backdrop, Button, Fade, IconButton, Input, Modal, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AttachmentIcon from '@mui/icons-material/Attachment';
import FsLightbox from "fslightbox-react"

const ChatBox = () => {

  const [attachment, setAttachment] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [toggler, setToggler] = useState([]);
  const [photo, setPhoto] = useState([]);

  const handleUploadfile = (event) => {
    console.log(attachment);
    const file = event.target.files[0];
    setAttachment(file);
    console.log(attachment);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  var uid = sessionStorage.getItem("uid");
  const bid = useParams();
  const [chat, setChat] = useState([]);
  const [txtmsg, setTxtmsg] = useState([]);
  console.log(sessionStorage.getItem("uid"));

  const fetchChat = () => {
    axios.get("http://localhost:4000/userbuilderchat/" + sessionStorage.getItem("uid") + "&" + bid.bid)
      .then((response) => {
        var data = response.data.Chat;
        console.log(data);
        setChat(data);
      });
  };

  useEffect(() => {
    fetchChat();
  }, []);

  const userbuilderchat = () => {
    var msg = {
      chat: txtmsg,
      bid: bid.bid,
      uid: sessionStorage.getItem("uid"),
    }
    axios.post("http://localhost:4000/userbuilderchat/", msg).then((response) => {
      fetchChat();
      setTxtmsg("");
      document.getElementById("chat_msg").animate({ scrollTop: document.getElementById("chat_msg")[0].scrollHeight });
    })
  }

  const chatattachmentuserbuilder = () => {
    let formData = new FormData();
    formData.append("uid", sessionStorage.getItem("uid"));
    formData.append("attachment", attachment);
    formData.append("bid", bid.bid);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    axios.post("http://localhost:4000/chatattachmentuserbuilder/", formData, config).then((response) => {
      alert(response.data.message);
      fetchChat();
      handleClose();
    })
  }
  return (
    <>
      <Box className='chat_container'>
        <Box className='chat_bottom'>
          <Box className='chat_attach'>
            <IconButton sx={{ paddingLeft: "0" }} onClick={handleClickOpen}>
              <AddCircleOutlineIcon className='icon_attach' />
            </IconButton>
          </Box>
          <Box className='chat_input'>
            <input className='chat_text' value={txtmsg} onChange={(c) => setTxtmsg(c.target.value)} placeholder="Type Your Message Here" />
          </Box>
          <Box>
            <Button className='send_btn' onClick={userbuilderchat}>
              <SendIcon />
            </Button>
          </Box>
        </Box>
        <Box className="chat_msg">
          {chat.map((chat) => (
            <>
              {chat.from_userid == uid && (
                <Box className='chat_sendbox'>
                  <Box className='chat_send_container'>
                    {
                      chat.chat_content == "" && (
                        <img className='chatAttachment sendImage' onClick={()=>{
                          setToggler(!toggler);
                          setPhoto(chat.chat_attachment);
                        }} src={chat.chat_attachment} />
                      )
                    }
                    {
                      chat.chat_content !== "" && (
                        <Box className='chat_box send'>
                          {chat.chat_content}
                        </Box>
                      )
                    }
                  </Box>
                  <Box className='chattime_box'>
                    <Typography className='chat_time'>{chat.chat_datetime}</Typography>
                  </Box>
                </Box>
              )}
              {chat.to_userid == uid && (
                <Box className='chat_recievebox'>
                  <Box className='chat_recieved_container'>
                    {
                      chat.chat_content == "" && (
                        <img className='chatAttachment recieveImage' src={chat.chat_attachment}  onClick={()=>{
                          setToggler(!toggler);
                          setPhoto(chat.chat_attachment);}} />
                      )
                    }
                    {
                      chat.chat_content !== "" && (
                        <Box className='chat_box recieved'>
                          {chat.chat_content}
                        </Box>
                      )
                    }
                  </Box>
                  <Box className='chattime_box'>
                    <Typography className='chat_time'>{chat.chat_datetime}</Typography>
                  </Box>
                </Box>
              )}
            </>
          ))}
        </Box>

      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box className='chat_upload'>
            <Typography id="transition-modal-title" variant="h6" component="h2">{"Attack File"}</Typography>
            <Box className='attach_box'>
              <Button variant="contained" fullWidth component="label" className='uploadbtn'>
                {attachment ? attachment.name : "Upload" }
                <input hidden accept="image/*" type="file" onChange={handleUploadfile} />
                <AttachmentIcon sx={{marginLeft:".3rem"}} />
              </Button>
            </Box>
            <Box className='btnact'>
              <Button onClick={handleClose} className='uploadbtn'>Cancel</Button>
              <Button onClick={chatattachmentuserbuilder} className='uploadbtn'>Send</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
      <FsLightbox toggler={toggler} sources={[photo]} />
    </>

  )
}

export default ChatBox