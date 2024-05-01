import Post from "../Post/Post";

function Display({data}) {
    console.log("Display",data);
    return (
        <>
        {data.map((x) => (
            <Post post={x} key={x._id}/>
        ))}
        </>
    )
}

export default Display;