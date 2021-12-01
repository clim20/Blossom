import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import * as mutations from '../cache/mutations';
import { Button, Label, Icon } from 'semantic-ui-react';
import MyPopup from '../util/MyPopup';

function LikeButton({ user, quiz: { id, quizLikes, likes} }){
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if(user && likes.find((like) => like.username === user.username)){
            setLiked(true);
        } else setLiked(false);
    }, [user, likes]);

    const [likeQuiz] = useMutation(mutations.LIKE_QUIZ_MUTATION, {
        variables: { quizId: id }
    });

    const handleLike = () => {
        likeQuiz();
    }

    const likeButton = user ? (
        liked ? (
            <Button color="teal">
                <Icon name="heart" />
            </Button>
        ) : (
            <Button color="teal" basic>
                <Icon name="heart" />
            </Button>
        )
    ) : (
        <Button as={Link} to="/login" color="teal" basic>
            <Icon name="heart" />
        </Button>
    );

    return(
        <Button as="div" labelPosition="right" onClick={handleLike}>
            <MyPopup content={liked ? 'unlike' : 'like'}>{likeButton}</MyPopup>
            <Label basic color="teal" pointing="left">
                {quizLikes}
            </Label>
        </Button>
    );
}


export default LikeButton;