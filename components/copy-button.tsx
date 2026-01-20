import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

interface CopyQrButtonProps {
    qrId: string;
}

export const CopyQrButton: React.FC<CopyQrButtonProps> = ({ qrId }) => {
    const [copied, setCopied] = useState(false);

    const publicPageUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/qrs/${qrId}`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(publicPageUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition text-sm"
        >
            {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
            {copied ? "Copied!" : "Copy"}
        </button>
    );
};
