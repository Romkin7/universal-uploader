import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Uploader.css";
import Message from "../../components/Message/Message";
import { apiCall, setHeader } from "../../services/requests";

class Uploader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    handleOnDrop = (event) => {
        this.setState({
            files: [...this.state.files, event.target.files[0]]
        });
    }

    componentDidUpdate() {
        const formdata = new FormData();
        formdata.append("file_upload", this.state.files[0])
        setHeader("multipart/form-data", null);
        apiCall("post", "/files/upload/dropbox", formdata);
    }

    render() {
        // Files maximum allowed size, later in Dropzone component we refer to it.
        const maxSize = 1048576;
        return (
            <main>
                <form className="uploaderForm">
                    <div className="dropZone">
                        <input type="file" name="file_upload" onChange={this.handleOnDrop} />
                    </div>
                </form>
            </main>
        )
    }
};

export default Uploader;