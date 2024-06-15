import { useSelector } from "react-redux";
import ReceptsList from "../components/ReceptList";
import { useCollection } from "../hooks/useCollection";
const Home = () => {
  const { user } = useSelector((state) => state.userState);
  const { data: recepts } = useCollection("recepts", ["uid", "==", user.uid]);
  console.log(recepts);
  return (
    <div>
      {recepts && <ReceptsList recepts={recepts} />}
    </div>
  );
};
export default Home;
