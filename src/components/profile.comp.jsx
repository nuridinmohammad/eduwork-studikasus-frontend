import { useSelector } from "react-redux";

const ProfileComp = () => {
  const auth = useSelector((state) => state.auth);
  return (
    <>
      <table className="table table-borderless">
        <tbody>
          <tr>
            <th>Nama Lengkap</th>
            <td>{auth?.user?.fullname}</td>
          </tr>
          <tr>
            <th>Email</th>
            <td>{auth?.user?.email}</td>
          </tr>
          <tr>
            <th>Role</th>
            <td>{auth?.user?.role}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default ProfileComp;
