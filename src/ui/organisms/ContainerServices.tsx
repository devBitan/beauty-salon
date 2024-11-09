'use client'
import { IPostService, IServices } from "@/app/core/application/dto/services/services-response.dto";
import CardS from "../molecules/common/CardS";
import Pagination from "./Pagination";
import { useState } from "react";
import { BookmarkPlus } from "lucide-react";
// import { PostServiceModal } from "./newServiceForm";
// import { IoIosAddCircleOutline } from "react-icons/io";
// import Button from '@mui/joy/Button';

interface IResponse {
    data: IServices;
    onEdit: (data: IPostService, id: number) => void;
    onDelete: (id: number) => void;
    onSubmit: (data: IPostService) => Promise<void>;
}

const ContainerS: React.FC<IResponse> = ({ data, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [selectedService, setSelectedService] = useState<IPostService | null>(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="service-container">
            <div className="add-data-container">
                <h1 className="title-page">Services</h1>
                <button className="btn-generic" >
                    <BookmarkPlus /> Add Service
                </button>
                {/* <PostServiceModal isOpen={isModalOpen} onClose={closeModal} /> */}
            </div>
            <div className="service-cards-container">
                {data.content.map((item) => (
                    <CardS key={item.id} data={item} onDelete={onDelete}/>
                ))}
            </div>
            <Pagination data={data} />
        </div>
    );
};

export default ContainerS;
