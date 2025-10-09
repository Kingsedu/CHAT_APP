import React, { useState, useRef } from "react";
import { LogOutIcon, VolumeOffIcon, Volume2Icon } from "lucide-react";
import { useAuthUser } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import imageCompression from "browser-image-compression";
export default function ProfileHeader() {
  const { logout, authUserMain, updateProfilePic } = useAuthUser();
  const { isSoundEnabled, toggleSound } = useChatStore();
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const mouseClickSound = new Audio("/sounds/mouse-click.mp3");

  // export default function ProfileHeader() {
  //   const { logout, authUserMain, updateProfilePic } = useAuthUser();
  //   const { isSoundEnabled, toggleSound } = useChatStore();
  //   const [selectedImg, setSelectedImg] = useState<string | null>(null);
  //   const fileInputRef = useRef<HTMLInputElement>(null);
  //   // ...rest of component
  // }
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.5, // target size (500 KB)
        maxWidthOrHeight: 800, // resize if too large
        useWebWorker: true,
      });
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      reader.onload = async () => {
        const base64Image = reader.result as string;
        setSelectedImg(base64Image);
        // Here, you would typically also upload the image to your server
        // and update the user's profile picture in your backend.
        await updateProfilePic?.({ profilePic: base64Image });
      };
    } catch (err) {
      console.error("Error compressing image:", err);
    }
  };
  return (
    <div className="p-6 border-b bordeer-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* AVATAR */}
          <div className="avatar online">
            <button
              className="relative overflow-hidden rounded-full size-14 group"
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src={selectedImg || authUserMain?.profilePic || "/avatar.png"}
                alt="User image"
              />
              <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/50 group-hover:opacity-100">
                <span className="text-xs text-white">Change</span>
              </div>
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          {/*USERNME AND ONLINE TEXT  */}
          <div>
            <h3 className="text-base font-medium text-slate-200 max-w-[180px] truncate">
              {authUserMain?.fullName || "User"}
            </h3>
            <p className="text-xs text-slate-400">Online</p>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-4">
          {/*LOGOUT BTN*/}
          <button
            className="transition-colors text-slate-400 hover:textt-slate-200"
            onClick={logout}
          >
            <LogOutIcon className="size-5" />
          </button>
          {/* SOUND TOGGLE BTN */}
          <button
            className="transition-colors text-slate-400 hover:textt-slate-200"
            onClick={() => {
              //play click sound before toggling
              mouseClickSound.currentTime = 0; //reset to the start
              mouseClickSound
                .play()
                .catch((e) => console.log("Audio play failed:", e));
              toggleSound();
            }}
          >
            {isSoundEnabled ? (
              <Volume2Icon className="size-5" />
            ) : (
              <VolumeOffIcon className="size-5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
