const UserCardSkeleton = () => (
    <div className={`flex mt-2 h-20 pt-4 pl-2 cursor-pointer font-sans animate-pulse`}>
        <div className="">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-2" />
        </div>
        <div>
            <div className="w-32 h-4 bg-gray-300 mb-2" />
            <div className="w-20 h-3 bg-gray-300" />
        </div>
        <div className="ml-auto mr-2">
            <div className="w-10 h-3 bg-gray-300 mb-1" />
            <div className="w-4 h-4 bg-gray-300 rounded-full" />
        </div>
    </div>
);

export default UserCardSkeleton;
