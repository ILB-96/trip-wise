import { Trash2, View } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Pagination from "@components/dashboard/pagination/Pagination";
import SearchComp from "@components/dashboard/search/Search";
import styles from "@components/dashboard/users/users.module.css";
import { getUsers, USERS_PER_PAGE } from "@lib/user_object_get";
import { deleteUser } from "@lib/userActions";
import { SearchParams } from "@models/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@components/ui/table";
import { Button } from "@components/ui/button";

interface UsersPageProps {
  searchParams: SearchParams;
}

const UsersPage: React.FC<UsersPageProps> = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await getUsers(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <SearchComp placeholder="Search for a user..." />
        <Link href="/dashboard/users/add">
          <Button>Add New</Button>
        </Link>
      </div>
      <Table className={styles.table}>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className={styles.user}>
                  <Image
                    src={user?.image || "/assets/images/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {user?.name}
                </div>
              </TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user?._id}`}>
                    <Button variant="outline">
                      <View />
                    </Button>
                  </Link>
                  <form action={deleteUser}>
                    <input
                      type="hidden"
                      name="id"
                      value={user?._id.toString("base64")}
                    />
                    <Button variant="destructive">
                      <Trash2 />
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination count={count} items_per_page={USERS_PER_PAGE} />
    </div>
  );
};

export default UsersPage;
