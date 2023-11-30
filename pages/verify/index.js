
import Navbar from "@/components/Navbar";
import Transaction from "@/components/Transaction";
const Register = () => {
    return (
        <main>
            <Navbar></Navbar>
            <div className="grid grid-cols-6">
                <div className="col-span-1"></div>
                <div className="col-span-2 bg-img"></div>
                <div className="col-span-2">
                   <Transaction></Transaction>
                </div>
                <div className="col-span-1"></div>
            </div>
        </main>
    )
}
export default Register;