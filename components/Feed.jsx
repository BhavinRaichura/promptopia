'use client'

import { useEffect, useState } from 'react'
import PromptCard from './PromptCard'


const PromptCardList= ({data,handleTagClick})=>{
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>{
        return (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
        )
        
      })}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);

  const handleSearchChange = (text)=>{
    setSearchText(text);
  }

  useEffect(()=>{
    console.log("use effect for search")
    if(searchText.length<1){
      setPosts([...allPosts]);
      return;
    }
    setPosts(allPosts.filter((data,key) => {
      if(data.tag.search(searchText)!=-1 || data.creator.username.search(searchText)!=-1 || data.prompt.search(searchText)!=-1)
        return data;
    }))
  },[searchText])

  useEffect(()=>{
    const fetchPost = async ()=>{
      const response = await fetch('/api/prompt');
      const data = await response.json();
      setAllPosts(data);
      setPosts(data);
    }

    fetchPost();
    console.log("useeffect")
  },[])

  const handleTagClick = (e)=>{
    console.log("tag click: ",e);
    handleSearchChange(e);
  }


  return (
    <section className="feed">

      <form className='relative w-full flex-center'>
        <input type="text"
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={(e)=>{handleSearchChange(e.target.value)}}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={handleTagClick}
      />

    </section>
  )
}

export default Feed