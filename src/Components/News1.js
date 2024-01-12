import React, { useEffect, useState } from "react";
import NewsItem1 from "./Newsitem";
import loader from "./loader2.gif";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News1 = (props) => {

    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const updateNews = async () => {
        props.setProgress(10);
        console.log(page);
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("cannot fetch data right now");
                }
                return response.json();
            })
            .then((parsedJson) => {
                setArticles(parsedJson.articles)
                setTotalResults(parsedJson.totalResults)
                setLoading(false)
            })
            .catch((error) => {
                console.error("error fetching data: ", error);
            });
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])

    // componentDidUpdate(prevProps) {
    //     if (props.category !== prevProps.category) {
    //         props.setProgress(0);
    //         updateNews();
    //         document.title = `News Dose -${capitalizeFirstLetter(
    //             props.category
    //         )}`;
    //     }
    // }
    const fetchMoreData = async () => {
        props.setProgress(10);
        setPage(page+1)
        console.log(page);
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("cannot fetch data right now");
                }
                return response.json();
            })
            .then((parsedJson) => {
                setArticles(articles.concat(parsedJson.articles))
                setTotalResults(parsedJson.totalResults)
            })
            .catch((error) => {
                console.error("error fetching data: ", error);
            });
        props.setProgress(100);
    };

    // const { articles } = state;
    return (
        <>
            <h2 className="text-center"> News Dose -Top {capitalizeFirstLetter(props.category)}{" "}
                Headlines </h2>
            {/* {loading && (<div className="text-center"><img src={loader} alt="Loading..." /></div>)} */}

            <InfiniteScroll
                dataLength={articles}
                next={null}
                hasMore={articles.length !== totalResults}
                loader={<h4 className="text-center"><img src={loader} alt="Loading..." /></h4>}
            >
                <div div className="container my-3 ">
                    <div className="row mb-3">
                        {articles && articles.map((element) => {
                            return (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem1 title={(element.title.length && element.title.length <= 45) || element.title === null
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
                    </div>
                </div>
            </InfiniteScroll>
        </>
    );

}

News1.defaultProps = {
    apiKey: "86f6428ba5424dcdb68b5ce55e1075bb",
    pageSize: 18,
    country: "in",
    category: "general",
};
News1.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
};

export default News1;
