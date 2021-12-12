import React, { useContext, useState, useEffect } from 'react';
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
    const { data } = useQuery(queries.FIND_BADGES_BY_IDS, {
        variables: {
            ids: badgesArr
        }
    });

    if (data) {
        badges = data.findBadgesByIds;
    }

    /* CHECK FOR QUEST BADGES */
    const [AddBadge] 			            = useMutation(mutations.ADD_BADGE);
    const [RemoveBadge] 			        = useMutation(mutations.REMOVE_BADGE);

    useEffect(async () => {
        if(props.profile.platforms.length > 0){
            if(!badgesArr.includes("61a99288b145bce874363058")) {
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61a99288b145bce874363058" }});
            }
        }
        else
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61a99288b145bce874363058" }});

        refetchProfileData();
    }, [badgesArr], refetchProfileData);

    useEffect(async () => {
        if(props.profile.quizzes.length > 0){
            if(!badgesArr.includes("61b55900c8cd0cca85e1621a")){
                await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55900c8cd0cca85e1621a" }});
            }

            if(props.profile.quizzes.length > 4) {
                if(!badgesArr.includes("61b55ae4cb79dfd7f231dae9")){
                    await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55ae4cb79dfd7f231dae9" }});
                }
            }
            else
                await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55ae4cb79dfd7f231dae9" }});

            if(props.profile.quizzes.length > 9) {
                if(!badgesArr.includes("61b55afa18f9cca86c899ed9")){
                    await AddBadge({variables: { profileId: props.profile._id, badgeId: "61b55afa18f9cca86c899ed9a" }});
                }
            }
            else
                await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55afa18f9cca86c899ed9" }});
        }
        else
        {
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55900c8cd0cca85e1621a" }});
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55ae4cb79dfd7f231dae9" }});
            await RemoveBadge({variables: { profileId: props.profile._id, badgeId: "61b55afa18f9cca86c899ed9" }});
        }
        refetchProfileData();
    }, [profile.quizzes], refetchProfileData);

    //Has 100 Followers
    // useEffect(()=> {
    //     if(followers > 99) {
    //         setDisable6(true);
    //     }
	// if(followers > 199) {
	//     setDisable12(true);
	// }
    // });
	
    // useEffect(() => {
	// for(let i=0; i < quizzes.length; i++){
	//    if(quizzes[i].quizLikes > 4){
	//       setDisable7(true);
	//    }
	//    if(quizzes[i].quizLikes > 9){
	//       setDisable8(true);
	//    }
	//    if(quizzes[i].quizLikes > 49){
	//       setDisable9(true);
	//    }
	//    if(quizzes[i].quizLikes > 99){
	//       setDisable10(true);
	//    }
	//    if(quizzes[i].quizDislikes == 0){
	//       setDisable11(true);
	//    }else{
	//       setDisable11(false);
	//    }
	// }
    // });

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