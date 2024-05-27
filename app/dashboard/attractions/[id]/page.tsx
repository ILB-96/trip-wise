import Image from "next/image";

import styles from "@components/dashboard/users/singleUser/singleUser.module.css";
import { getAttractionById } from "@lib/attraction";
import { updateUser } from "@lib/userActions";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { Separator } from "@components/ui/separator";

const SingleAttractionPage = async ({ params }) => {
  const { id } = params;
  const attraction = await getAttractionById(id);

  return (
    <div className="w-3/5">
      <div className={styles.formContainer}>
        <div className="flex justify-center items-center">
          <Image
            src={attraction?.image || "/assets/images/noavatar.png"}
            alt=""
            width={600}
            height={700}
            priority
          />
        </div>
        <Separator className="my-4" />
        <form action={updateUser} className={styles.form}>
          <Input type="hidden" name="id" value={attraction?._id} />
          <Label htmlFor="title">Title</Label>
          <Input type="text" name="title" placeholder={attraction?.title} />
          <Label htmlFor="country">Country</Label>
          <Input type="text" name="country" placeholder={attraction?.country} />
          <Label htmlFor="location">Location</Label>
          <Input
            type="text"
            name="location"
            placeholder={attraction?.location}
          />
          <Label htmlFor="price">Price</Label>
          <Input type="text" name="price" placeholder={attraction?.price} />
          <Label htmlFor="image">Image</Label>
          <Input type="text" name="image" placeholder={attraction?.image} />
          <Label htmlFor="description">Description</Label>
          <Textarea name="description" placeholder={attraction?.description} />
          <Button>Update</Button>
        </form>
      </div>
    </div>
  );
};

export default SingleAttractionPage;
