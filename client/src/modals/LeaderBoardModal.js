import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Button, Modal } from 'semantic-ui-react';

import * as queries from '../cache/queries';

const LeaderBoardModal = (props) => {
   
    

    const displayTopScores = (arr, index) =>{
        console.log(props.scores)
        console.log(props.currentuser)
        var name = "";
        let score = arr.userScore
        
        const NameComp = (props) =>{
            const { data: playerData } = useQuery(queries.FIND_USER_BY_ID, {
                variables: {
                    id: props.user
                }
            });

            var player = {};
            name = ""
            if (playerData) { 
		        player = playerData.findUserById;
                name = player.username
            }

            return <th>{name}</th>
        }
        
       
        return(
            <tr>
                <th>{index+1}</th>
                <NameComp user = {arr.user}></NameComp>
                <th>...</th>
                <th>{score}</th>
            </tr>
        )
        
        
        
    };


    return (
        <Modal
        size="tiny"
        open={true}
        onClose={() => props.setShowLeaderBoardModal(false)}
        >
            <Modal.Header>LeaderBoard</Modal.Header>
            <Modal.Content className="creation-modal">
            </Modal.Content>
            
                <table>
                    {props.scores.map(displayTopScores)
                    }
                </table>
                    
            
            <br/>
            <br/>
            <div className="creation-modal">
                <Button
                    className="cancel-modal-button"
                    onClick={() => props.setShowLeaderBoardModal(false)}
                >
                    Close
                </Button>
            </div>
            <br/>
        </Modal>
    );
}
export default LeaderBoardModal;