"use client";
import { ReactNode } from "react";

interface ModalProps {
    onClose: () => void;
    children: ReactNode;
}

function Modal({ onClose, children }: ModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={onClose}
            //  "fixed inset-0" = ocupa TODA la pantalla, sin importar el scroll
            //    de la página (a diferencia de "absolute", que se posiciona
            //    relativo al contenido normal y se movería con el scroll).
            //    z-50 = lo pone por ENCIMA de todo lo demás (stacking).
            //    Al hacer click en cualquier parte de este fondo oscuro, se cierra.
        >
            <div
                className="bg-surface border border-border rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                //    MUY IMPORTANTE: sin esto, al hacer click DENTRO de la tarjeta
                //    (por ejemplo, en un input del formulario), el evento "burbujea"
                //    hacia el div de afuera y dispara igual el onClose -- cerrando
                //    el modal cada vez que el usuario intenta escribir algo.
                //    stopPropagation() corta esa burbuja ahí mismo.
            >
                {children}
            </div>
        </div>
    );
}

export default Modal;