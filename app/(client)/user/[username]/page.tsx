import { log } from "console";

type Params = Promise<{ username: string }>;

async function DashBoard({ params }: { params: Params }) {
  const { username } = await params;
  log(username);
  return <></>;
}

export default DashBoard;
