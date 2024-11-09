
import { IResponseService } from "@/app/core/application/dto/services/services-response.dto";
import { ServicesService } from "@/app/infraestructure/services/service.service";
import { Edit, Scissors, Trash2 } from "lucide-react";
// import Button from '@mui/joy/Button';
const useServicesService = new ServicesService();
import { useRouter } from 'next/navigation';

interface CardProps {
    data: IResponseService;
    onDelete: (id: number) => void;

}

const CardS: React.FC<CardProps> = ({ data, onDelete }) => {

    const router = useRouter();

    // const handleDelete = async (id: number) => {
    //     const isConfirmed = confirm("¿Estás seguro que deseas borrar la vacante?");
    //     if (!isConfirmed) return;
    //     try {
    //         await useServicesService.destroy(id);
    //         console.log("Vacante eliminada");
    //         router.refresh();
    //     } catch (error) {
    //         console.log("Error al eliminar la vacante", error);
    //     }
    // };
    return (

        <div className="card-container">
            <div className="">
                <h1 className=" ">
                    <Scissors className="" /> {data.name}
                </h1>
                <p className="">{data.description}</p>
                <p className="">${data.price.toFixed(2)}</p>
            </div>
            <div className="btns-container">
                <button className="btn-generic"
                >
                    <Edit className="" />
                    Edit
                </button>
                <button className="btn-generic" onClick={() => onDelete(data.id)}>
                    <Trash2 className="" />delete
                </button>
            </div>
        </div>
    )
};

export default CardS;