import { updateUser } from "@lib/userActions";
import { getUserById } from "@lib/user_object_get";
import styles from "@components/dashboard/users/singleUser/singleUser.module.css";
import Image from "next/image";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const user = await getUserById(id);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={user?.image || "/assets/images/noavatar.png"}
            alt=""
            width={200}
            height={300}
            priority
          />
        </div>
      </div>
      <div className={styles.formContainer}>
        <form action={updateUser} className={styles.form}>
          <Input type="hidden" name="id" value={user?._id} />
          <Label htmlFor="name">name</Label>
          <Input type="text" id="name" name="name" placeholder={user?.name} />
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder={user?.email}
          />
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />
          <Label htmlFor="role">Role</Label>
          <Select name="role">
            <SelectTrigger>
              <SelectValue placeholder={user?.role || "Undefined"} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="USER">USER</SelectItem>
                <SelectItem value="ADMIN">ADMIN</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button>Update</Button>
        </form>
      </div>
    </div>
  );
};

export default SingleUserPage;
