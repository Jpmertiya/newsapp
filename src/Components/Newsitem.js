import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, url, author, date, source } =
      this.props;
    return (
      <div>
        <div className="card text-center" style={{ display: "block" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: "0" }}>
            <span className=" badge rounded-pill bg-danger">
              <span className="badge bg-danger">{source}</span>
            </span>
          </div>

          <img
            style={{ maxHeight: "200px", maxWidth: "available" }}
            src={
              imageUrl === null
                ? "https://cdn.ndtv.com/common/images/ogndtv.png"
                : imageUrl
            }
            className="card-img-top"
            alt={title}
          />
          <div className="card-body m-2">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {new Date(date).toUTCString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={url}
              target="_blank"
              className="btn btn-sm btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
