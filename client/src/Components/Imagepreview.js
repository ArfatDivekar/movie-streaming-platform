export const Imagepreview = ({ image, name }) => {
    return (
        <div className="w-[132px] h-[132px] p-2 bg-main border-border rounded">
            <img 
                src={image ? image : "/images/user.jpg"} 
                alt={name}
                className="w-full h-full object-cover rounded" />
        </div>
    )
}