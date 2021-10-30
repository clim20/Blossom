import gql from 'graphql-tag';

export const FETCH_POPULAR_USERS = gql`
    query getPopularUsers {
        getPopularUsers {
            _id
            username
            email
            profileId
            quests {
                _id
                isCompleted
                image {
                    _id
                }
            }
            createdAt
        }
    }
`;

export const FIND_USER_BY_ID = gql`
    query findUserById($id: ID!) {
        findUserById(id: $id) {
            _id
            username
            email
            profileId
            quests {
                _id
                isCompleted
                image {
                    _id
                }
            }
            createdAt
        }
    }
`;

export const GET_USERS = gql`
    query getUsers {
        getUsers {
            _id
            username
            email
            profileId
            quests {
                _id
                isCompleted
                image {
                    _id
                }
            }
            createdAt
        }
    }
`;

export const FETCH_PROFILES = gql`
    query getProfiles {
        getProfiles {
            _id
            user
            # profileImg {
            #     _id
            #     data
            #     contentType
            # }
            # bannerImg {
            #     _id
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
            _id
            user
            # profileImg {
            #     _id
            #     data
            #     contentType
            # }
            # bannerImg {
            #     _id
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
            _id
            name
            owner
            # platformImg {
            #     _id
            #     data
            #     contentType
            # }
            # bannerImg {
            #     _id
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
            _id
            name
            owner
            # platformImg {
            #     _id
            #     data
            #     contentType
            # }
            # bannerImg {
            #     _id
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
            _id
            name
            owner
            # platformImg {
            #     _id
            #     data
            #     contentType
            # }
            # bannerImg {
            #     _id
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