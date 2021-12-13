import React, {useRef, useState, useEffect } from "react";

const styles = {
    canvas : {
        border:'1px solid #333',
        margin:'0px 0px',
        width: '100%',
        height: "100%"
    },

    maindiv : {
        padding:'10px',
        margin:'auto',
        width:'400px',
    },
}

const DrawComp = (props) =>{

    const [pen, setPen] = useState('up');
    const [penCoords, setPenCoords] = useState([0,0]);
    const refs = useRef(null)
    const ctx = useRef(null)
    
    useEffect(() =>{     
        refs.current.width = 996;
        refs.current.height = 496;
        refs.current.style.width = `996px`;
        refs.current.style.height = `496px`;

        ctx.current  = refs.current.getContext("2d")
        ctx.current.scale(1, 1);
        ctx.current.lineCap = "round";
        
        ctx.current.fillStyle="white"
        ctx.current.fillRect(0,0,996,496)
        ctx.current.lineWidth = props.lineWidth
        ctx.current.strokeStyle = props.penColor
        
        if(props.lastSave != ""){
            var imagedata = new Image;
            imagedata.onload = function(){
                ctx.current.drawImage(imagedata,0,0); // Or at whatever offset you like
            };
            imagedata.src = props.lastSave;
        }
    },[]);

    const drawing = (e) => { //if the pen is down in the canvas, draw/erase
        if(pen === 'down') {
            ctx.current.beginPath();
            
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
            //save()
        }
    }

    const penDown =(e) =>{ //mouse is down on the canvas
        setPen('down');
        setPenCoords([e.nativeEvent.offsetX, e.nativeEvent.offsetY]);
        
    }

    const penUp =() =>{ //mouse is up on the canvas
        setPen('up');
    }

    const reset = () =>{ //clears it to all white, resets state to original
        props.reset()

        setPen('up');
        var canvas = refs.current
        var ctx = canvas.getContext('2d');
        ctx.fillStyle="white"
        ctx.fillRect(0,0,996,496)
        ctx.lineWidth = 10
        ctx.strokeStyle = "#000000"
        //save()

    }

    const reload = () =>{
        reset()
        if(props.lastSave != ""){
            var imagedata = new Image;
            imagedata.onload = function(){
                ctx.current.drawImage(imagedata,0,0); // Or at whatever offset you like
            };
            imagedata.src = props.lastSave;
        }
        //save()
        
    }

    const save = async () =>{
        const image = refs.current.toDataURL('image/jpeg', .1);
        props.save(image);
    }

    return(
        <div>
            <div>
                <canvas ref={refs}  style={styles.canvas} 
                    onMouseMove={(e)=>drawing(e)} 
                    onMouseDown={(e)=>penDown(e)} 
                    onMouseUp={(e)=>penUp(e)}>
                </canvas>
            </div>
            
            <div className = 'drawing_bar' style={{'top' : '500px', 'left' : '0px'}}>
                <button className = "drawing_btn" onClick={()=>reset()} >Reset</button>
                <button className = "drawing_btn" onClick={()=>reload()} >Reload</button>
                <button className = "drawing_btn" onClick={()=>save()}>Save Drawing</button>
            </div>
            <div>
                
            </div>
        </div>
    )
   
}

export default DrawComp;