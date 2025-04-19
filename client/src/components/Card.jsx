import React, { useEffect, useState } from 'react'



const Card = ({onCardClick,todos,setTodos}) => {

  
  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await fetch("https://todo-list-backend-lilac-seven.vercel.app/api/todos");
        const data = await res.json();
        // console.log(data.todos);
        const sortedData = data.todos.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTodos(sortedData);
      } catch (error) {
        console.log("error in getting the todos", error);
      }
    }
    getdata()
  },[setTodos])

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const stripHtmlTags = (str) => {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  };

  return (
    <div>
      {
        todos.map((item) => (
          <div className='w-full p-8 bg-white rounded-lg mt-8 flex flex-col gap-3 cursor-pointer hover:shadow-2xl ' onClick={() => onCardClick(item)} key={item._id}>
            <h3 className='text-2xl font-bold'>{stripHtmlTags(item.title)}</h3>
            <div className='flex justify-between items-center gap-3'>
                <p className='font-semibold'>{item.description}</p>
                <span>{formatDate(item.date)}</span>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Card