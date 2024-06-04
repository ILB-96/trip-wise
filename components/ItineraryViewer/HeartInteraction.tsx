import { useState } from "react";
import { motion } from "framer-motion";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { Button } from "@components/ui/button";
import axios from "axios";
import { useSession } from "next-auth/react";

interface HeartInteractionProps {
  tripId: string;
}

const HeartInteraction: React.FC<HeartInteractionProps> = ({ tripId }) => {
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();

  const toggleLike = async () => {
    if (!session) {
      // Redirect to login if user is not authenticated
      window.location.href = "/auth/login";
      return;
    }

    setLiked(!liked);

    try {
      await axios.post(`/api/user/${session.user.id}/addFavorite`, { tripId });
    } catch (error) {
      console.error("Error adding trip to favorites:", error);
    }
  };

  const heartVariants = {
    active: {
      scale: 1.2,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 },
    },
    inactive: {
      scale: 1,
      opacity: 0.5,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div>
      <Button
        className="bg-orange-800 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full w-300 mt-10 text-center"
        onClick={toggleLike}
      >
        <div className="flex items-center space-x-2">
          {liked ? (
            <motion.div
              variants={heartVariants}
              animate="active"
              initial="inactive"
            >
              <FaHeart className="w-8 h-8 text-yellow-400" />
            </motion.div>
          ) : (
            <motion.div
              variants={heartVariants}
              animate="inactive"
              initial="active"
            >
              <FaRegHeart className="w-5 h-5 text-white" />
            </motion.div>
          )}
          <span>Favour</span>
        </div>
      </Button>
    </div>
  );
};

export default HeartInteraction;
