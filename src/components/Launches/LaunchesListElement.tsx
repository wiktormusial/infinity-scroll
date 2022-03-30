import { Launch } from "../../types/launches";

interface Props {
  key: string;
  item: Launch;
}

const LaunchesListElement: React.FC<Props> = ({ item }) => {
  return <li>{item.mission_name}</li>;
};

export default LaunchesListElement;
