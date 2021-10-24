import gql from 'graphql-tag';

export const FETCH_POPULAR_USERS = gql`
    query getPopularUsers {
        getPopularUsers {
            id
            username
            email
            profileId
            quests {
                questId
                isCompleted
                image {
                    id
                }
            }
            createdAt
        }
    }
`;

export const FIND_USER_BY_ID = gql`
    query findUserById($id: ID!) {
        findUserById(id: $id) {
            id
            username
            email
            profileId
            quests {
                questId
                isCompleted
                image {
                    id
                }
            }
            createdAt
        }
    }
`;

export const FETCH_PROFILES = gql`
    query getProfiles {
        getProfiles {
            id
            user {
                id
                username
                email
                profileId
            }
            # profileImg {
            #     id
            #     data
            #     contentType
            # }
            # bannerImg {
            #     id
            #     data
            #     contentType
            # }
            badges {
                id
            }
            description
            contact
            followerCount
            usersFollowing {
                id
                username
                email
                profileId
            }
            platformsFollowing {
                id
            }
            quizzes {
                id
            }
            collections {
                id
            }
            platforms {
                id
            }
        }
    }
`;

export const FIND_PROFILE_BY_ID = gql`
    query findProfileById($id: ID!) {
        findProfileById(id: $id) {
            id
            user {
                id
                username
                email
                profileId
            }
            # profileImg {
            #     id
            #     data
            #     contentType
            # }
            # bannerImg {
            #     id
            #     data
            #     contentType
            # }
            badges {
                id
            }
            description
            contact
            followerCount
            usersFollowing {
                id
                username
                email
                profileId
            }
            platformsFollowing {
                id
            }
            quizzes {
                id
            }
            collections {
                id
            }
            platforms {
                id
            }
        }
    }
`;