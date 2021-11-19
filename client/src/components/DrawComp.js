import React, {useRef, useState, useEffect } from "react";

const styles = {
    canvas : {
        border:'1px solid #333',
        margin:'20px 0px',
        top: 0,
        left: 350,
        //position: 'absolute'
        
    },

    maindiv : {
        padding:'10px',
        margin:'auto',
        width:'800px',
       
    },
/*
    button : {
        border:'0px',
        margin:'1px',
        height:'50px',
        minWidth:'75px'
    }
    */
}

const DrawComp = (props) =>{


    
    
    const [pen, setPen] = useState('up');
    const [penCoords, setPenCoords] = useState([0,0]);
    const refs = useRef(null)
    const ctx = useRef(null)
    



    useEffect(() =>{
        
        refs.current.width = window.innerWidth * 2;
        refs.current.height = window.innerHeight * 2;
        refs.current.style.width = `${window.innerWidth}px`;
        refs.current.style.height = `${window.innerHeight}px`;
        //refs.current.style.width = `800 px`;
        //refs.current.style.height = `600 px`;

        ctx.current  = refs.current.getContext("2d")
        ctx.current.scale(2, 2);
        ctx.current.lineCap = "round";
        
        ctx.current.fillStyle="white"
        ctx.current.fillRect(0,0,800,600)
        ctx.current.lineWidth = props.lineWidth
        ctx.current.strokeStyle = props.penColor
        

        
    }, []);
    


    
/*
    const draw =(e)=> { //response to Draw button click 
        setMode('draw');
    }

    const erase =() => { //response to Erase button click
        setMode('erase');
    }
*/
    const drawing = (e) => { //if the pen is down in the canvas, draw/erase
        console.log(pen)
        if(pen === 'down') {
            
            ctx.current.beginPath()
            
            if(props.mode === 'draw') {
                ctx.current.strokeStyle = props.penColor
            }

            if(props.mode === 'erase') {
                ctx.current.strokeStyle = '#ffffff'
            }
            
            ctx.current.lineWidth = props.lineWidth
            ctx.current.lineJoin = 'round';
            ctx.current.moveTo(penCoords[0], penCoords[1])
            ctx.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
            ctx.current.closePath();
            ctx.current.stroke();
            
            setPenCoords([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
        }
    }

    const penDown =(e) =>{ //mouse is down on the canvas
        setPen('down');
        setPenCoords([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
        
    }

    const penUp =() =>{ //mouse is up on the canvas
        
        setPen('up');
    }
/*
    const penSizeUp = () =>{ //increase pen size button clicked
        setLineWidth(lineWidth + 5);
    }

    const penSizeDown = () => {//decrease pen size button clicked
        setLineWidth(lineWidth - 5);
    }

    
    const setColor = (e) =>{ //a color button was clicked
        setPenColor(e.target.value)
    }
*/
    const reset = () =>{ //clears it to all white, resets state to original
        props.reset()

        setPen('up');
        var canvas = refs.current
        var ctx = canvas.getContext('2d');
        ctx.fillStyle="white"
        ctx.fillRect(0,0,800,800)
        ctx.lineWidth = 10
        ctx.strokeStyle = "#000000"

    }
/*
    save(){
        var imagedata = ctx.getImageData(0,0,800,600);
        this.setState({
            lastsave: JSON.stringify(imagedata)
        })

    }

    load(){
        var imagedata = JSON.parse(this.state.lastsave)
        this.reset()
        this.ctx.putImageData(imagedata,0,0)

    }
    */

    return(
        <div style={styles.maindiv}>
            <div style={{position: 'reletive'}}>
                <canvas ref={refs} width="800px" height="600px" style={styles.canvas} 
                    
                    onMouseMove={(e)=>drawing(e)} 
                    onMouseDown={(e)=>penDown(e)} 
                    onMouseUp={(e)=>penUp(e)}>
                        
                </canvas>
                
                
            </div>
            
            
            <div>
                
                <button onClick={()=>reset()} >Reset</button>
            </div>
            <div>
                
            </div>
        </div>
    )
    /*
    <button onClick={(e)=>draw(e)} style={styles.btn, styles.button}>Draw</button>
                <button onClick={(e)=>erase(e)} style={styles.btn, styles.button}>Erase</button>
                <button onClick={(e)=>penSizeUp()} style={styles.btn, styles.button}>Pen Size +</button>
                <button onClick={(e)=>penSizeDown()} style={styles.btn, styles.button}>Pen Size -</button>
                
                <input type = "color" id="brushcolor" name="brushcolor" onChange={(e)=>setColor(e)}></input>
                */
}

export default DrawComp;