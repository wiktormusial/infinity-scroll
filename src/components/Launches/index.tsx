import { useQuery } from "@apollo/client";
import { GET_LAUNCHES } from "../../graphql/queries/GET_LAUNCHES";
import { LaunchList, LaunchVars } from "../../types/launches";
import LaunchesListElement from "./LaunchesListElement";

const Launches = () => {
  const { loading, error, data } = useQuery<LaunchList, LaunchVars>(
    GET_LAUNCHES,
    {
      variables: {
        limit: 10,
        offset: 0,
      },
    }
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      Launches list
      <ul>
        {data &&
          data.launches.map((item) => {
            return <LaunchesListElement key={item.id} item={item} />;
          })}
      </ul>
    </div>
  );
};

export default Launches;
