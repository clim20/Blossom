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

export const FETCH_USERS = gql`
    query getUsers {
        getUsers {
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
            user
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
            badges
            description
            contact
            followerCount
            usersFollowing 
            platformsFollowing
            quizzes
            collections
            platforms
        }
    }
`;

export const FIND_PROFILE_BY_ID = gql`
    query findProfileById($id: ID!) {
        findProfileById(id: $id) {
            id
            user
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
            badges
            description
            contact
            followerCount
            usersFollowing
            platformsFollowing
            quizzes
            collections
            platforms
        }
    }
`;

export const FETCH_POPULAR_PLATFORMS = gql`
    query getPopularPlatforms {
        getPopularPlatforms {
            id
            name
            owner
            # platformImg {
            #     id
            #     data
            #     contentType
            # }
            # bannerImg {
            #     id
            #     data
            #     contentType
            # }
            description
            contact
            collaborators
            requests
            followerCount
            quizzes
            collections
            createdAt
        }
    }
`;

export const FETCH_PLATFORMS = gql`
    query getPlatforms {
        getPlatforms {
            id
            name
            owner
            # platformImg {
            #     id
            #     data
            #     contentType
            # }
            # bannerImg {
            #     id
            #     data
            #     contentType
            # }
            description
            contact
            collaborators
            requests
            followerCount
            quizzes
            collections
            createdAt
        }
    }
`;

export const FIND_PLATFORM_BY_ID = gql`
    query findPlatformById($id: ID!) {
        findPlatformById(id: $id) {
            id
            name
            owner
            # platformImg {
            #     id
            #     data
            #     contentType
            # }
            # bannerImg {
            #     id
            #     data
            #     contentType
            # }
            description
            contact
            collaborators
            requests
            followerCount
            quizzes
            collections
            createdAt
        }
    }
`;