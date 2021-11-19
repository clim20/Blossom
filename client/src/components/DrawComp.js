import React, {useRef, useState, useEffect } from "react";

const styles = {
    canvas : {
        border:'1px solid #333',
        margin:'0px 0px',
        top: 0,
        left: 350,
        //position: 'absolute'
        
    },

    maindiv : {
        padding:'10px',
        margin:'auto',
        width:'400px',
       
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
        ctx.current.fillRect(0,0,400,400)
        ctx.current.lineWidth = props.lineWidth
        ctx.current.strokeStyle = props.penColor

        
        if(props.lastSave!=""){
            
            var imagedata = new Image;
            imagedata.onload = function(){
                ctx.current.drawImage(imagedata,0,0); // Or at whatever offset you like
            };
            imagedata.src = props.lastSave;

            //var imagedata = JSON.parse(props.lastSave)
            //ctx.current.putImageData(imagedata,0,0)
        }

        
    }, []);
    


    

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
        ctx.fillRect(0,0,400,400)
        ctx.lineWidth = 10
        ctx.strokeStyle = "#000000"

        //save()

    }

    const reload = () =>{
        reset()
        if(props.lastSave!=""){
            var imagedata = new Image;
            imagedata.onload = function(){
                ctx.current.drawImage(imagedata,0,0); // Or at whatever offset you like
            };
            imagedata.src = props.lastSave;
            /*
            console.log("here");
            var imagedata = JSON.parse(props.lastSave)
            ctx.current.putImageData(imagedata,0,0)
            */
        }
        //save()
        
    }

    const save = async () =>{
        const image = refs.current.toDataURL('image/jpeg', .1);
        console.log(image)
        props.save(image)
        /*
        const image = refs.current.toDataURL('image/png');
        const blob = await (await fetch(image)).blob();
        const blobURL = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = "image.png";
        link.click();
        
        var imagedata = ctx.current.getImageData(0,0,400,400);
        console.log(JSON.stringify(imagedata))
        props.save(JSON.stringify(imagedata))
        */

    }
/*
    load(){
        var imagedata = JSON.parse(this.state.lastsave)
        this.reset()
        this.ctx.putImageData(imagedata,0,0)

    }
    */

    return(
        <div style={styles.maindiv}>
            <div style={{position: 'reletive'}}>
                <canvas ref={refs} width="400px" height="400px" style={styles.canvas} 
                    
                    onMouseMove={(e)=>drawing(e)} 
                    onMouseDown={(e)=>penDown(e)} 
                    onMouseUp={(e)=>penUp(e)}>
                        
                </canvas>
                
                
            </div>
            
            
            <div>
                
                <button onClick={()=>reset()} >Reset</button>
                <button onClick={()=>reload()} >Reload</button>
                <button  onClick={()=>save()}>Save Drawing</button>
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