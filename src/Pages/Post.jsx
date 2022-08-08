import React, { useState } from "react";
import Avatar1 from '../Components/Avatar1';
import axios from "axios";
import Button from "@mui/material/Button";
import "./post.css"
import Feed from '../Components/Feed';
import Alert from '@mui/material/Alert'; 


const App = (props) => {
    const [datos, setDatos] = React.useState(null);
    const [userss, setuserss] = React.useState(null);
    const [mensaje, setMensaje] = React.useState(null);
    const [fetched, setFetched] = React.useState(false);
    const [User, setUser] = React.useState(null);
    const [Users, setUsers] = React.useState(null);
    const [Post, setPost] = React.useState(null);
    const [Posts, setPosts] = React.useState(null);
    
   
    React.useEffect(() => {
        if(!User){
          axios.get("http://127.0.0.1:5000/user/2")
            .then((data)=> {
              setUser(data.data);
            })
            .catch((err)=> {
              console.error(err);
            })
        }
        if (!Users && fetched) {
          setMensaje({
            tipo: "alerta",
            mensaje: `Se creo asistente con exito`,
          });
        }
        console.log(User)
        
      }, [Users, User]);

      React.useEffect(() => {
        if(!Post){
          axios.get("http://127.0.0.1:5000/user/post/2")
            .then((data)=> {
              setPost(data.data.reverse());
            })
            .catch((err)=> {
              console.error(err);
            })
           
        }
       
        
      }, [Posts, Post]);
       

     






  
    const handleInputChange = (type, e) => {

      let tempDatos = {
        userId: 2,
        content: datos?.content,
      };
    
        if (type === "content") {
            tempDatos.content = e.target.value;
        }
        if (type === "userId") {
            tempDatos.userId = parseInt(e.target.value);
        }
      
      setDatos(tempDatos);
      console.log(tempDatos);
    };
  
    React.useEffect(() => {
      if(!userss){
        axios.get("http://127.0.0.1:5000/post")
          .then((data)=> {
            setuserss(data.data);
          })
          .catch((err)=> {
            console.error(err);
          })
      }
      if (!datos && fetched) {
        setMensaje({
          tipo: "alerta",
          mensaje: `Se creo asistente con exito`,
        });
      }
      console.log(userss)
    }, [datos, userss]);
  
    const postAPI = (data, callback) => {
      // const finalData = JSON.stringify(data);
      console.log({ data });
      axios
        .post("http://127.0.0.1:5000/post", data)
        .then((res) => {
          callback(null);
          setFetched(true);
        })
        .catch((err) => {
          console.error(err);
        });
    };
  
    const handleSubmit = () => {
      if(datos==null){
        alert("No se puede enviar un mensaje vacio")

      }else{
        postAPI(datos, setDatos);
      }
      
    };
  
  
    
    return (
        

   

        
      <div className="App">
        
        <div>
        <div className="S"> 
        <div className="flex1">
            <p className="p21">Home</p><img className="icon1" src="https://www.rawshorts.com/freeicons/wp-content/uploads/2017/01/orange_repicthousebase_1484336388.png"></img>
        </div>
        
         <div className="tweetBox__input"> 
            <div className="flex">
                <div className="avatar">
                                {
                        User ?
                        User.map((u,i)=>{ 
                        return(
                            <div key={i}>
                            <Avatar1 className="avatar11" pop={u}/>
                            </div>
                        ) 

                        }):"cargando"
                    }
                </div>
                <div className="border">
                    <form className="form1">
                   <input className="input4" type="text"placeholder="What's happening?" onChange={(e) => handleInputChange("content",e)} required min={8} max={255} /> 
                   <button type="submit" className="b5" onClick={handleSubmit}>Post </button>   
                    </form>
                </div>
                
            </div> 
             
        </div>
        
        </div>
        <div className="Scroll">
        <p className='p22'>Your Post hi5</p>
          {

            Post ?
            Post.map((u,i)=>{
              return(
                <div key={i}>
                 <Feed  pop1={u}/>
                </div>
              )
            }):"cargando"
          }
      
        </div>

        </div>

       
      

       
       
        
        

  
        
      </div>
    );
  };
  
  export default App;

