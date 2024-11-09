'use client'

import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { IPostService } from "@/app/core/application/dto"
import { ServicesService } from "@/app/infrastructure/services/service.service"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { toast } from "react-toastify"
import Button from "@mui/joy/Button"
import Input from '@mui/joy/Input'
import Textarea from '@mui/joy/Textarea'

const postServiceSchema = yup.object().shape({
    name: yup.string().required("The name is required"),
    description: yup
        .string()
        .min(10, "The description must be at least 10 characters long")
        .required("The description is required"),
    price: yup
        .number()
        .positive("The price must be a positive number")
        .required("The price is required"),
})

interface PostServiceModalProps {
    isOpen: boolean
    onClose: () => void
}

export const PostServiceModal: React.FC<PostServiceModalProps> = ({ isOpen, onClose }) => {
    const [isLoading, setIsLoading] = useState(false)
    const useService = new ServicesService()

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<IPostService>({
        mode: "onChange",
        resolver: yupResolver(postServiceSchema),
    })

    const handlePostService = async (data: IPostService) => {
        setIsLoading(true)
        try {
            await useService.create(data)
            toast.success("The service was add without any error")
            reset()
            onClose()
        } catch (error) {
            console.error(error)
            toast.error("An error occurred while adding the service")
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex justify-between items-center p-6 border-b border-blue-300">
                    <h2 className="text-2xl font-semibold text-gray-800">Add Service</h2>
                    <Button
                        color="danger"
                        variant="outlined"
                        onClick={onClose}
                        className="transition-colors"
                        aria-label="Close modal"
                    >
                        <IoIosCloseCircleOutline className="w-6 h-6" />
                    </Button>
                </div>
                <form onSubmit={handleSubmit(handlePostService)} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Service name
                        </label>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    color="primary"
                                    type="text"
                                    id="name"
                                    className="w-full text-gray-300"
                                    placeholder="Enter the service name"
                                />
                            )}
                        />
                        {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <Textarea
                                    {...field}
                                    minRows={3}
                                    placeholder="Enter a description"
                                    className="w-full"
                                    variant="outlined"
                                    color="primary"
                                />
                            )}
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <Controller
                            name="price"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    type="number"
                                    color="primary"
                                    className="w-full"
                                    placeholder="Enter the service price"
                                />
                            )}
                        />
                        {errors.price && (
                            <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                        )}
                    </div>
                    <Button
                        color="primary"
                        variant="outlined"
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-2 px-4 rounded-md text-white font-medium ${isLoading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            } transition-colors`}
                    >
                        {isLoading ? "Adding..." : "Add Service"}
                    </Button>
                </form>
            </div>
        </div>
    )
}
