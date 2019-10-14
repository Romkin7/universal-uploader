import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Uploader.css";
import Message from "../../components/Message/Message";

class Uploader extends Component{

    onDrop = (acceptedFiles) => {
        console.log(acceptedFiles);
    }

    render() {
        // Files maximum allowed size, later in Dropzone component we refer to it.
        const maxSize = 1048576;
        return (
            <main>
                <form className="uploaderForm">
                    <Dropzone onDrop={this.onDrop} minSize={0} maxSize={maxSize} 
                        accept="image/jpg, image/png, image/jpeg, iapplication/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document" multiple>
                        {({acceptedFiles, getRootProps, getInputProps, isDragActive, isDragReject}) => (
                        <div>    
                            <div {...getRootProps()} className="dropZone">
                                <input {...getInputProps()} />
                                {isDragActive && <FontAwesomeIcon color="#68d391" size="4x" icon="cloud-upload-alt"></FontAwesomeIcon>}
                                {!isDragActive && <FontAwesomeIcon color="#68d391" size="4x" icon="cloud-upload-alt"></FontAwesomeIcon>}
                                {isDragReject && <Message message="We only accept pdf, jpg, jpeg, png, docx, doc, ppt, pptx filetypes." bgColor="message-red"></Message>}
                            </div>
                            <ul className="selectedFilesList">
                                {acceptedFiles.length && acceptedFiles.map((file) => {
                                    return(<li>{file.name == 0 ? "" : file.name}</li>)
                                })}
                            </ul>
                            <div className="formSubmitZone">
                                <button className="button button-red"><FontAwesomeIcon color="firebrick" size="1x" icon="times" /> Cancel</button>
                                <button className="button button-green"><FontAwesomeIcon color="#68d391" size="1x" icon="check" /> Upload</button>
                            </div>
                        </div>
                        )}
                    </Dropzone>
                </form>
            </main>
        )
    }
};

export default Uploader;