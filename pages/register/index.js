import CreditCard from "@/components/CreditCard";
import Navbar from "@/components/Navbar";

const Register = () => {
    return (
        <main>
            <Navbar></Navbar>
            <div className="grid grid-cols-6">
                <div className="col-span-1"></div>
                <div className="col-span-2 bg-img"></div>
                <div className="col-span-2">
                  <CreditCard className=""></CreditCard>
                </div>
                <div className="col-span-1"></div>
            </div>
        </main>
    )
}
export default Register;