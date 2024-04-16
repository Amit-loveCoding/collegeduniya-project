import React, { useState, useEffect } from "react";
import "./Table.css";
import tableData from "../../Data/Data";

const Table = ({ searchQuery, sortOption }) => {
  const [visibleData, setVisibleData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [reachedEnd, setReachedEnd] = useState(false); // boolean  condition if all data has been loaded

  // Load initial data
  useEffect(() => {
    loadData();
  }, [searchQuery, sortOption]); // Reload data when searchQuery or sortOption changes

  // Load more data when user scrolls to the bottom
  useEffect(() => {
    if (!reachedEnd) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reachedEnd]); // Update event listener when reachedEnd changes

  let sortedData = [...tableData];

  if (sortOption === "rating") {
    sortedData.sort((a, b) => b.userReviews - a.userReviews);
  } else if (sortOption === "ranking") {
    sortedData.sort((a, b) => a.ranking - b.ranking);
  } else if (sortOption === "fees") {
    sortedData.sort((a, b) => {
      const feesA = parseInt(a.courseFees.replace("₹", "").replace(",", ""));
      const feesB = parseInt(b.courseFees.replace("₹", "").replace(",", ""));
      return feesA - feesB;
    });
  }

  const filteredData = sortedData.filter((item) =>
    item.college.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    const scrollTop =
      document.documentElement.scrollTop || document.body.scrollTop;
    const isBottom = windowHeight + scrollTop >= documentHeight - 100; // 100 is the threshold

    if (isBottom && !isLoading) {
      loadData();
    }
  };

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      const newData = tableData
        .filter((item) =>
          item.college.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .slice(0, visibleData.length + 10);

      setVisibleData(newData);
      setIsLoading(false);
      if (newData.length === tableData.length) {
        setReachedEnd(true);
      }
    }, 1000);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>CD Rank</th>
            <th>College</th>
            <th>Course Fees</th>
            <th>Placement</th>
            <th>User Reviews</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {visibleData.map((item, index) => (
            <tr key={index}>
              <td>{item.cdRank}</td>
              <td className={item.featured ? "featured-college" : ""}>
                {item.college} <br />
                {item.featured && (
                  <span className="featured-marker">
                    {" "}
                    <img
                      src={require("../../asset/image/featured.png")}
                      alt="Featured"
                    />
                  </span>
                )}{" "}
              </td>
              <td>{item.courseFees}</td>
              <td>{item.placement}</td>
              <td>{item.userReviews}</td>
              <td>{item.ranking}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <span className="loader">loading</span>}
      {reachedEnd && !isLoading && (
        <span className="end-message">No more data...</span>
      )}
    </div>
  );
};

export default Table;
