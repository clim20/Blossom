import React, { useContext, useState } from 'react';
//import { useMutation, useQuery } from '@apollo/react-hooks';

import MenuBar from '../components/MenuBar';

const QuizStart = (props) => {

    return (
        <div>
            <MenuBar/>
            QuizStart Page
            {props.currentQuiz.title}
        </div>
    );
}
export default QuizStart;