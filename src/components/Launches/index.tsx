import { useState, useEffect } from "react";
import { useQuery, NetworkStatus } from "@apollo/client";
import { GET_LAUNCHES } from "../../graphql/queries/GET_LAUNCHES";
import { LaunchList, LaunchVars } from "../../types/launches";
import LaunchesListElement from "./LaunchesListElement";
import "./Launches.css";

const Launches = () => {
  const [limit, setLimit] = useState(10);

  const { error, data, networkStatus, fetchMore } = useQuery<
    LaunchList,
    LaunchVars
  >(GET_LAUNCHES, {
    variables: {
      limit: limit,
      offset: 0,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const length = data!.launches.length;
        fetchMore({
          variables: {
            limit: limit,
            offset: length,
          },
        }).then((res) => {
          setLimit(length + res.data.launches.length);
        });
      }
    };
  }, [data, fetchMore]);

  if (networkStatus === NetworkStatus.loading && !data) {
    return <div>Loading...</div>;
  }

  if (error) return <div>{error.message}</div>;

  return (
    <div className="container">
      Launches list
      <ul className="list">
        {data &&
          data.launches.map((item) => {
            return <LaunchesListElement key={item.id} item={item} />;
          })}
        {networkStatus === NetworkStatus.fetchMore && (
          <li className="list__loading">Loading</li>
        )}
      </ul>
    </div>
  );
};

export default Launches;
