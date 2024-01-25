import { useState } from "react";

export function Login( {onSubmit} ) {
    const [username, setUserName] = useState("");

    return (
        <>
            <h1>Welcome</h1>
            <p>What should people call you ?</p>
            <form action="" 
                onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit(username)
                }}
            >
                <input type="text" 
                    value={username} 
                    placeholder="username" 
                    onChange={(e) => setUserName(e.target.value)}
                />
                <input type="submit" />
            </form>
        </>
    )
}