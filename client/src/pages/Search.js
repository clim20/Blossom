import React, { useState } from 'react';
import { Dropdown, Grid } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';

import * as queries from '../cache/queries';

import UserSearchCard from '../components/cards/UserSearchCard';
import PlatformSearchCard from '../components/cards/PlatformSearchCard';
import FeaturedQuizCard from '../components/cards/FeaturedQuizCard';
import QuizCollectionSearchCard from '../components/cards/QuizCollectionSearchCard';

const Search = ({ searchQuery }) => {
    const [filters, setFilters] = useState([]);

    const { data, loading } = useQuery(queries.GET_SEARCH_RESULTS, {
        variables: {
            searchQuery: searchQuery,
            filters: filters
        }
    });

    var results;
    if (data) {
        results = data.getSearchResults;
    }

    const filterOptions = ["Users", "Platforms", "Quizzes", "Quiz Collections"].map((entry, index) => ({
        key: index,
        text: entry,
        value: entry,
    }));

    return (
        <Grid>
            <Grid.Column width={12}>
                <div className="search-cards">
                    {results &&
                        results.map((entry, index) => {
                            if (entry.__typename === 'User') return <UserSearchCard user={entry._id} key={index}/>
                            else if (entry.__typename === 'Platform') return <PlatformSearchCard platform={entry._id} key={index}/>
                            else if (entry.__typename === 'Quiz') return <FeaturedQuizCard quiz={entry._id} key={index}/>
                            else if (entry.__typename === 'QuizCollection') return <QuizCollectionSearchCard quizCollection={entry._id} key={index}/>
                        })
                    }
                    {(!results || results.length === 0) && !loading && searchQuery && <div> No results were found for "{searchQuery}". Please try another search. </div>}
                </div>
            </Grid.Column>

            <Grid.Column width={4}>
                <Dropdown placeholder='Filters' fluid multiple selection options={filterOptions} onChange={(e, data) => {setFilters(data.value)}}/>
            </Grid.Column>
        </Grid>
    );
}
export default Search;