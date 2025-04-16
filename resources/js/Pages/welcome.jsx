import { useState } from "react";
function welcome() {
    const [count, setCount] = useState(0);
    return (
        <>
            <h1>Welcome Inertia react</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Inc</button>
        </>
    );
}

export default welcome;
