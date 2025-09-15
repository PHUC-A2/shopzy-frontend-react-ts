
const UsersPage = () => {
    const hello = () => {
        setTimeout(() => {
            console.log("Hello")
        }, 3000)
    }
    return (
        <>

            <h1 onClick={hello}>Click</h1>
        </>
    )
}
export default UsersPage;