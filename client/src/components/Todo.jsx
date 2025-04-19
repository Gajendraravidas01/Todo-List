import React, {useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Todo = () => {
  const navigate = useNavigate();
  const[title,setTitle] = useState("");
  const[description, setDescription] = useState("");

  const handlesubmit = async() => {
    if(title == "" || description == ""){
      alert("please enter title or description ");
    }
    try {

      const response = await fetch("https://todo-list-backend-lilac-seven.vercel.app/api/todos",{
        method : "POST",
        headers : {
          'Content-Type': 'application/json',
        },
        body : JSON.stringify({
          title : title,
          description : description
        })
      })
      navigate("/")
    } catch (error) {
      console.log("error in creating a post",error);
    }
  }

  return (
    <div className='h-screen w-full flex justify-center pt-28'>
        <div className='h-fit w-1/2 bg-white rounded-lg shadow-xl'>
            <div className="todo h-full border p-8 flex flex-col gap-8 rounded-md">
                <h2 className='text-2xl'>Create a Todo</h2>
                <div className="inputs flex gap-8 flex-col h-full">
                    <input 
                      type="text" 
                      name="title" 
                      id="title" 
                      placeholder='title...' 
                      value={title}
                      className='border border-black rounded-lg h-20 pl-4 text-lg'
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea 
                      placeholder='write description here...' 
                      className='h-3/5 rounded-lg p-4 border border-black text-lg'
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    >
                    </textarea>
                </div>
                <button 
                  className='bg-black w-full h-16 text-white rounded-lg text-2xl'
                  onClick={handlesubmit}
                >create</button>
            </div>
            
        </div>
    </div>
  )
}

export default Todo