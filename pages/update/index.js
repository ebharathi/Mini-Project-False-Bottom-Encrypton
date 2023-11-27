import Navbar from "@/components/Navbar";
import UpdateCreditCard from "@/components/UpdateCreditCard";
const Update = () => {
    return (
        <main>
            <Navbar></Navbar>
            <div className="grid grid-cols-6">
                <div className="col-span-1"></div>
                <div className="col-span-2 bg-img3"></div>
                <div className="col-span-2">
                   <UpdateCreditCard></UpdateCreditCard>
                </div>
                <div className="col-span-1"></div>
            </div>
        </main>
    )
}
export default Update;