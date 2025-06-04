"use client";

//looking at t his we may need a hook that gives us the workspace ID wherever we need it
// below with useParams we get far enough to notice that it may not always be correct or available
// hence a hook would be useful here

const WorkpaceIdPage = () => {
    console.log("workspace [page] initialising")
    return(
        <div>
            workspace id page
        </div>
    );
}

export default WorkpaceIdPage;