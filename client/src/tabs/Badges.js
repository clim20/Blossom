import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { useMutation, useQuery } from '@apollo/react-hooks';

import BadgeCards from '../components/cards/BadgeCards';

import * as queries from '../cache/queries';
import * as mutations from '../cache/mutations';

const Badges = (props) => {
    const { data: profileData, refetch: refetchProfileData } = useQuery(queries.FIND_PROFILE_BY_ID, {
        variables: {
            id: props.profile._id
        }
    });

    var profile = {};
    var badgesArr = [];
    if (profileData) { 
		profile = profileData.findProfileById;
        badgesArr = profile.badges;
    }

    var badges = [];
    const { data: badgeData, refetch: refetchBadgeData } = useQuery(queries.FIND_BADGES_BY_IDS, {
        variables: {
            ids: badgesArr
        }
    });

    if (badgeData) {
        badges = badgeData.findBadgesByIds;
    }

    var quizzes = [];
    const { data: quizData, refetch: refetchQuizData } = useQuery(queries.FIND_QUIZZES_BY_IDS, {
        variables: {
            ids: profile.quizzes
        }
    });

    if (quizData) {
        quizzes = quizData.findQuizzesByIds;
    }

    /* CHECK FOR QUEST BADGES */
    const [AddBadge] 			            = useMutation(mutations.ADD_BADGE);
    const [RemoveBadge] 			        = useMutation(mutations.REMOVE_BADGE);

    useEffect(async () => {
        console.log("useEffect called");
        if(props.profile.platforms.length > 0){
            if(!badgesArr.includes("61a99288b145bce874363058")) {
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61a99288b145bce874363058" }});
            }
        }
        else
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61a99288b145bce874363058" }});

        if(props.profile.quizzes.length > 0){
            if(!badgesArr.includes("61b55900c8cd0cca85e1621a")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55900c8cd0cca85e1621a" }});
            }
        }
        else
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55900c8cd0cca85e1621a" }});
    
        if(props.profile.quizzes.length > 4) {
            if(!badgesArr.includes("61b55ae4cb79dfd7f231dae9")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55ae4cb79dfd7f231dae9" }});
            }
        }
        else
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55ae4cb79dfd7f231dae9" }});
    
        if(props.profile.quizzes.length > 9) {
            if(!badgesArr.includes("61b55afa18f9cca86c899ed9")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55afa18f9cca86c899ed9" }});
            }
        }
        else
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55afa18f9cca86c899ed9" }});

        if(profile.followerCount > 99) {
            if(!badgesArr.includes("61b55f815bb2b98ef80dda37")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55f815bb2b98ef80dda37" }});
            }
        }
        else
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55f815bb2b98ef80dda37" }});
    
        if(profile.followerCount > 199) {
            if(!badgesArr.includes("61b55f9f01fc5ba9f5039e04")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55f9f01fc5ba9f5039e04" }});
            }
        }
        else
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55f9f01fc5ba9f5039e04" }});

        var likeCount = 0;
        var dislikeCount = false;
        var quizHit = false;

        for(let i=0; i < quizzes.length; i++){
            if(quizzes[i].quizLikes > likeCount) {
                likeCount = quizzes[i].quizLikes;
            }
            if(quizzes[i].quizDislikes === 0) {
                dislikeCount = true;
                break;
            }
            if(quizzes[i].quizHits > 99){
                quizHit = true;
                break;
            }
        }

        if(likeCount > 4){
            if(!badgesArr.includes("61b5690878085bba1e9df779")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b5690878085bba1e9df779" }});
            }
        }
        else
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b5690878085bba1e9df779" }});
        
        if(likeCount > 9){
            if(!badgesArr.includes("61b569250c3c04ece4fdd074")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b569250c3c04ece4fdd074" }});
            }
        }
        else
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b569250c3c04ece4fdd074" }});
        
        if(likeCount > 49){
            if(!badgesArr.includes("61b5693dd7c4e006196a7176")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b5693dd7c4e006196a7176" }});
            }
        }
        else
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b5693dd7c4e006196a7176" }});

        if(likeCount > 99){
            if(!badgesArr.includes("61b569554817760184b00c77")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b569554817760184b00c77" }});
            }
        }
        else
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b569554817760184b00c77" }});

        if(dislikeCount){
            if(!badgesArr.includes("61b569724e2fe778e20f6825")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b569724e2fe778e20f6825" }});
            }
        }
        else {
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b569724e2fe778e20f6825" }});
            dislikeCount = false;
        }

        if(quizHit){
            if(!badgesArr.includes("61b572e8500ba72cc0722c69")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b572e8500ba72cc0722c69" }});
            }
        }
        else {
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b572e8500ba72cc0722c69" }});
            quizHit = false;
        }
    }, []);
    
    //PLATFORM QUESTS
    // useEffect(async () => {
    //     if(props.profile.platforms.length > 0){
    //         if(!badgesArr.includes("61a99288b145bce874363058")) {
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61a99288b145bce874363058" }});
    //         }
    //     }
    //     else
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61a99288b145bce874363058" }});

    //     refetchProfileData();
    //     refetchBadgeData();
    //     refetchQuizData();
    // }, [badgesArr, refetchProfileData, refetchBadgeData, refetchQuizData, AddBadge, RemoveBadge, props.profile._id, props.profile.platforms.length]);

    //QUIZ QUESTS
    // useEffect(async () => {
    //     if(props.profile.quizzes.length > 0){
    //         if(!badgesArr.includes("61b55900c8cd0cca85e1621a")){
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55900c8cd0cca85e1621a" }});
    //         }
    //     }
    //     else
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55900c8cd0cca85e1621a" }});

    //     if(props.profile.quizzes.length > 4) {
    //         if(!badgesArr.includes("61b55ae4cb79dfd7f231dae9")){
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55ae4cb79dfd7f231dae9" }});
    //         }
    //     }
    //     else
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55ae4cb79dfd7f231dae9" }});

    //     if(props.profile.quizzes.length > 9) {
    //         if(!badgesArr.includes("61b55afa18f9cca86c899ed9")){
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55afa18f9cca86c899ed9" }});
    //         }
    //     }
    //     else
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55afa18f9cca86c899ed9" }});
       
    //     refetchProfileData();
    //     refetchBadgeData();
    //     refetchQuizData();
    // }, [quizzes, refetchProfileData, refetchBadgeData, refetchQuizData, badgesArr]);

    //FOLLOWER QUESTS
    // useEffect(async () => {
    //     if(profile.followerCount > 99) {
    //         if(!badgesArr.includes("61b55f815bb2b98ef80dda37")){
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55f815bb2b98ef80dda37" }});
    //         }
    //     }
    //     else
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55f815bb2b98ef80dda37" }});

    //     if(profile.followerCount > 199) {
    //         if(!badgesArr.includes("61b55f9f01fc5ba9f5039e04")){
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55f9f01fc5ba9f5039e04" }});
    //         }
    //     }
    //     else
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55f9f01fc5ba9f5039e04" }});

    //     refetchProfileData();
    //     refetchQuizData();
    //     refetchBadgeData();
    // }, [profile.followers, refetchProfileData, refetchBadgeData, refetchQuizData, AddBadge, RemoveBadge, badgesArr, profile.followerCount]);
	

    //LIKE & DISLIKE & HITS QUESTS
    // useEffect(async () => {
    //     var likeCount = 0;
    //     var dislikeCount = false;
    //     var quizHit = false;

    //     for(let i=0; i < quizzes.length; i++){
    //         if(quizzes[i].quizLikes > likeCount) {
    //             likeCount = quizzes[i].quizLikes;
    //         }
    //         if(quizzes[i].quizDislikes === 0) {
    //             dislikeCount = true;
    //         }
    //         if(quizzes[i].quizHits > 99){
    //             quizHit = true;
    //         }
    //     }

    //     if(likeCount > 4){
    //         if(!badgesArr.includes("61b5690878085bba1e9df779")){
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b5690878085bba1e9df779" }});
    //         }
    //     }
    //     else
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b5690878085bba1e9df779" }});
        
    //     if(likeCount > 9){
    //         if(!badgesArr.includes("61b569250c3c04ece4fdd074")){
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b569250c3c04ece4fdd074" }});
    //         }
    //     }
    //     else
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b569250c3c04ece4fdd074" }});
        
    //     if(likeCount > 49){
    //         if(!badgesArr.includes("61b5693dd7c4e006196a7176")){
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b5693dd7c4e006196a7176" }});
    //         }
    //     }
    //     else
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b5693dd7c4e006196a7176" }});

    //     if(likeCount > 99){
    //         if(!badgesArr.includes("61b569554817760184b00c77")){
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b569554817760184b00c77" }});
    //         }
    //     }
    //     else
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b569554817760184b00c77" }});

    //     if(dislikeCount){
    //         if(!badgesArr.includes("61b569724e2fe778e20f6825")){
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b569724e2fe778e20f6825" }});
    //         }
    //     }
    //     else {
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b569724e2fe778e20f6825" }});
    //         dislikeCount = false;
    //     }

    //     if(quizHit){
    //         if(!badgesArr.includes("61b572e8500ba72cc0722c69")){
    //             await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b572e8500ba72cc0722c69" }});
    //         }
    //     }
    //     else {
    //         await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b572e8500ba72cc0722c69" }});
    //         quizHit = false;
    //     }
    //     refetchProfileData();
    //     refetchBadgeData();
    //     refetchQuizData();
    // }, [profile.quizzes, quizzes, refetchProfileData, refetchBadgeData, refetchQuizData]);

    useEffect(async () => {
        refetchBadgeData();
        refetchQuizData();
        refetchProfileData();
    }, [badges, refetchBadgeData, refetchProfileData, refetchQuizData]);

    return (
        <Grid>
            <Grid.Column>
                <br/>
                {
                    badges.length > 0 && 
                    <div>
                        <BadgeCards badges={badges} activeTab='badges'/>
                    </div>
                }      
            </Grid.Column>
        </Grid>
    );
}
export default Badges;