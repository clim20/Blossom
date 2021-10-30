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

export const GET_USERS = gql`
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

export const FETCH_POPULAR_PLATFORMS = gql`
    query getPopularPlatforms {
        getPopularPlatforms {
            id
            name
            owner {
                id
                username
                email
                profileId
                quests {
                    questId
                    isCompleted
                }
                createdAt
            }
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
            collaborators {
                id
            }
            requests {
                id
            }
            followerCount
            quizzes {
                id
            }
            collections {
                id
            }
            createdAt
        }
    }
`;

export const FETCH_PLATFORMS = gql`
    query getPlatforms {
        getPlatforms {
            id
            name
            owner {
                id
                username
                email
                profileId
                quests {
                    questId
                    isCompleted
                }
                createdAt
            }
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
            collaborators {
                id
            }
            requests {
                id
            }
            followerCount
            quizzes {
                id
            }
            collections {
                id
            }
            createdAt
        }
    }
`;

export const FIND_PLATFORM_BY_ID = gql`
    query findPlatformById($id: ID!) {
        findPlatformById(id: $id) {
            id
            name
            owner {
                id
                username
                email
                profileId
                quests {
                    questId
                    isCompleted
                }
                createdAt
            }
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
            collaborators {
                id
            }
            requests {
                id
            }
            followerCount
            quizzes {
                id
            }
            collections {
                id
            }
            createdAt
        }
    }
`;