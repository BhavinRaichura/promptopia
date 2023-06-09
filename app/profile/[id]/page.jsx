'use client'

import Profile from "@/components/Profile"
import {useSearchParams} from "next/navigation"
import { useEffect,useState } from "react"


const SomeOneProfile  = ({params}) =>{
    const searchParams = useSearchParams()
    const userName = searchParams.get('name');
    console.log(params)

    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts = async ()=>{
            const response = await fetch(`/api/users/${ params.id }/posts`)
            const data  = await response.json();
            setPosts(data)
        }

        
            fetchPosts();
    },[])

    const handleEdit = ()=>{
        
    }
    const handleDelete = ()=>{
        
    }


    return (
        <>
        <Profile
            name={userName}
            desc={"Welcome to my profile"}
            data = {posts}
            handleEdit={handleEdit}
            handleDelete = {handleDelete}

        />
        </>
    )



}

export default SomeOneProfile