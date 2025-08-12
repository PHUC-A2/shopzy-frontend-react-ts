import { Button, Table } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const AdminUsersPage = () => {


    return (
        <>
            <div>
                <h2>Table Users</h2>
                <hr />
            </div>

            <Table striped bordered hover className="text-center">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ width: "auto" }}>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Ottdvdvsdfsdfsdfsdfsdfsddsfsdo</td>
                        <td>@mdosdsadasdasdasdasdas</td>
                        <td style={{ display: "flex", gap: 10, justifyContent:"space-between" }}>
                            <Button variant="outline-success"><FaRegEye /></Button>
                            <Button variant="outline-primary"><AiOutlineUserAdd /></Button>
                            <Button variant="outline-dark"><CiEdit /></Button>
                            <Button variant="outline-danger"><MdDelete /></Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}
export default AdminUsersPage;