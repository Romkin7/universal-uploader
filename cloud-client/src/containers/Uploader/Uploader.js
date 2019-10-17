import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiCall, setHeader } from "../../services/requests";
import "./Uploader.css";
import ListItem from "../../components/ListItem/ListItem";
import Message from "../../components/Message/Message";
import Loading from "../../components/Loading/Loading";

class Uploader extends Component{
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            error: false,
            loading: false,
            fetching: false,
            showMessage: false,
            downloading: false
        }
    }

    handleOnDrop = (event) => {
        this.setState({
            loading: true
        });
        const formdata = new FormData();
        formdata.append("file_upload", event.target.files[0])
        setHeader("multipart/form-data", null);
        apiCall("post", "api/upload", formdata).then(() => {
            this.setState({
                loading: true,
                fetching: true,
                showMessage: true
            });
            this.handleFileFetching();
        }).catch((error) => {
            this.showMessageHandler(error);
        });
    }

    handleFileFetching = () => {
        apiCall("get", "api/fetch", false).then((response) => {
            this.setState({
                files: response,
                loading: false,
                fetching: false
            });
        }).catch((error) => {
            this.showMessageHandler(error);
        });
    }

    handleFileDownload = (id) => {
        debugger;
        this.setState({
            loading: true,
            downloading: true
        })
        apiCall("get", "api/download?id="+id, {responseType: 'blob'}).then((response) => {
            const defaultFilename = "default.pdf";
            const data = new Blob([response.fileBinary]);
            if (typeof window.navigator.msSaveBlob === 'function') {
              // If it is IE that support download blob directly.
              window.navigator.msSaveBlob(data, defaultFilename);
            } else {
              const blob = data;
              const link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = defaultFilename;
              document.body.appendChild(link);
              link.click(); // create an <a> element and simulate the click operation.
              this.showMessageHandler(false);
            }
        }).catch((error) => {
            this.showMessageHandler(error);
        });
    };

    showMessageHandler = (error) => {
        this.setState({
            error: error,
            showMessage: true,
            loading: false,
            fetching: false
        });
    };

    closeMessageHandler = () => {
        this.setState({
            error: false,
            showMessage: false,
            downloading: false
        });
    };

    componentDidMount() {
        this.setState({
            loading: true,
            fetching: true
        })
        this.handleFileFetching();
    }

    render() {
        //make a list of li items that is sorted alphabetically and contains thumbnails for files and folders
        const list = this.state.files.sort((a, b) => {
            // sort alphabetically, all files we get from dropbox
            if ((a['.tag'] === 'folder' || b['.tag'] === 'folder')
              && !(a['.tag'] === b['.tag'])) {
              return a['.tag'] === 'folder' ? -1 : 1
            } else {
              return a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
            }
          }).map((file) => {
            const type = file['.tag']
            let thumbnail
            if (type === 'file') {
                thumbnail = file.thumbnail 
                ? `data:image/jpeg;base64, ${file.thumbnail}`
                : `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWZpbGUiPjxwYXRoIGQ9Ik0xMyAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOXoiPjwvcGF0aD48cG9seWxpbmUgcG9pbnRzPSIxMyAyIDEzIDkgMjAgOSI+PC9wb2x5bGluZT48L3N2Zz4=`
            } else {
                thumbnail = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLWZvbGRlciI+PHBhdGggZD0iTTIyIDE5YTIgMiAwIDAgMS0yIDJINGEyIDIgMCAwIDEtMi0yVjVhMiAyIDAgMCAxIDItMmg1bDIgM2g5YTIgMiAwIDAgMSAyIDJ6Ij48L3BhdGg+PC9zdmc+`
            }
            return(    
                <ListItem  key={file.id} thumbnail={thumbnail} clickHandler={() => this.handleFileDownload(file.id)} name={file.name} />
            );
        });

        // Set content that will be displayed in dropzone label
        const content = this.state.error 
        ? "Error occured while reading your file."
        : this.state.showMessage 
        ? "File is being uploaded to Dropbox..."
        : this.state.downloading 
        ? "File is downloaded Dropbox successfully"
        : "Click here to upload file to Dropbox";

        return (
            <>
                <main>
                    <section className="leftSection">
                        <form className="uploaderForm">
                        {this.state.showMessage && <Message bgColor={this.state.error ? "red" : "green"} closeMessageHandler={this.closeMessageHandler} message={this.state.error ? this.state.error.message : this.state.downloading ? "File has been downloaded from Dropbox" : "Success, file is uploaded to Dropbox!"} />}
                            <div className={"dropZone"+(this.state.error ? " danger" : this.state.showMessage ? " success" : "")}>
                                <label htmlFor="fileInput">
                                    <FontAwesomeIcon size="5x" color={(this.state.error ? "#b22222" : this.state.showMessage ? "#68d391" : "#0460f6")} icon={["fas", "cloud-upload-alt"]} /> 
                                    {content}
                                </label>
                                <input type="file" id="fileInput" name="file_upload" src={this.state.src} onChange={this.handleOnDrop} />
                            </div>
                        </form>
                    </section>
                    <section className="rightSection">
                        <h4><FontAwesomeIcon size="1x" color="#fff" icon={["fab", "dropbox"]} /> Dropbox Files</h4>
                        <ul>
                            {list}
                        </ul>  
                    </section>
                    {this.state.loading && <Loading text={ this.state.fetching ? "Fetching files from Dropbox..." : this.state.downloading ? "Downloading your file from Dropbox..." : "Your file is being uploaded to Dropbox..." } />}
                </main>
            </>
        )
    }
};

export default Uploader;