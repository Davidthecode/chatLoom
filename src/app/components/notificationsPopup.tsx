type NotificationsPopupProps = {
    onClose: () => void;
  };

export default function NotificationsPopup({onClose}: NotificationsPopupProps) {
    return (
        <div>
            <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-4 rounded-lg text-black">
                    {/* Add your pop-up content here */}
                    <h2>Notifications Pop-up</h2>
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}