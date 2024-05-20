"use client"
import { useCurrentUser } from '@hooks/use-current-user'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import CommentFeed from './CommentFeed'
import CommentForm from './CommentForm'

export interface CommentSectionProps {
    tripId: string;
}

const CommentSection = ({ tripId }: CommentSectionProps) => {
    const [comments, setComments] = useState<any>(null);

    const fetchComments = async () => {
      const response = await fetch(`/api/trip/${tripId}/getComments`, {
        method: 'GET',
      });
      const result = await response.json();
      setComments(result.success ? result.comments : null);
    };
  
    useEffect(() => {
      fetchComments();
    }, []);
  
    const handleCommentSubmitted = async () => {
      await fetchComments();
    };
  return (
    <div>
        {useCurrentUser() && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.5 } },
            }}
          >
            <CommentForm tripId={tripId} onCommentSubmitted={handleCommentSubmitted} />
          </motion.div>
        )}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.7 } },
          }}
        >
        {comments && <CommentFeed comments={comments} />}
        </motion.div>
    </div>
  )
}

export default CommentSection