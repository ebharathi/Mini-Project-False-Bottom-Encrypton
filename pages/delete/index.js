import Navbar from "@/components/Navbar";
import DeleteCreditCard from "@/components/DeleteCreditCard";
const Delete = () => {
    return (
        <main>
            <Navbar></Navbar>
            <div className="grid grid-cols-6 pt-80">
                <div className="col-span-1"></div>
                <div className="col-span-2 pt-5 bg-img2"></div>
                <div className="col-span-2">
                   <DeleteCreditCard></DeleteCreditCard>
                </div>
                <div className="col-span-1"></div>
            </div>
        </main>
    )
}
export default Delete;