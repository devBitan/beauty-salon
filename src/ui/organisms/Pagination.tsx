"use client";
import { IServices } from "@/app/core/application/dto/services/services-response.dto";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { StepBack, StepForward } from "lucide-react";

interface IProps {
    data: IServices;
}

function Pagination({ data }: IProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const onPageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());

        router.push(`?${params.toString()}`);
    };

    const currentPage = data.pageable.pageNumber + 1;


    const buttonStyles = "text-blue-500 hover:text-blue-600 focus:outline-none transition-colors";
    const disabledButtonStyles = "text-gray-400 hover:text-gray-400 cursor-not-allowed";

    return (
        <div className="pagination-container">
            <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className={`${buttonStyles} ${currentPage === 1 && disabledButtonStyles}`}
            >
                <StepBack />
            </button>
            <span>Page</span>
            <span> {currentPage}</span>
            <span>  of  </span>
            <span> {data.totalPages}</span>
            <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === data.totalPages}
                className={`${buttonStyles} ${currentPage === data.totalPages && disabledButtonStyles}`}
            >
                <StepForward />
            </button>
        </div>
    );
}

export default Pagination;
