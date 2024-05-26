import styles from "@components/dashboard/users/addUser/addUser.module.css";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { addUser } from "@lib/userActions";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <Input type="text" placeholder="name" name="name" required />
        <Input type="email" placeholder="email" name="email" required />
        <Input
          type="password"
          placeholder="password"
          name="password"
          required
        />
        <Select name="role">
          <SelectTrigger>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="USER">USER</SelectItem>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default AddUserPage;
