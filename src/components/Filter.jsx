import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './Filter.css'

const Filter = () => {
    const [username, setUsername] = useState();
    const [userProjects, setUserProjects] = useState();
    const [userAvatar, setUserAvatar] = useState();
    const [userBio, setUserBio] = useState();
    const [userFollowers, setUserFollowers] = useState();
    const [userFollowing, setUserFollowing] = useState();
    const [userRepo, setUserRepo] = useState();

    const setData = ({
        login, followers, following, public_repos, avatar_url, bio 
    }) => {
        setUsername(login);
        setUserFollowers(followers);
        setUserFollowing(following);
        setUserRepo(public_repos);
        setUserAvatar(avatar_url);
        setUserBio(bio);
    }

    useEffect(() => {
        getGitFromUser()
        getRepositoryFromUser()
    }, [])

    function getGitFromUser() {
        axios.get('https://api.github.com/users/'+username, {
        })
            .then(function(response) {
                setData(response.data)
                // console.log(response);
                setUserAvatar(response.avatar_url)
            })
            .catch(function(error) {
                console.log(error);
            })
        }

    function getRepositoryFromUser() {
            axios.get(`https://api.github.com/users/${username}/repos`, {
        })
            .then(function(response) {

                setUserProjects(response.data)
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            })
        }

    function getUsername(e) {
        setUsername(e.target.value)
        
        getGitFromUser()
        getRepositoryFromUser()

        e.preventDefault();

        Filter();
    }

    return (   
        <>
            <div className="div-form">
                <form className="formSearch">
                    <div>
                        <label className="txt-secundary">Digite o username : </label>
                        <input type="text" id="link-repository" className="txt-link" value={username} onChange={function (event){const valor = event.target.value;console.log(valor);setUsername(valor);}}/>
                        <button type="submit" id="btn-submit-repository" className="btn-submit-repository" onClick={getUsername}>Buscar</button>
                    </div>
                </form>

                <img src={`https://github.com/${username}.png`} className="avatar-github"></img>

                <div className="div-infos">
                    <p>{userBio}</p>
                    <p>Followers: {userFollowers}</p>
                    <p>Following: {userFollowing}</p>
                    <p>Repositories: {userRepo}</p>
                </div>
            </div>

            <div className="container-repository" >
                
            {
                userProjects?.map((userProjects) => 
                       <div className="div-repository" key={userProjects.id}>
                            <a href={userProjects.html_url} target="_blank">
                                <h3>{userProjects.name}</h3>
                                <p className="txt-repos">{userProjects.description}</p>
                            </a>
                        </div>
                )
            }
            </div>            
        </>
    )
}

export default Filter;