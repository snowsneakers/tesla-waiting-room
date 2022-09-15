import { useState, useEffect } from "react";
import Loader from "./Loader/Loader";
function RightBar() {
     const [articles, setArticles] = useState([]);
     const [loading, setLoading] = useState(false);

     const getArticles = async () => {
          setLoading(true);
          const res = await fetch(
               `https://newsapi.org/v2/everything?q=tesla&from=2022-08-30&sortBy=popularity&apiKey=${process.env.REACT_APP_KEY}`
          );
          const data = await res.json();
          if (res.ok) {
               setArticles(data.articles);
               setLoading(false);
          }
     };

     useEffect(() => {
          getArticles();
     }, []);

     // console.log(articles);

     return (
          <div className="w-[30%] max-h-screen p-5  overflow-scroll scrollbar-hide">
               <header className="">
                    <h1 className="text-3xl font-bold">News</h1>
               </header>
               <div className="p-5 bg-white mb-5 rounded-xl">
                    {loading ? (
                         <Loader />
                    ) : (
                         articles
                              .filter((article, index) => index < 10)
                              .map((article) => {
                                   return (
                                        <div
                                             key={article.title}
                                             className="mb-5"
                                        >
                                             <a
                                                  href={article.url}
                                                  target="_blank"
                                                  rel="noreferrer"
                                             >
                                                  <div>
                                                       <img
                                                            src={
                                                                 article.urlToImage
                                                            }
                                                            alt="article"
                                                            className="mb-2"
                                                       />
                                                       <h2>{article.title}</h2>
                                                  </div>
                                             </a>
                                        </div>
                                   );
                              })
                    )}
               </div>
          </div>
     );
}
export default RightBar;
