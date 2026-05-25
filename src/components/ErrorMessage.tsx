import { TbAlertOctagon } from "react-icons/tb"

type ErrorMessageProps = {
    message: string
    onRetry?: () => void
}

// Mostrar los mensajes de error
export default function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
    return (
        <div className="text-red-500 text-center">
            <p className="flex items-center justify-center gap-2">
                <TbAlertOctagon aria-hidden={true} className="inline" />
                {message}
            </p>

            {/* Botón de reintentar */}
            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="mt-3 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Reintentar
                </button>
            )}
        </div>
    )
}