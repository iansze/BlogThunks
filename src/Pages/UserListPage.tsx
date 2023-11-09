import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Link } from "react-router-dom";
import "../styles/_list.scss";

const UserList = () => {
  const users = useSelector((state: RootState) => state.users);

  return (
    <section>
      <h2>Users</h2>
      <ol>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/user/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default UserList;
