import React, { Component } from "react";
import NewsItem from "./Newsitem";
import loader from "./loader2.gif";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    // apiKey: "86f6428ba5424dcdb68b5ce55e1075bb",
    apiKey: "7c5e849941684871bbceccc8b1e98b23",
    pageSize: 18,
    country: "in",
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = { articles: [], loading: false, page: 1, totalResults: 0 };
  }

  async updateNews() {
    this.props.setProgress(10);
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("cannot fetch data right now");
        }
        return response.json();
      })
      .then((parsedJson) => {
        this.setState({
          articles: parsedJson.articles,
          totalResults: parsedJson.totalResults,
          loading: false,
          // page:this.state.page+1
        });
      })
      .catch((error) => {
        console.error("error fetching data: ", error);
      });
    this.props.setProgress(100);
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.props.setProgress(0);
      this.updateNews();
      document.title = `News Dose -${this.capitalizeFirstLetter(
        this.props.category
      )}`;
    }
  }

  componentDidMount() {
    this.updateNews();
  }

  // // code to handle pagination(Manual buttons for next and previous)
  // handleNextButton = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  // handlePreviousButton = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  //this funtion belongs to infinite scroll
  fetchMoreData = async () => {
    this.props.setProgress(10);
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.setState({ page: this.state.page + 1 })
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("cannot fetch data right now");
        }
        return response.json();
      })
      .then((parsedJson) => {
        this.setState({
          articles: this.state.articles.concat(parsedJson.articles),
          totalRsult: parsedJson.totalResults,
        });
      })
      .catch((error) => {
        console.error("error fetching data: ", error);
      });
    this.props.setProgress(100);
  };
  render() {
    const { articles } = this.state;
    return (
      <>
        <h2 className="text-center" style={{margin:"35px 0px", marginTop:"90px"}}> News Dose -Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines </h2>
        {/* {this.state.loading && (<div className="text-center"><img src={loader} alt="Loading..." /></div>)} */}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<h4 className="text-center"><img src={loader} alt="Loading..." /></h4>}
        >
          <div div className="container my-3 ">
            <div className="row mb-3">
              {articles && articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem title={(element.title.length && element.title.length <= 45) || element.title === null
                      ? element.title : element.title && element.title.slice(0, 45) + "..."}
                      description={(element.description && element.description.length <= 88) ||
                        element.title === null ? element.description : element.description && element.description.slice(0, 88) + "..."
                      }
                      imageUrl={element.urlToImage} url={element.url} author={element.author !== null ? element.author : "Fragger"}
                      date={element.publishedAt} source={element.source.name}
                    />
                  </div>
                );
              })}
              {/* eslint-disable-next-line */}
            </div>
          </div>
        </InfiniteScroll>

        {/* 2 buttons for manual pagination */}
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.handlePreviousButton} >
            &larr; Previous
          </button>
          <button disabled={this.state.page > Math.ceil(this.state.totalRsult / this.props.pageSize)}
            className="btn btn-dark" onClick={this.handleNextButton}>Next &rarr; </button>
        </div> */}
      </>
    );
  }
}

export default News;
