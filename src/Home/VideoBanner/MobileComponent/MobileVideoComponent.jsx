import { CircularProgress } from "@mui/material";

const MobileVideoComponent = ({ currentVid }) => {
  return (
    <div className="md:hidden pt-2">
      {currentVid ? (
        <div className="w-full flex justify-center items-center p-1 rounded-lg z-20 md:hidden">
          <video
            className="rounded-lg"
            src={currentVid}
            muted
            controls
            playsInline
          />
        </div>
      ) : (
        <div className=" h-40 w-full flex justify-center items-center bg-black z-20 rounded-lg md:hidden">
          <CircularProgress size={30} sx={{ color: "white" }} />
        </div>
      )}
    </div>
  );
};

export default MobileVideoComponent;
