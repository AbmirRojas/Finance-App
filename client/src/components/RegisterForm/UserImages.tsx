import { useState } from "react";
import spriteUrl from '../../assets/sprite.svg';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface UserImagesProps {
    onImageSelect: (imageNumber: number, currentPage: number) => void;
    selectedImage: string;
}

export default function UserImages({ onImageSelect, selectedImage }: UserImagesProps) {
    const image = [1];
    const [images, setImages] = useState(0);
    const [localSelectedImage, setLocalSelectedImage] = useState<number | null>(null);

    function selectImage(position: number) {
        // Si la imagen ya está seleccionada, la deseleccionamos
        if (localSelectedImage === position) {
            setLocalSelectedImage(null);
        } else {
            setLocalSelectedImage(position);
            // Notificar al componente padre
            onImageSelect(position, images);
        }
    }

    function changeImages(direction: string) {
        // Limpiamos la selección cuando cambiamos de página
        setLocalSelectedImage(null);
        
        setImages((prev) => {
            if (direction === 'left' && prev <= 0) {
                return 15; // Ir al final
            }
            if (direction === 'right' && prev >= 15) {
                return 0; // Ir al inicio
            }
            return direction === 'right' ? prev + 3 : prev - 3;
        });
    }

    return (
        <>
            {image.map((_entry, index) => {
                return(
                    <div key={index} className="rounded bg-stone-300 flex items-center">
                        <div className="rounded bg-stone-100 ml-1.5 cursor-pointer p-1" onClick={() => {changeImages('left')}}>
                            <MdChevronLeft />
                        </div>
                        <svg 
                            className={`icon rounded m-4 cursor-pointer ${localSelectedImage === 1 ? 'bg-violet-200 border-2 border-violet-500' : 'hover:bg-stone-200'}`} 
                            onClick={() => {selectImage(1)}}
                        >
                            <use xlinkHref={`${spriteUrl}#adventurer-${images+1}`}></use>
                        </svg>
                        <svg 
                            className={`icon rounded m-4 cursor-pointer ${localSelectedImage === 2 ? 'bg-violet-200 border-2 border-violet-500' : 'hover:bg-stone-200'}`} 
                            onClick={() => {selectImage(2)}}
                        >
                            <use xlinkHref={`${spriteUrl}#adventurer-${images+2}`}></use>
                        </svg>
                        <svg 
                            className={`icon rounded m-4 cursor-pointer ${localSelectedImage === 3 ? 'bg-violet-200 border-2 border-violet-500' : 'hover:bg-stone-200'}`} 
                            onClick={() => {selectImage(3)}}
                        >
                            <use xlinkHref={`${spriteUrl}#adventurer-${images+3}`}></use>
                        </svg>
                        <div className="rounded bg-stone-100 mr-1.5 cursor-pointer p-1" onClick={() => {changeImages('right')}}>
                            <MdChevronRight />
                        </div>
                    </div>
                )
            })}
        </>
    );
}