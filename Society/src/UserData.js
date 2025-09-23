import useGetApi from "./pages/CustomHook/useGetApi";

export default function UserData({ username }) {
  const { getData, getLoading } = useGetApi("user", { username });

  // ✅ Safely destructure first object
  const [
    {
      userid,
      password,
      block,
      flat,
      email,
      organizationid,
      isLogged = true,
    } = {},
  ] = getData;

  if (getLoading) return <p>Loading...</p>;

  return userid, password, block, flat, email, organizationid, isLogged;
}
