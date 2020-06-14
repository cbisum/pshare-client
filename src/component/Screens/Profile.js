import React, { useEffect, useState, useContext } from 'react'
import {UserContext} from '../../App'

function Profile() {
    const [myPic, setMyPic] = useState([])
    const {state,dispatch}  =  useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            }
        })
        .then(res=>res.json())
        .then(result=>{
            setMyPic(result.mypost)
        })
    },[])

  return (
      <div className='profileparent'>
          <div className='profilesec'>
              <div>
                  <img style={{ width: '150px', height: '160px', borderRadius: '80px' }} src='https://images.unsplash.com/photo-1552607676-17f088307dce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60' />
              </div>
              <div>
                  <h4>{state?state.name:"Loading"}</h4>
                  <div className='innersec'>
                      <h6>40 post</h6>
                      <h6>40 Followers</h6>
                      <h6>40 Following</h6>
                  </div>
              </div>
          </div>
          <div className='gallery'>
          {
            myPic.map(item=>{
                return(
                    <img key={item._id} className='item' alt='item.title' src={item.photo} />
                )
            })
          }
          
           

          </div>
      </div>
  )
}

export default Profile
