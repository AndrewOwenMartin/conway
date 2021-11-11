import { useState, useEffect } from 'react';

export const useUserBox = () => {
    const [userIdInput, setUserIdInput] = useState("")
    const [userInfo, setUserInfo] = useState(null)
    const [fetchComplete, setIsLoaded] = useState(true)
    const [error, setError] = useState(null)

    const handleUserIdInputChange = (event) => {
        setUserIdInput(event.target.value)
    }

    const url = userIdInput ? `http://localhost:5000/user/${userIdInput}` : null

    const fakeFetch = () => {
        return setUserInfo({
            "name": "fake",
            "job": "fakejob",
        })
    }

    const handleFetch = () => {
        setIsLoaded(false)
        setUserInfo(null)
    }

    useEffect(
        () => {

            if (fetchComplete === true) {
                console.log("fetch is complete, nothing to do")
                return null
            }

            if (url === null) {
                console.log("no input, so no url")
                setIsLoaded(true)
                setError("Nothing entered")
                return null
            }

            fetch(url)
                .then(
                    (response) => {
                        response.json().then(
                            (result) => {
                                setIsLoaded(true);
                                if (response.status === 400 || response.status === 404 || response.status === 418) {
                                    setUserInfo(null);
                                    setError(result);
                                } else {
                                    setUserInfo(result);
                                    setError(null)
                                }
                            }
                        )
                    }
                )
        },
        [fetchComplete]
    )

    return {
        userIdInput,
        handleUserIdInputChange,
        userInfo,
        error,
        handleFetch,
    }
}

export const UserBox = ({
    userIdInput,
    handleUserIdInputChange,
    userInfo,
    error,
    handleFetch,
}) => {
    return <div>
        <input type="text" onChange={handleUserIdInputChange} value={userIdInput}></input>
        <button onClick={handleFetch}>Fetch</button>
        {userInfo ? <UserInfo userInfo={userInfo} /> : <NoUserMessage />}
        {error && <ErrorBox message={error} />}
    </div>
}

const UserInfo = ({ userInfo }) => {
    return <ul>{
        Object.entries(userInfo).map(
            ([key, value], i) => {
                return <li key={key}>{key}: {value}</li>
            }
        )
    }</ul>
}

const NoUserMessage = () => {
    return <p>No user selected</p>
}

const ErrorBox = ({ message }) => {
    return <pre>{message}</pre>
}
