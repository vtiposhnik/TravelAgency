export const TruncateText = ({ text, maxLength }: { text: string, maxLength: number }) => {
    if (text.length < maxLength) return <span>{text}</span>

    return (
        <span>
            {text.slice(0, maxLength)}...
        </span>
    )
}