import { useQuery, NetworkStatus } from "@apollo/client";
import { useState } from "react";
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

  if (networkStatus === NetworkStatus.loading && !data) {
    return <div>Loading...</div>;
  }

  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      Launches list
      <br />
      <button
        onClick={() => {
          const length = data!.launches.length;

          fetchMore({
            variables: {
              limit: 10,
              offset: length,
            },
          }).then((res) => {
            setLimit(length + res.data.launches.length);
          });
        }}
      >
        Fetch more
      </button>
      <ul className="list">
        {data &&
          data.launches.map((item) => {
            return <LaunchesListElement key={item.id} item={item} />;
          })}
        {networkStatus === NetworkStatus.fetchMore && <li>Loading</li>}
      </ul>
    </div>
  );
};

export default Launches;
