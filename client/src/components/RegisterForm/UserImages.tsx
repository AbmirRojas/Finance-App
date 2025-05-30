import { useState } from "react";
import spriteUrl from '../../assets/sprite.svg';
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export default function UserImages() {
    const image = [1];
    const [images, setImages] = useState(0);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    function selectImage(position: number) {
        // Si la imagen ya está seleccionada, la deseleccionamos
        if (selectedImage === position) {
            setSelectedImage(null);
        } else {
            setSelectedImage(position);
        }
    }

    function changeImages(direction: string) {
        // Limpiamos la selección cuando cambiamos de página
        setSelectedImage(null);
        
        setImages((prev) => {
            if (direction === 'left' && prev < 3 || direction === 'right' && prev > 17) {
                return 0;
            }
            return direction === 'right' ? prev + 3 : prev - 3;
        });
    }

    return (
        <>
        {image.map((_entry, index) => {
            return(
            <div key={index} className="rounded bg-stone-300 flex items-center">
                <div className="rounded bg-stone-100 ml-1.5" onClick={() => {changeImages('left')}}>
                    <MdChevronLeft />
                </div>
                <svg 
                    className={`icon rounded m-4 ${selectedImage === 1 ? 'bg-stone-100' : ''}`} 
                    onClick={() => {selectImage(1)}}
                >
                    <use xlinkHref={`${spriteUrl}#adventurer-${images+1}`}></use>
                </svg>
                <svg 
                    className={`icon rounded m-4 ${selectedImage === 2 ? 'bg-stone-100' : ''}`} 
                    onClick={() => {selectImage(2)}}
                >
                    <use xlinkHref={`${spriteUrl}#adventurer-${images+2}`}></use>
                </svg>
                <svg 
                    className={`icon rounded m-4 ${selectedImage === 3 ? 'bg-stone-100' : ''}`} 
                    onClick={() => {selectImage(3)}}
                >
                    <use xlinkHref={`${spriteUrl}#adventurer-${images+3}`}></use>
                </svg>
                <div className="rounded bg-stone-100 mr-1.5" onClick={() => {changeImages('right')}}>
                    <MdChevronRight />
                </div>
            </div>
            )
        })}
        </>
    )
}